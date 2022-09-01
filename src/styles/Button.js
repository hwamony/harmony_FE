import styled from 'styled-components';

export const Button = styled.button`
  display: block;
  width: 100%;
  height: 52px;
  padding-left: 18px;
  border-radius: 5px;
  background: #3ec192;
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
`;

export const OutlineButton = styled(Button)`
  border: 1px solid #cbcbcb;
  background: #ffffff;
`;

export const InlineButton = styled(Button)`
  position: absolute;
  top: 25px;
  right: 0;
  width: 80px;
  padding: 18px;
  font-size: 12px;
  font-weight: 400;
`;

export const BackButton = styled.img`
  position: absolute;
  top: 14px;
  left: 20px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
