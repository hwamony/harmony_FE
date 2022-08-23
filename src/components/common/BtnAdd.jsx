import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IconPlus } from '../../assets/icons';

const BtnAdd = ({ link, text }) => {
  return (
    <>
      {IconPlus && (
        <Button to={link}>
          <p className="hidden">{text}</p>
          <IconPlus />
        </Button>
      )}
    </>
  );
};

BtnAdd.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default BtnAdd;

const Button = styled(Link)`
  position: fixed;
  bottom: 80px;
  right: 20px;
  padding: 15px;
  background: ${({ theme }) => theme.palette.primary.main};
  border-radius: 50%;
  box-shadow: 0px 3px 30px rgba(0, 0, 0, 0.0784314);
  z-index: 50;
`;
