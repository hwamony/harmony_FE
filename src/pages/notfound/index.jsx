import React from 'react';
import styled from 'styled-components';
import { HiInformationCircle } from 'react-icons/hi';

const NotFound = () => {
  return (
    <>
      <InfoWrap>
        <InfoIcon>
          <HiInformationCircle size="3em" />
        </InfoIcon>
        <InfoDesc>
          <p>페이지가 존재하지 않습니다.</p>
        </InfoDesc>
      </InfoWrap>
    </>
  );
};

export default NotFound;

const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40vh;
  padding: 20px;
`;

const InfoIcon = styled.div`
  color: #838383;
`;

const InfoDesc = styled.div`
  margin-top: 20px;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 1px;
  color: #838383;
  text-align: center;
`;
