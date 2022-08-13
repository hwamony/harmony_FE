import React from 'react';
import styled from 'styled-components';
import PuffLoader from 'react-spinners/PuffLoader';

const Loading = () => {
  return (
    <>
      <LoadingSpinner>
        {/* FIXME: 추후 메인 색상으로 수정 */}
        <PuffLoader color="#77b256" />
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
