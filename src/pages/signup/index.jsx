import React from 'react';
import { Input, Checkinput, RadioInput } from '../../components/Input';
import { Button, InlineButton, BackButton } from '../../components/Button';
import { Label, RadioLabel } from '../../components/Label';
import { Container, Title, InputWrap, PolicyWrap, PolicyDesc, PolicyLink, PolicyCheck, ButtonWrap } from './style';
import { useState } from 'react';
import { useNavigate } from '../../../node_modules/react-router-dom/index';
import api from '../../api/AxiosManager';

const Signup = () => {
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
        name: '',
        nickname: ''
    })
    const [formErrors, setFormErrors] = useState({})
    
    const navigate = useNavigate()

    const idOverlapCheck = async (e) => {

        // try {
        //     const response = await api.post('api/email-check', {
        //         email: email
        //     })
        //     console.log("response >>", response)
        //   }
        // catch(err) {
        //     console.log("Error >>", err);
        //   }
        alert('중복!')
        e.preventDefault()
    }

    const nicknameOverlapCheck = async (e) => {

        // try {
        //     const response = await api.post('api/nickname-check', {
        //         nickname: nickname
        //     })
        //     console.log("response >>", response)
        //   }
        // catch(err) {
        //     console.log("Error >>", err);
        //   }
        e.preventDefault()
    }

    const SignupApi = async () => {
        const { email, nickname,  password, passwordConfirm, name } = formValues;
        try {
            const response = await api.post('/api/signup', {
                email: email,
                nickname: nickname,
                password: password,
                passwordConfirm: passwordConfirm,
                name: name,
                gender: ''
            })
            console.log(response)  
        }
        catch(err) { console.log(err) }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormErrors(validate(formValues))
        // const data = new FormData(e.target)
        // console.log(Object.fromEntries(data.entries()))

    }

    const validate = (values) => {

    }

    return (
        <Container onSubmit={(e) => {handleSubmit(e)}}>
            <BackButton style={{ background: '#DDDDDD' }} onClick={() => navigate('/login')}></BackButton>
            <Title>회원가입</Title>
            <InputWrap>
                <Label>이메일</Label>
                <Input style={{ width: '246px' }} placeholder='아이디를 입력해주세요.' name='email'/>
                <InlineButton onClick={(e) => idOverlapCheck(e)}>중복확인</InlineButton>
            </InputWrap>
            <InputWrap>
                <Label>비밀번호</Label>
                <Input placeholder='비밀번호를 입력해주세요.' name='password'/>
            </InputWrap>
            <InputWrap>
                <Label>비밀번호 확인</Label>
                <Input placeholder='비밀번호를 한번 더 입력해주세요.' name='passwordConfirm'/>
            </InputWrap>
            <InputWrap>
                <Label>이름</Label>
                <Input placeholder='이름를 입력해주세요.' name='name'/>
            </InputWrap>
            <InputWrap>
                <Label>닉네임</Label>
                <Input style={{ width: '246px' }} placeholder='닉네임를 입력해주세요.' name='nickname'/>
                <InlineButton onClick={(e) => nicknameOverlapCheck(e)}>중복확인</InlineButton>
            </InputWrap>
            <InputWrap>
                <Label>성별</Label>
                <div>
                    <RadioInput type='radio' id='male' name='gender' value='male'/><RadioLabel htmlFor='male'>남성</RadioLabel>
                    <RadioInput type='radio' id='female' name='gender' value='female'/><RadioLabel htmlFor='female'>여성</RadioLabel>
                </div>

            </InputWrap>
            <PolicyWrap>
                <PolicyDesc>화목 이용약관, 개인정보 수집 및 이용에 모두 동의합니다.</PolicyDesc>
                <PolicyLink onClick={() => navigate()}>더 알아보기</PolicyLink>
                <PolicyCheck>
                    <Checkinput type='checkbox' id='policy' name='policy' value='agree'/>
                    <Label htmlFor="policy" style={{ fontWeight: '400' }}>동의함</Label>
                </PolicyCheck>
            </PolicyWrap>
            <ButtonWrap>
                <Button onClick={() => SignupApi}>가입하기</Button>
            </ButtonWrap>
        </Container>
    );
};

export default Signup;