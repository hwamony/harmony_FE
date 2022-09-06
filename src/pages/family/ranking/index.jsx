import React from 'react';
import styled from 'styled-components';
// import { useRankings } from '../../../hooks/useData';
import PageTitle from '../../../components/common/PageTitle';
import HeaderMid from '../../../components/common/HeaderMid';
import InProgress from '../../../components/common/InProgress';

const FamilyRanking = () => {
  // const { data } = useRankings();

  return (
    <>
      <PageTitle title="가족랭킹" />
      <HeaderMid text="가족랭킹" />
      <RankingContent>
        <InProgress />
      </RankingContent>
    </>
  );
};

export default FamilyRanking;

const RankingContent = styled.div``;
