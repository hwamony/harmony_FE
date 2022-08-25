import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Skeleton } from '@mui/material';

const ScheduleItem = ({ isLoading, lists }) => {
  return (
    <ItemContainer>
      {lists ? (
        lists.map((list) => (
          <Item key={list.scheduleId}>
            <Link to={`/galleries/${list.scheduleId}`}>
              {isLoading ? (
                <ImgSkeleton variant="rectangular" />
              ) : (
                <img src={list.image} alt="" />
              )}
            </Link>
            {isLoading ? (
              <p>
                <Skeleton width="70px" />
              </p>
            ) : (
              <>
                <p>{list.name}</p>
                <small>{list.size}</small>
              </>
            )}
          </Item>
        ))
      ) : (
        <p>등록된 사진이 없습니다.</p>
      )}
    </ItemContainer>
  );
};

ScheduleItem.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  lists: PropTypes.array,
};

export default ScheduleItem;

const ItemContainer = styled.ul`
  display: flex;
  /* justify-content: center; */
  flex-wrap: wrap;
  gap: 17px 8px;
`;

const Item = styled.li`
  a {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 163px;
    height: 163px;
    border-radius: 5px;
  }
  p {
    margin: 7px auto 0;
    font-size: 14px;
    font-weight: 500;
  }
  small {
    color: #7d7d7d;
    font-size: 12px;
  }
  img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }
`;

const ImgSkeleton = styled(Skeleton)`
  width: 100%;
  height: 92px;
`;
