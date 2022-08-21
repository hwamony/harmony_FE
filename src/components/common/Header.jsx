import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IconFilter } from '../../assets/icons';

const Header = ({ title, subtitle }) => {
  return (
    <HeaderContainer>
      <p>
        <Link to="/galleries">{title}</Link>
        {subtitle && <span>- {subtitle}</span>}
      </p>
      {!subtitle && <IconFilter />}
    </HeaderContainer>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
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
  height: 70px;
  padding: 0 20px;
  background: #fff;
  color: #18191f;
  font-size: 20px;
  font-weight: 700;
  span {
    margin-left: 5px;
    font-size: 16px;
    font-weight: 500;
  }
`;
