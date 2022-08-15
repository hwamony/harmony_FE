import React from 'react';
import { Container, LogoWrap, WelcomeDesc, InputWrap, Inputdesc, InputTitle } from './style'
import { CodeLabel } from '../../components/Label';
import { CodeInput } from '../../components/Input';
import { Button } from '../../components/Button'

const Familycode = () => {
    return (
        <Container>
            <LogoWrap>
                <div
                    style={{
                        width: '160px',
                        height: '74px',
                        margin: 'auto',
                        background: '#D9D9D9',
                    }}
                >
                    LOGO
                </div>
                <WelcomeDesc>환영합니다!</WelcomeDesc>
            </LogoWrap>
            <InputWrap>
                    <CodeInput type='radio' name='code' id='create' value='create'></CodeInput>
                    <CodeLabel htmlFor='create'>
                        <Inputdesc>화목을 처음 이용하시나요?</Inputdesc>
                        <InputTitle>코드생성</InputTitle>
                    </CodeLabel>
            </InputWrap>
            <InputWrap>
                    <CodeInput type='radio' name='code' id='join' value='join'></CodeInput>
                    <CodeLabel htmlFor='join'>
                        <Inputdesc>이미 가족들이 화목을 이용하시나요?</Inputdesc>
                        <InputTitle>코드입력</InputTitle>
                    </CodeLabel>
            </InputWrap>
            <Button style={{marginTop: '50px'}}>다음으로</Button>
        </Container>
    );
};

export default Familycode;