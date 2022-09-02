import React from 'react';
import styled from 'styled-components';
import HeaderMid from '../../components/common/HeaderMid';
import InProgress from '../../components/common/InProgress';
import PageTitle from '../../components/common/PageTitle';

const FamilyScore = () => {
  return (
    <>
      <PageTitle title="화목지수" />
      <HeaderMid text="화목지수" />
      <Content>
        <InProgress />
      </Content>
    </>
  );
};

export default FamilyScore;

const Content = styled.div``;
