import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Header = ({ title, link }) => {
  return (
    <HeaderContainer>
      <Link to={link}>
        <h1>{title}</h1>
      </Link>
    </HeaderContainer>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
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
  height: 60px;
  padding: 0 20px;
  background: #fff;
  z-index: 200;
  h1 {
    color: #18191f;
    font-size: 20px;
    font-weight: 700;
  }
`;
