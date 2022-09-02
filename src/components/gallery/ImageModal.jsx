import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { IconClose, IconSave } from '../../assets/icons';

const ImageModal = ({ isVisible, setIsVisible, url, date }) => {
  const ModalClose = () => {
    setIsVisible(false);
  };

  const onDimmerClick = (e) => {
    if (e.currentTarget !== e.target) return;
    ModalClose();
  };

  return (
    <ModalWrap visible={isVisible}>
      <Overlay onClick={onDimmerClick}>
        <button onClick={ModalClose} className="close">
          <IconClose />
        </button>
        <p>{dayjs(date).format('YYYY년 M월 D일')}</p>
        <a rel="noreferrer" href={url} className="save">
          <IconSave />
        </a>
        <ModalInner>
          <img src={url} alt="" />
        </ModalInner>
      </Overlay>
    </ModalWrap>
  );
};

ImageModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  setIsVisible: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default ImageModal;

const ModalWrap = styled.div`
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
  button.close {
    position: absolute;
    top: 11px;
    left: 10px;
    width: 35px;
    height: 35px;
    cursor: pointer;
    z-index: 10;
    svg path {
      stroke: #fff;
    }
  }
  a.save {
    position: absolute;
    top: 17px;
    right: 10px;
    width: 35px;
    height: 35px;
  }
  p {
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    color: #fff;
    text-align: center;
    user-select: none;
  }
`;

const ModalInner = styled.div`
  position: relative;
  top: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  border-radius: 10px;
  transform: translateY(-50%);
  img {
    max-height: 85vh;
    object-fit: cover;
  }
`;
