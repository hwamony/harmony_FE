import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Input } from '../../../styles/Input';
import { Button } from '../../../styles/Button';
import { Label } from '../../../styles/Label';
import api from '../../../api/AxiosManager';
import PageTitle from '../../../components/common/PageTitle';
import HeaderMid from '../../../components/common/HeaderMid';
import { useValidUserData } from '../../../hooks/useData';

// 추후 임포트 삭제
import InProgress from '../../../components/common/InProgress';

const EditPassword = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const navigate = useNavigate();
  const password = useRef();
  password.current = watch('password');
  const { kakaoUser } = useValidUserData().data;
  console.log(kakaoUser);
  const onSubmit = async (data) => {
    try {
      const response = await api.put('/mypage/password', data);
      console.log('response >>', response.data);
      alert('비밀번호 변경이 완료되었습니다.');
      navigate(-1);
    } catch (err) {
      console.log('Error >>', err.response.data);
    }
  };

  return (
    <>
      {kakaoUser ? (
        <>
          <InProgress />
        </>
      ) : (
        <>
          <PageTitle title="비밀번호 변경" />
          <HeaderMid text="비밀번호 변경" />
          <Container onSubmit={handleSubmit(onSubmit)}>
            <Body>
              <InputWrap>
                <Label>
                  기존 비밀번호<Asterisk>*</Asterisk>
                </Label>
                <Input
                  placeholder="기존 비밀번호를 입력해주세요."
                  name="existingPassword"
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
                    '기존 비밀번호을 입력해주세요.'}
                  {errors.password &&
                    errors.password.type === 'pattern' &&
                    '기존 비밀번호는 8~20자 사이의 영문, 숫자, 특수문자를 사용하여 입력해주세요.'}
                </ErrorMsg>
              </InputWrap>

              <InputWrap>
                <Label>
                  신규 비밀번호<Asterisk>*</Asterisk>
                </Label>
                <Input
                  placeholder="신규 비밀번호를 입력해주세요."
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
                    '신규 비밀번호을 입력해주세요.'}
                  {errors.password &&
                    errors.password.type === 'pattern' &&
                    '신규 비밀번호는 8~20자 사이의 영문, 숫자, 특수문자를 사용하여 입력해주세요.'}
                </ErrorMsg>
              </InputWrap>

              <InputWrap>
                <Label>
                  신규 비밀번호 확인<Asterisk>*</Asterisk>
                </Label>
                <Input
                  placeholder="신규 비밀번호를 한번 더 입력해주세요."
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
                    '신규 비밀번호를 다시 한번 입력해주세요.'}
                  {errors.passwordConfirm &&
                    errors.passwordConfirm.type === 'validate' &&
                    '신규 비밀번호가 동일하지 않습니다.'}
                </ErrorMsg>
              </InputWrap>
              <ButtonWrap>
                <Button>비밀번호 변경</Button>
              </ButtonWrap>
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
  padding: 20px;
  position: relative;
  background: #ffffff;
`;

const Body = styled.div``;

const InputWrap = styled.div`
  margin-top: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Asterisk = styled.span`
  color: #c53737;
`;

const ButtonWrap = styled.div`
  margin-top: 40px;
`;

const ErrorMsg = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: #c53737;
  margin-top: 8px;
`;
