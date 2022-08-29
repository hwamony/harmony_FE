import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { IconCheck } from '../../assets/icons';

const ImageItem = ({ img, handleCheck }) => {
  const { onSelect, onSelectAll } = useSelector((state) => state.gallery);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(false);
  }, [onSelect]);

  useEffect(() => {
    if (onSelectAll) setChecked(true);
    else setChecked(false);
  }, [onSelectAll]);

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
        <img src={img.url} alt="" />
      )}
    </div>
  );
};

ImageItem.propTypes = {
  img: PropTypes.object.isRequired,
  handleCheck: PropTypes.func.isRequired,
};

export default ImageItem;
