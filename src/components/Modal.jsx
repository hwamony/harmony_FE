import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from './Input';
import { useForm } from 'react-hook-form';
import api from '../api/AxiosManager';
import { useNavigate } from 'react-router-dom';

const Modal = (props) => {
  const [modalData, setModalData] = useState({
    type: props.type,
    familycode: '',
    errormessage: '',
  });
  const { type, familycode, errormessage } = modalData;
  const { register, handleSubmit, errors } = useForm();
  const { isVisible, setIsVisible } = props;
  const navigate = useNavigate();

  const ModalClose = () => {
    setIsVisible(false);
  };

  const createHandler = async (data) => {
    try {
      const response = await api.post('/families', data);
      console.log(response);
      setModalData({
        ...modalData,
        type: 'copy',
        familycode: response.data.data.familyCode,
      });
    } catch (err) {
      console.log('err>>', err.response);
      setModalData({
        ...modalData,
        errormessage: err.response.data.message,
      });
    }
  };

  const copyHandler = () => {
    const familycode = document.getElementById('familycode');
    const tempElement = document.createElement('textarea');
    document.body.appendChild(tempElement);
    tempElement.value = familycode.innerText;
    tempElement.select();
    document.execCommand('copy');
    document.body.removeChild(tempElement);
    ModalClose();
    navigate('/role');
  };

  const joinHandler = async (data) => {
    try {
      const response = await api.put('/family/join', data);
      navigate('/role');
    } catch (err) {
      console.log('err>>', err.response.data);
      setModalData({
        ...modalData,
        errormessage: err.response.data.message,
      });
    }
  };

  const onDimmerClick = (event) => {
    if (event.currentTarget !== event.target) return;
    ModalClose();
  };

  const onDimmerCopy = (event) => {
    if (event.currentTarget !== event.target) return;
    copyHandler();
  };

  const ClipboardCopy = (e) => {
    const tempElement = document.createElement('textarea');
    document.body.appendChild(tempElement);
    tempElement.value = e.target.innerText;
    tempElement.select();
    document.execCommand('copy');
    document.body.removeChild(tempElement);
  };

  const Create = () => {
    return (
      <ContentsWrap onSubmit={handleSubmit(createHandler)}>
        <Desc>가족 이름을 입력해주세요.</Desc>
        <InputWrap>
          <Input
            name="familyName"
            style={{ border: 'none', background: '#EFEFEF' }}
            placeholder="예) 화목네"
            type="text"
            ref={register({ required: true })}
          />
          <ErrorMsg id="errorMsg">
            {errors.familyName && errors.familyName.type === 'required'
              ? '가족 이름을 입력해주세요.'
              : errormessage}
          </ErrorMsg>
        </InputWrap>
        <BtnWrap>
          <ModalBtn
            style={{ fontWeight: '400', borderRight: '1px solid #DADADA' }}
            onClick={ModalClose}
          >
            취소
          </ModalBtn>
          <ModalBtn style={{ fontWeight: '600', color: '#3EC192' }}>
            확인
          </ModalBtn>
        </BtnWrap>
      </ContentsWrap>
    );
  };

  const Copy = () => {
    return (
      <ContentsWrap onSubmit={handleSubmit(copyHandler)}>
        <Desc>코드가 생성되었습니다.</Desc>
        <CodeWrap>
          <Code id="familycode" onClick={ClipboardCopy}>
            {familycode}
          </Code>
          <CodeDesc>클릭하면 코드가 복사됩니다.</CodeDesc>
        </CodeWrap>
        <BtnWrap>
          <ModalBtn
            style={{ width: '100%', fontWeight: '600', color: '#3EC192' }}
          >
            확인
          </ModalBtn>
        </BtnWrap>
      </ContentsWrap>
    );
  };

  const Join = () => {
    return (
      <ContentsWrap onSubmit={handleSubmit(joinHandler)}>
        <Desc>코드를 입력해주세요.</Desc>
        <InputWrap>
          <Input
            name="familyCode"
            style={{ border: 'none', background: '#EFEFEF' }}
            placeholder="예) 94321114"
            ref={register({ required: true })}
          />
          <ErrorMsg id="errorMsg">
            {errors.familyCode && errors.familyCode.type === 'required'
              ? '가족 코드을 입력해주세요.'
              : errormessage}
          </ErrorMsg>
        </InputWrap>
        <BtnWrap>
          <ModalBtn
            style={{ fontWeight: '400', borderRight: '1px solid #DADADA' }}
            onClick={ModalClose}
          >
            취소
          </ModalBtn>
          <ModalBtn style={{ fontWeight: '600', color: '#3EC192' }}>
            확인
          </ModalBtn>
        </BtnWrap>
      </ContentsWrap>
    );
  };

  return (
    <ModalWrap visible={isVisible}>
      <Overlay onClick={type !== 'join' ? onDimmerClick : onDimmerCopy}>
        <ModalInner>
          {type === 'create' && <Create></Create>}
          {type === 'copy' && <Copy></Copy>}
          {type === 'join' && <Join></Join>}
        </ModalInner>
      </Overlay>
    </ModalWrap>
  );
};

export default Modal;

const ModalWrap = styled.div`
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  width: 335px;
  max-width: 480px;
  height: 210px;
  padding: 34px 26px;
  border-radius: 10px;
  margin: auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background: #ffffff;
`;

const ContentsWrap = styled.form``;

const Desc = styled.div`
  font-weight: 400;
  font-size: 18px;
  text-align: center;
`;

const InputWrap = styled.div`
  margin-top: 12px;
`;

const CodeWrap = styled.div`
  margin-top: 24px;
  text-align: center;
`;

const Code = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #000000;
  text-decoration: underline;
  cursor: pointer;
`;

const CodeDesc = styled.div`
  margin-top: 10px;
  font-size: 12px;
  font-weight: 400;
  color: #595959;
`;

const ErrorMsg = styled.div`
  margin-top: 6px;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  color: #c53737;
`;

const BtnWrap = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const ModalBtn = styled.button`
  width: 50%;
  height: 56px;
  border-top: 1px solid #dadada;
  font-size: 18px;
  cursor: pointer;
`;
