import React from 'react';
import { Button } from '../../../styles/Button';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    CongraturaionIcon,
    Title,
    Desc
} from './style'


const SignupComplete = () => {
    const navigate = useNavigate()

    return (
        <Container>
            <CongraturaionIcon>
                <img src={`${process.env.PUBLIC_URL}/images/congratulations.png`} alt="로고" />
            </CongraturaionIcon>
            <Title>회원가입이 완료되었습니다.</Title>
            <Desc>가족들과 행복한 시간을<br/>공유해보세요.</Desc>
            <Button style={{ marginTop: '44px' }} onClick={() => navigate('/')}>로그인</Button>
        </Container>
    );
};

export default SignupComplete;