import styled from 'styled-components';

export const Container = styled.form`
  height: 100vh;
  padding: 20px;
`;

export const LogoWrap = styled.div`
  margin-top: 140px;
  text-align: center;
`;

export const InputWrap = styled.div`
  margin-top: 38px;
`;

export const BtnWrap = styled.div`
  margin-top: 40px;
`;

export const SocialLoginWrap = styled.div`
  display: flex;
`;

export const SocialLogin = styled.div`
  width: 50%;
  padding: 0 4px;
  margin-top: 16px;
`;

export const SocialLoginBtn = styled.a`
  width: 100%;
  height: 52px;
  padding-left: 18px;
  border-radius: 5px;
  margin-top: 16px;
  background: #3ec192;
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
  border: 1px solid #cbcbcb;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;  
`;

export const LoginDesc = styled.span`
  margin-left: 6px;
  color: #585858;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
`;

export const SignupLink = styled.div`
  margin: 120px 0 50px 0;
  text-align: center;
  cursor: pointer;
`;

export const ErrorMsg = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: #c53737;
  margin-top: 8px;
`;
