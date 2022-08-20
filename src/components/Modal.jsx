import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Input } from './Input';
import { useForm } from 'react-hook-form';
import api from '../api/AxiosManager';
import { useNavigate } from 'react-router-dom';

const Modal = (props) => {
    const [ type, setType ] = useState(props.type)
    const [ familycode, setFamilycode ] = useState('')
    const { register, handleSubmit } = useForm();
    const { isVisible, setIsVisible } = props
    const navigate = useNavigate()

    const ModalClose = () => {
        setIsVisible(false);
    }

    const createApi = async (data) => {
        try {
            const response = await api.post('/families', data);
            setType('copy');
            setFamilycode(response.data.data.familyCode);
        } catch (err) {
            console.log('err>>', err.response);
        }
    }

    const joinApi = async (data) => {
        const errorMsg = document.getElementById("errorMsg");

        try {
            const response = await api.put('/family/join', data);
            navigate('/')
        } catch (err) {
            console.log('err>>', err.response.data);
            errorMsg.innerText = err.response.data.message;
        }
    }

    const onDimmerClick = (event) => {
        if (event.currentTarget !== event.target) return;
        ModalClose();
    }

    const ClipboardCopy = (e) => {
        const tempElement = document.createElement("textarea");
        document.body.appendChild(tempElement);
        tempElement.value = e.target.innerText;
        tempElement.select();
        document.execCommand('copy');
        document.body.removeChild(tempElement);
    }

    const Create = () => {
        return (
            <ContentsWrap onSubmit={handleSubmit(createApi)}>
                <Desc>가족 이름을 입력해주세요.</Desc>
                <InputWrap>
                    <Input name='familyName' style={{ border: 'none', background: '#EFEFEF' }} placeholder='예) 화목네'
                        ref={register({ required: true })}
                    />
                </InputWrap>
                <BtnWrap>
                    <ModalBtn fontWeight='400' onClick={ModalClose}>취소</ModalBtn>
                    <ModalBtn fontWeight='600'>확인</ModalBtn>
                </BtnWrap>
            </ContentsWrap>
        )
    }

    const Copy = () => {
        return (
            <ContentsWrap>
                <Desc>코드가 생성되었습니다.</Desc>
                <CodeWrap>
                    <Code onClick={ClipboardCopy}>{familycode}</Code>
                    <CodeDesc>클릭하면 코드가 복사됩니다.</CodeDesc>
                </CodeWrap>
                <BtnWrap>
                    <ModalBtn fontWeight='400' onClick={ModalClose}>취소</ModalBtn>
                    <ModalBtn fontWeight='600' onClick={ModalClose}>확인</ModalBtn>
                </BtnWrap>
            </ContentsWrap>
        )
    }

    const Join = () => {
        return (
            <ContentsWrap onSubmit={handleSubmit(joinApi)}>
                <Desc>코드를 입력해주세요.</Desc>
                <InputWrap>
                    <Input name='familyCode' style={{ border: 'none', background: '#EFEFEF' }} placeholder='예) 94321114'
                        ref={register()}
                    />
                    <ErrorMsg id='errorMsg'></ErrorMsg>
                </InputWrap>
                <BtnWrap>
                    <ModalBtn fontWeight='400' onClick={ModalClose}>취소</ModalBtn>
                    <ModalBtn fontWeight='600'>확인</ModalBtn>
                </BtnWrap>
            </ContentsWrap>
        )
    }

    return (
        <ModalWrap visible={isVisible}>
            <Overlay onClick={onDimmerClick}>
                <ModalInner>
                { type === 'create' && <Create></Create>}
                { type === 'copy' && <Copy></Copy>}
                { type === 'join' && <Join></Join>}
                </ModalInner>
            </Overlay>
        </ModalWrap>
    );
};

export default Modal;

const ModalWrap = styled.div`
    display: ${(props) => (props.visible ? 'block' : 'none')};
`

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 999;
`

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
    background: #FFFFFF;
`

const ContentsWrap = styled.form`
`

const Desc = styled.div`
    font-weight: 400;
    font-size: 18px;
    text-align: center;
`

const InputWrap = styled.div`
    margin-top: 12px;
`

const CodeWrap = styled.div`
    margin-top: 24px;
    text-align: center;
`

const Code = styled.div`
    font-size: 20px;
    font-weight: 700;
    color: #000000;
    text-decoration: underline;
    cursor: pointer;
`

const CodeDesc = styled.div`
    margin-top: 10px;
    font-size: 12px;
    font-weight: 400;
    color: #595959;
`

const ErrorMsg = styled.div`
    margin-top: 6px;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    color: #C53737;
`

const BtnWrap = styled.div`
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
`

const ModalBtn = styled.button`
    width: 50%;
    height: 56px;
    border-top: 1px solid #DADADA;
    font-weight: ${(props) => props.fontWeight};
    font-size: 18px;
`