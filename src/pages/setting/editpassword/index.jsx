import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../../../api/AxiosManager';
import ReactGA from 'react-ga';

import { useValidUserData } from '../../../hooks/useData';
import PageTitle from '../../../components/common/PageTitle';
import HeaderMid from '../../../components/common/HeaderMid';
import Modal from '../../../components/common/Modal';
import { IconNext, IconClose } from '../../../assets/icons';
import { Input, Checkinput } from '../../../styles/Input';
import { Button } from '../../../styles/Button';
import { Label } from '../../../styles/Label';

const EditPassword = () => {
  const navigate = useNavigate();
  const { kakaoUser } = useValidUserData().data;
  const { register, handleSubmit, watch, errors } = useForm();
  const password = useRef();
  password.current = watch('password');
  const [isShow, setIsShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const createGAEvent = (action) => {
    ReactGA.event({
      category: 'Settings',
      action: `설정에서 ${action}`,
      label: 'settings',
    });
  };

  const onSubmitChange = async (data) => {
    try {
      await api.put('/mypage/password', data);
      // console.log('response >>', response.data);
      createGAEvent('비밀번호 변경');
      alert('비밀번호 변경이 완료되었습니다.');
      navigate(-1);
    } catch (err) {
      alert(err.response.data.message);
      // console.log('Error >>', err.response.data);
    }
  };

  const onSubmitFeedback = async (data) => {
    try {
      const response = await api.post('/withdrawal', data);
      createGAEvent('회원탈퇴 피드백 제출');
      console.log('response >>', response.data);

      if (kakaoUser) {
        try {
          await api.delete('/withdrawal', { password: kakaoUser });
          alert('그동안 화목을 이용해주셔서 감사합니다.');
          window.location.href = '/';
          return localStorage.removeItem('TOKEN');
        } catch (err) {
          console.log(err);
        }
      } else {
        setIsVisible(true);
      }
    } catch (err) {
      console.log('Error >>', err.response.data);
    }
  };

  return (
    <>
      {isVisible && (
        <>
          <Modal
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            type="withdrawal"
          ></Modal>
        </>
      )}
      {!isShow ? (
        <>
          <PageTitle title="계정 관리" />
          <HeaderMid text="계정 관리" />
          <Container onSubmit={handleSubmit(onSubmitChange)}>
            <Body>
              {kakaoUser ? (
                <></>
              ) : (
                <InputWrapper>
                  <InputWrap>
                    <Label>비밀번호 변경</Label>
                    <Input
                      placeholder="현재 비밀번호를 입력해주세요."
                      name="existingPassword"
                      type="password"
                      ref={register({
                        required: true,
                        pattern:
                          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/,
                      })}
                    />
                    <ErrorMsg>
                      {errors.existingPassword &&
                        errors.existingPassword.type === 'required' &&
                        '현재 비밀번호를 입력해주세요.'}
                      {errors.existingPassword &&
                        errors.existingPassword.type === 'pattern' &&
                        '현재 비밀번호는 8~20자 사이의 영문, 숫자, 특수문자를 사용하여 입력해주세요.'}
                    </ErrorMsg>
                  </InputWrap>
                  <InputWrap>
                    <Label>새 비밀번호</Label>
                    <Input
                      placeholder="영문, 숫자, 특수문자 조합 8자리 이상"
                      name="password"
                      type="password"
                      ref={register({
                        required: true,
                        pattern:
                          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/,
                      })}
                    />
                    <ErrorMsg>
                      {errors.password &&
                        errors.password.type === 'required' &&
                        '새 비밀번호를 입력해주세요.'}
                      {errors.password &&
                        errors.password.type === 'pattern' &&
                        '새 비밀번호는 8~20자 사이의 영문, 숫자, 특수문자를 사용하여 입력해주세요.'}
                    </ErrorMsg>
                    <Input
                      placeholder="비밀번호를 한번 더 입력해주세요."
                      name="passwordConfirm"
                      type="password"
                      ref={register({
                        required: true,
                        validate: (value) => value === password.current,
                      })}
                    />
                    <ErrorMsg>
                      {errors.passwordConfirm &&
                        errors.passwordConfirm.type === 'required' &&
                        '비밀번호를 다시 한번 입력해주세요.'}
                      {errors.passwordConfirm &&
                        errors.passwordConfirm.type === 'validate' &&
                        '비밀번호가 일치하지 않습니다.'}
                    </ErrorMsg>
                  </InputWrap>
                  <Button style={{ marginTop: '30px' }}>변경하기</Button>
                </InputWrapper>
              )}
              <ButtonWrap>
                <Btn
                  type="button"
                  onClick={() => {
                    createGAEvent('회원탈퇴');
                    setIsShow(true);
                  }}
                >
                  <BtnTitle>회원탈퇴</BtnTitle>
                  <IconNext />
                </Btn>
              </ButtonWrap>
            </Body>
          </Container>
        </>
      ) : (
        <>
          <PageTitle title="회원 탈퇴" />
          <Header>
            <BtnClose
              type="button"
              onClick={() => setIsShow(false)}
              className="close"
            >
              <IconClose />
            </BtnClose>
            회원 탈퇴
          </Header>
          <Container onSubmit={handleSubmit(onSubmitFeedback)}>
            <Body>
              <DescWrap>
                <DescContent>
                  잠깐만요!
                  <DescStrong marginTop="40px">탈퇴하시면,</DescStrong>
                  <DescUl>
                    <DestLi style={{ marginTop: '12px' }}>
                      본 계정으로 다시는 로그인할 수 없습니다.
                    </DestLi>
                    <DestLi>
                      캘린더 일정이나 갤러리 등 가족과 공유하는 일부 정보는 계속
                      남아있을 수 있습니다.
                    </DestLi>
                    <DestLi>
                      커뮤니티에서 작성하신 글과 댓글은 삭제되어 복구할 수
                      없습니다.
                    </DestLi>
                  </DescUl>
                  <DescStrong marginTop="28px">
                    탈퇴하시는 이유가 무엇인가요?
                  </DescStrong>
                </DescContent>
              </DescWrap>
              <TxtArea
                placeholder="탈퇴 사유를 적어주세요."
                id="feedback"
                name="feedback"
                ref={register({
                  required: true,
                  pattern: /^(?=.{10,}$).*/,
                })}
              ></TxtArea>
              <ErrorMsg>
                {errors.feedback &&
                  errors.feedback.type === 'required' &&
                  '탈퇴 사유를 입력해주세요.'}
                {errors.feedback &&
                  errors.feedback.type === 'pattern' &&
                  '10자 이상 입력해주세요.'}
              </ErrorMsg>
              <PolicyWrap>
                <PolicyCheck>
                  <Checkinput
                    type="checkbox"
                    id="agree"
                    name="agree"
                    ref={register({ required: true })}
                  />
                  <Label htmlFor="agree">
                    <PolicyIcon
                      src={`${process.env.PUBLIC_URL}/images/check_8px.png`}
                      alt="아이콘"
                    />
                    <span>모든 정보를 삭제하는 것에 동의합니다.</span>
                  </Label>
                </PolicyCheck>
                <ErrorMsg>
                  {errors.policy &&
                    errors.policy.type === 'required' &&
                    '정보 삭제에 동의해주세요.'}
                </ErrorMsg>
                <Button>화목 탈퇴하기</Button>
              </PolicyWrap>
            </Body>
          </Container>
        </>
      )}
    </>
  );
};

export default EditPassword;

const Container = styled.form`
  height: 100vh;
  position: relative;
  background: #ffffff;
`;

const Body = styled.div`
  padding: 0 20px;
`;

const InputWrapper = styled.div`
  border-bottom: 8px solid #efefef;
  margin-bottom: 37px;
`;

const InputWrap = styled.div`
  margin-top: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const ErrorMsg = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: #c53737;
  margin-top: 8px;
`;

const ButtonWrap = styled.div`
  padding: 0 20px;
  margin: 0 -20px;
`;

const BtnTitle = styled.h3`
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
`;

const Btn = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #dadada;
  padding: 24px 0;
`;

const Header = styled.div`
  height: 55px;
  padding: 19px 0 15px;
  background: #fff;
  text-align: center;
  font-weight: 700;
  z-index: 50;

  @media only screen and (min-width: 1025px) {
    width: 500px;
  }
`;

const BtnClose = styled.button`
  position: absolute;
  top: 7px;
  left: 5px;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  svg {
    margin-right: 2px;
    cursor: pointer;
  }
  &.back svg {
    margin-top: 2px;
  }
  span {
    margin-left: 5px;
    font-size: 14px;
    font-weight: 700;
  }
`;

const DescWrap = styled.div`
  padding-top: 25px;
`;

const DescContent = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 21px;
  color: #191919;
`;

const DescStrong = styled.p`
  margin-top: ${(props) => props.marginTop};
  font-weight: 700;
  line-height: 19px;
  color: #191919;
`;

const DescUl = styled.ul`
  list-style: inside;
`;

const DestLi = styled.li`
  margin-top: 8px;
`;

const TxtArea = styled.textarea`
  width: 100%;
  height: 165px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  padding: 18px 14px;
  margin-top: 20px;
  background: #ffffff;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  resize: none;

  ::placeholder {
    color: #bdbdbd;
  }
`;

const PolicyWrap = styled.div`
  margin-top: 40px;
  position: relative;

  span {
    margin-left: 4px;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #191919;
  }
  button {
    margin-top: 44px;
  }
`;

const PolicyCheck = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

const PolicyIcon = styled.img`
  position: absolute;
  top: 7px;
  left: 5px;
`;
