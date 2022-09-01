import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IconPlus, IconPost } from '../../assets/icons';
import { MdAddPhotoAlternate } from 'react-icons/md';

const BtnAdd = ({ link, text, plus, photo, community }) => {
  return (
    <>
      {IconPlus && (
        <Button to={link}>
          <p className="hidden">{text}</p>
          {plus && <IconPlus />}
          {photo && <span><MdAddPhotoAlternate /></span>}
          {community && <IconPost />}
        </Button>
      )}
    </>
  );
};

BtnAdd.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  plus: PropTypes.bool,
  photo: PropTypes.bool,
  community: PropTypes.bool,
};

export default BtnAdd;

const Button = styled(Link)`
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 52px;
  padding: 15px;
  background: ${({ theme }) => theme.palette.primary.main};
  border-radius: 50%;
  box-shadow: 0px 3px 30px rgba(0, 0, 0, 0.0784314);
  z-index: 50;
  span {
    svg {
      width: 21px;
      height: 21px;
      fill: #fff;
    }
  }

  @media only screen and (min-width: 1025px) {
    right: inherit;
    left: 1350px;
  }
`;
