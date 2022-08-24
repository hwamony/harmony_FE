import React from 'react';
import { BackButton, Button } from '../../components/Button'
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Header,
    Title,
    Body,
    InputWrap,
    LabelTitle
} from './style copy'
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';

const Recoder = () => {
    const navigate = useNavigate()

    return (
        <Container>
             <Header>
              <BackButton src={`${process.env.PUBLIC_URL}/images/back.png`} alt="뒤로가기" onClick={() => navigate(-1)} />
              <Title>녹음등록</Title>
            </Header>
            <Body>
            <InputWrap>
                <Input id='title' placeholder='제목' style={{ margin: '24px 0' }}></Input>
            </InputWrap>
            <InputWrap style={{ borderTop: '1px solid #EBEBEB' }}>
                <Label htmlFor='from' style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={`${process.env.PUBLIC_URL}/images/from.png`} alt="아이콘" />
                    <LabelTitle>보내는사람</LabelTitle>
                </Label>
                <Input id='from' placeholder='from.' style={{ marginTop: '16px' }}></Input>
            </InputWrap>
            <InputWrap>
                <Label htmlFor='to' style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={`${process.env.PUBLIC_URL}/images/to.png`} alt="아이콘" />
                    <LabelTitle>받는사람</LabelTitle>
                </Label>
                <Input id='to' placeholder='to.' style={{ marginTop: '16px' }}></Input>
            </InputWrap>
            <Button>등록하기</Button>
            </Body>
        </Container>
    );
};

export default Recoder;