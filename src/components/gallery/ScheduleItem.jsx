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
                <p>
                  <Skeleton width="70px" />
                </p>
              ) : (
                <p>{list.name}</p>
              )}
              {isLoading ? (
                <ImgSkeleton variant="rectangular" />
              ) : (
                <img src={list.image} alt="" />
              )}
            </Link>
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
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  li {
    width: 150px;
    height: 120px;
  }
`;

const Item = styled.li`
  overflow: hidden;
  border-radius: 10px;
  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  box-shadow: 2px 2px 10px rgba(184, 187, 192, 0.24);
  p {
    margin: 6px auto;
    font-size: 14px;
    font-weight: 500;
  }
  img {
    width: 100%;
    height: 92px;
    object-fit: cover;
  }
`;

const ImgSkeleton = styled(Skeleton)`
  width: 100%;
  height: 92px;
`;
