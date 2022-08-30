import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { IconCheck } from '../../assets/icons';

const ImageItem = ({ img, handleCheck, setIsVisible, setCurImage }) => {
  const { onSelect, onSelectAll } = useSelector((state) => state.gallery);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!onSelect) setChecked(false);
  }, [onSelect]);

  useEffect(() => {
    if (onSelectAll) setChecked(true);
    else setChecked(false);
  }, [onSelectAll]);

  const handleModalOpen = () => {
    setCurImage(img.url);
    setIsVisible(true);
  };

  const handleItemCheck = ({ target }) => {
    setChecked(!checked);
    handleCheck(img.id, target.checked);
  };

  return (
    <div>
      {onSelect && (
        <>
          <input
            type="checkbox"
            name="check-img"
            id={img.id}
            value={img.id}
            checked={checked}
            onChange={(e) => handleItemCheck(e)}
            hidden
          />
          <label htmlFor={img.id} className="label-check">
            <IconCheck />
            <span className="hidden">사진 선택</span>
          </label>
        </>
      )}
      {onSelect ? (
        <label htmlFor={img.id}>
          <img src={img.url} alt="" />
        </label>
      ) : (
        <ImgDetail src={img.url} alt="" onClick={handleModalOpen} />
      )}
    </div>
  );
};

ImageItem.propTypes = {
  img: PropTypes.object.isRequired,
  handleCheck: PropTypes.func.isRequired,
};

export default ImageItem;

const ImgDetail = styled.img`
  cursor: pointer;
`;
