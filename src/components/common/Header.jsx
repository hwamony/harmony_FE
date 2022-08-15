import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IconBack } from '../../assets/icons';

const Header = ({ text }) => {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <button type="button" onClick={() => navigate(-1)}>
        <IconBack />
      </button>
      {text}
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 19px 0 15px;
  border-bottom: 2px solid #f2f2f2;
  background: #fff;
  text-align: center;
  font-weight: 700;
  button {
    position: absolute;
    top: 19px;
    left: 15px;
  }
`;
