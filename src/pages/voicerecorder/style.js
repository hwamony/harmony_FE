import styled from 'styled-components';

export const Container = styled.div`
  height: 110vh;
  padding: 20px;
`;

export const Header = styled.div`
  width: 100%;
  height: 60px;
  padding: 15px 0;
  background: #ffffff;
  position: absolute;
  top: 0;
  left: 0;
`;

export const Title = styled.h1`
  font-size: 15px;
  font-weight: 600;
  text-align: center;
`;
export const Body = styled.div``;

export const InputWrap = styled.div`
  padding-top: 24px;
`;

export const LabelTitle = styled.span`
  margin-left: 10px;
  font-weight: 500;
`;

export const RecordWrap = styled.div`
  margin-top: 40px;
  text-align: center;
`

export const WaveImg = styled.img`
  width: 100%;
`

export const Currnettime = styled.div`
  margin-top: 14px;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  color: #8C8C8C;
`

export const RecordBtn = styled.button`
  width: 80px;
  height: 80px;
  border: 2px solid #3EC192;
  border-radius: 40px;
  margin-top: 32px;
  background-image: url(${process.env.PUBLIC_URL}/images/record.png);
  background-repeat: no-repeat;
  background-position: center;
`