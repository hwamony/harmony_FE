import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setOnSelect, setOnSelectAll } from '../../redux/modules/gallerySlice';
import { IconFilter, IconClose } from '../../assets/icons';

const Header = ({ title, subtitle, select }) => {
  const dispatch = useDispatch();
  const { onSelect, onSelectAll } = useSelector((state) => state.gallery);

  return (
    <HeaderContainer>
      {onSelect ? (
        <p
          onClick={() => {
            dispatch(setOnSelect(false));
            dispatch(setOnSelectAll(false));
          }}
        >
          <IconClose />
          <span>취소</span>
        </p>
      ) : (
        <p>
          <Link to="/galleries">
            <strong>{title}</strong>
          </Link>
          {subtitle && <span>- {subtitle}</span>}
        </p>
      )}

      {!subtitle && <IconFilter />}
      {select &&
        (onSelect ? (
          <BtnSelect
            type="button"
            className={cn('all', onSelectAll && 'selected')}
            onClick={() => dispatch(setOnSelectAll(!onSelectAll))}
          >
            전체선택
          </BtnSelect>
        ) : (
          <BtnSelect type="button" onClick={() => dispatch(setOnSelect(true))}>
            선택
          </BtnSelect>
        ))}
    </HeaderContainer>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  select: PropTypes.bool,
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
  strong {
    color: #18191f;
    font-size: 20px;
    font-weight: 700;
  }
  p {
    display: flex;
    align-items: center;
    svg {
      margin-right: 5px;
      cursor: pointer;
    }
    span {
      align-items: center;
      font-size: 14px;
      font-weight: 700;
    }
  }
  span {
    margin-left: 5px;
    font-size: 16px;
    font-weight: 500;
  }
`;

const BtnSelect = styled.button`
  padding: 3px 13px;
  border-radius: 57px;
  background: #3c3c3c;
  color: #fff;
  font-size: 15px;
  &.all {
    background: transparent;
    color: #3c3c3c;
    &.selected {
      color: ${({ theme }) => theme.palette.primary.main};
      font-weight: 700;
    }
  }
`;
