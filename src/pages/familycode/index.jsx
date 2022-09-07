import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Container,
  LogoWrap,
  WelcomeDesc,
  InputWrap,
  Inputdesc,
  InputTitle,
  Icon,
} from './style';
import { CodeLabel } from '../../styles/Label';
import { CodeInput } from '../../styles/Input';
import { Button } from '../../styles/Button';
import Modal from '../../components/common/Modal';

const Familycode = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalType, setModalType] = useState(null);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    setModalType(data.type);
    setIsVisible(true);
  };

  return (
    <>
      {isVisible === true && (
        <Modal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          type={modalType}
        />
      )}
      <Container onSubmit={handleSubmit(onSubmit)}>
        <LogoWrap>
          <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="로고" />
          <WelcomeDesc>환영합니다!</WelcomeDesc>
        </LogoWrap>
        <InputWrap>
          <CodeInput
            type="radio"
            name="type"
            id="create"
            value="create"
            ref={register({
              required: true,
            })}
          />
          <Icon>
            <img
              src={`${process.env.PUBLIC_URL}/images/check_18px.png`}
              alt="체크"
            />
          </Icon>
          <CodeLabel htmlFor="create">
            <Inputdesc>화목을 처음 이용하시나요?</Inputdesc>
            <InputTitle>코드생성</InputTitle>
          </CodeLabel>
        </InputWrap>
        <InputWrap>
          <CodeInput
            type="radio"
            name="type"
            id="join"
            value="join"
            ref={register({ required: true })}
          />
          <Icon>
            <img
              src={`${process.env.PUBLIC_URL}/images/check_18px.png`}
              alt="체크"
            />
          </Icon>
          <CodeLabel htmlFor="join">
            <Inputdesc>이미 가족들이 화목을 이용하시나요?</Inputdesc>
            <InputTitle>코드입력</InputTitle>
          </CodeLabel>
        </InputWrap>
        <Button style={{ marginTop: '50px' }}>다음으로</Button>
      </Container>
    </>
  );
};

export default Familycode;
