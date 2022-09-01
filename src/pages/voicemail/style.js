import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
`;

export const Header = styled.div`
  height: 60px;
  padding: 14px 0 0 20px;
  h1 {
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0.0333333px;
    color: #18191f;
  }
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

export const EmptyIcon = styled.img``;

export const EmptyDesc = styled.div`
  margin-top: 20px;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 1px;
  color: #838383;
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

export const DropdownWrap = styled.div``;

export const DropdownmenuBtn = styled.button`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 12px;
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 46px;
  right: 20px;
  background: #ffffff;
  width: 10vw;
  min-width: 120px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

export const DropdownContent = styled.div`
  padding: 4px 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const DropdownTitle = styled.div`
  padding-left: 6px;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.0333333px;
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