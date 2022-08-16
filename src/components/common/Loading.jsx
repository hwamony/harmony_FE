import React from 'react';
import styled from 'styled-components';
import PuffLoader from 'react-spinners/PuffLoader';

const Loading = () => {
  return (
    <>
      <LoadingSpinner>
        <PuffLoader color="#3ec192" />
      </LoadingSpinner>
    </>
  );
};

export default Loading;

const LoadingSpinner = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
