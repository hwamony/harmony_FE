import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
`;

export const Body = styled.div`
  width: 100%;
  position: relative;
  height: 100vh;
  padding: 10px 20px;
  background: #efefef;
  overflow-y: auto;
`;

export const EmptyWrap = styled.div`
  margin-top: 242px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const IconWrap = styled.div`
  width: 34px;
  height: 34px;
  border: 2px solid #a8a8a8;
  border-radius: 50%;
  display: flex;
  justify-content: center;

  svg > circle {
    fill: #a8a8a8;
  }
`;

export const EmptyDesc = styled.div`
  margin-top: 20px;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 1px;
  color: #838383;
  text-align: center;
`;

export const MailWrap = styled.div`
  height: 220px;
  padding: 18px;
  margin-top: 14px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 2px 2px 20px rgba(184, 187, 192, 0.24);
  position: relative;
`;

export const MailTitle = styled.div`
  margin-top: 7px;
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: 1px;
  color: #222b45;
`;

export const MailDesc = styled.div`
  margin-top: 6px;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0.75px;
  color: #adadad;
`;

export const DropdownWrap = styled.div`
  position: absolute;
  top: 30px;
  right: 12px;
  svg circle {
    fill: #bababa;
  }
  .MuiIconButton-root {
    height: 34px;
    margin-top: -17px;
  }
`;

export const AudioWrap = styled.div`
  width: 100%;
`;

export const UserWrap = styled.div`
  width: calc(100% - 38px);
  height: 48px;
  padding-top: 15px;
  border-top: 1px solid #dfdfdf;
  position: absolute;
  bottom: 0;
`;

export const From = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: 0.75px;
  color: #3ec192;
  float: left;
`;

export const To = styled(From)`
  float: right;
`;
