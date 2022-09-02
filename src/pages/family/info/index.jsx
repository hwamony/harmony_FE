import React from 'react';
import styled from 'styled-components';
import HeaderMid from '../../../components/common/HeaderMid';
import InProgress from '../../../components/common/InProgress';
import PageTitle from '../../../components/common/PageTitle';

const FamilyInfo = () => {
  return (
    <>
      <PageTitle title="가족구성원" />
      <HeaderMid text="가족구성원" />
      <Content>
        <InProgress />
      </Content>
    </>
  );
};

export default FamilyInfo;

const Content = styled.div``;
