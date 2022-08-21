import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IconFilter } from '../../assets/icons';

const Header = ({ text }) => {
  return (
    <HeaderContainer>
      {text}
      <IconFilter />
    </HeaderContainer>
  );
};

Header.propTypes = {
  text: PropTypes.string,
};

export default Header;

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  padding: 0 20px;
  background: #fff;
  color: #18191f;
  font-size: 20px;
  font-weight: 700;
`;
