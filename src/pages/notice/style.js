import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px 20px 85px;
`;

export const Header = styled.div`
  height: 60px;
  margin-bottom: 1px solid #f2f2f2;
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
  padding: 15px 20px 20px;
  margin: -20px;
  .wrapper-btn {
    display: flex;
    justify-content: flex-end;
    margin-right: -6px;

    button {
      color: red;
    }
  }
`;

export const NoticeWrap = styled.div``;

export const NoticeItem = styled.div`
  margin: 15px 0 30px;
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
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
`;

export const TimeWrap = styled.span`
  position: absolute;
  top: 4px;
  right: 0;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #9a9a9a;
`;
