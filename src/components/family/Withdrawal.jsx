import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import api from '../../api/AxiosManager';
import PageTitle from '../common/PageTitle';

import { IconClose } from '../../assets/icons';
import { useUserNickname } from '../../hooks/useData';
import { Body, Container, ErrorMsg } from '../../pages/setting/editpassword/index';
import { Checkinput } from '../../styles/Input';
import { Button } from '../../styles/Button';
import { Label } from '../../styles/Label';

const Withdrawal = ({ kakaoUser, createGAEvent, setIsShow, setIsVisible }) => {
  const { register, handleSubmit, errors } = useForm();
  const { nickname } = useUserNickname().data;

  const onSubmitFeedback = async (data) => {
    try {
      await api.post('/withdrawal', data);
      createGAEvent('회원탈퇴 피드백 제출');
      if (kakaoUser) {
        onSubmitDelete();
      } else {
        setIsVisible(true);
      }
    } catch (err) {
      console.log('Error >>', err.response.data);
    }
  };

  const onSubmitDelete = async () => {
    try {
      await api.delete('/withdrawal', { data: { password: 'kakaoUser' } });
      alert('그동안 화목을 이용해주셔서 감사합니다.');
      window.location.href = '/';
      return localStorage.removeItem('TOKEN');
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
              {nickname}님,
              <br />
              잠깐만요!
              <DescStrong marginTop="40px">탈퇴하시면,</DescStrong>
              <DescUl>
                <DestLi style={{ marginTop: '12px' }}>
                  사용하고 계신 이메일은 탈퇴할 경우 재사용 및 복구가
                  불가능합니다. 탈퇴한 아이디는{' '}
                  <em>본인과 타인 모두 재사용 및 복구가 불가</em>하오니 신중하게
                  선택하시기 바랍니다.
                </DestLi>
                <DestLi>
                  탈퇴 후 다음의 서비스 이용기록은 모두 삭제됩니다.
                  <span>커뮤니티: 게시물, 댓글, 좋아요 삭제</span>
                </DestLi>
                <DestLi>
                  탈퇴 후에도 가족 탭의 이용기록은 그대로 남아있습니다. 가족
                  탭에서 작성한 내역은 탈퇴 시 자동 삭제되지 않고 가족에게
                  그대로 남아있습니다. 삭제를 원하시는 내용이 있다면{' '}
                  <em>반드시 탈퇴 전 삭제하시기 바랍니다.</em>
                  <span>캘린더: 작성한 일정 및 참여자 여부</span>
                  <span>갤러리: 작성한 앨범, 업로드한 사진, 댓글</span>
                  <span>소리샘: 작성한 음성 메시지</span>
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
              pattern: /^(?=.{15,}$).*/,
            })}
          ></TxtArea>
          <ErrorMsg>
            {errors.feedback &&
              errors.feedback.type === 'required' &&
              '탈퇴 사유를 입력해주세요.'}
            {errors.feedback &&
              errors.feedback.type === 'pattern' &&
              '탈퇴사유는 15자 이상 입력해주세요.'}
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
  );
};

export default Withdrawal;

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
  line-height: 1.4;
  em {
    color: crimson !important;
  }
  span {
    display: block;
    margin-left: 22px;
    color: #777;
  }
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
