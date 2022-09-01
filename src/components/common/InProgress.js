import React from 'react';
import styled from 'styled-components';
import { HiInformationCircle } from 'react-icons/hi';

const InProgress = () => {
  return (
    <>
      <InfoWrap>
        <InfoIcon>
          <HiInformationCircle size="3em" />
        </InfoIcon>
        <InfoDesc>
          <p>서비스 준비중입니다.</p>
          <p>추후 이용 부탁드립니다.</p>
        </InfoDesc>
      </InfoWrap>
    </>
  );
};

export default InProgress;

const InfoWrap = styled.div`
  margin-top: 242px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
