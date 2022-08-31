import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  padding: 20px;
`;

export const Header = styled.div`
  height: 60px;
  margon-bottom: 1px solid #f2f2f2;
  display: flex;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.0333333px;
  color: #18191f;
`;

export const Body = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 10px 20px;
  margin: -20px;
`;

export const NoticeWrap = styled.div``;

export const NoticeItem = styled.div`
  margin: 15px 0;
  display: flex;
  align-items: center;
  position: relative;
`;

export const IconWrap = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #3ec192;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DescWrap = styled.span`
  margin-left: 18px;
`;

export const DescTitle = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
`;

export const DescMsg = styled.div`
  margin-top: 8px;
  ont-weight: 400;
  font-size: 14px;
  line-height: 17px;
`;

export const TimeWrap = styled.span`
  position: absolute;
  right: 0;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #9a9a9a;
`;
