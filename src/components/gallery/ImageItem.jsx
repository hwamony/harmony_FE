import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { IconCheck } from '../../assets/icons';

const ImageItem = ({ url, handleCheck }) => {
  const { onSelect } = useSelector((state) => state.gallery);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(false);
  }, [onSelect]);

  const handleItemCheck = ({ target }) => {
    setChecked(!checked);
    // FIXME: url을 img.imageId로 수정하기
    handleCheck(url, target.checked);
  };

  return (
    // FIXME: imageId로 수정하기
    <div>
      {onSelect && (
        <>
          <input
            type="checkbox"
            name="check-img"
            id={url}
            value={url}
            checked={checked}
            onChange={(e) => handleItemCheck(e)}
            hidden
          />
          <label htmlFor={url} className="label-check">
            <IconCheck />
            <span className="hidden">사진 선택</span>
          </label>
        </>
      )}
      {onSelect ? (
        <label htmlFor={url}>
          <img src={url} alt="" />
        </label>
      ) : (
        <img src={url} alt="" />
      )}
    </div>
  );
};

ImageItem.propTypes = {
  url: PropTypes.string,
  handleCheck: PropTypes.func,
};

export default ImageItem;
