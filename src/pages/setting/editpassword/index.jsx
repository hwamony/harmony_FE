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
import Withdrawal from '../../../components/family/Withdrawal';
import { IconNext } from '../../../assets/icons';
import { Input } from '../../../styles/Input';
import { Button } from '../../../styles/Button';
import { Label } from '../../../styles/Label';

const EditPassword = () => {
  const navigate = useNavigate();
  const password = useRef();
  const { kakaoUser } = useValidUserData().data;
  const { register, handleSubmit, watch, errors } = useForm();
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
      createGAEvent('비밀번호 변경');
      alert('비밀번호 변경이 완료되었습니다.');
      navigate(-1);
    } catch (err) {
      alert(err.response.data.message);
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
                <>
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
                  <Division />
                </>
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
        <Withdrawal
          kakaoUser={kakaoUser}
          createGAEvent={createGAEvent}
          setIsShow={setIsShow}
          setIsVisible={setIsVisible}
        />
      )}
    </>
  );
};

export default EditPassword;

export const Container = styled.form`
  height: 100vh;
  position: relative;
  background: #ffffff;
`;

export const Body = styled.div`
  padding: 0 20px;
`;

const Division = styled.div`
  height: 8px;
  margin: 0 -20px;
  margin-top: 37px;
  background: #efefef;
`;

const InputWrap = styled.div`
  margin-top: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const ErrorMsg = styled.p`
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
