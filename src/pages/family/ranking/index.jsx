import React from 'react';
import styled from 'styled-components';
import { useFamilyData, useRankings } from '../../../hooks/useData';

import PageTitle from '../../../components/common/PageTitle';
import HeaderMid from '../../../components/common/HeaderMid';
import { hwamokGrades } from '../../../utils/data';

const FamilyRanking = () => {
  const { data: familyInfo } = useFamilyData();
  const { data: rankingInfo } = useRankings();

  return (
    <>
      <PageTitle title="가족랭킹" />
      <HeaderMid text="가족랭킹" />
      <RankingContent>
        <Notice>
          <img src={`${process.env.PUBLIC_URL}/images/grades/flower.png`} />
          <strong>한 달 누적 방울 상위 10% 가족은 꽃 배지 획득!</strong>
        </Notice>
        <Wrapper>
          <LeftWrapper>
            {/* FIXME: 오타 수정해야 함 */}
            <strong>{rankingInfo.raking}</strong>
            <Circle>
              <img
                src={hwamokGrades[familyInfo.level].icon}
                alt={hwamokGrades[familyInfo.level].name}
              />
            </Circle>
            <div>
              <strong>{familyInfo.familyName}</strong>
              <p>총 {familyInfo.score}방울</p>
            </div>
          </LeftWrapper>
          <p>{familyInfo.monthlyScore}방울</p>
        </Wrapper>
      </RankingContent>
    </>
  );
};

export default FamilyRanking;

const RankingContent = styled.div`
  padding: 20px;
`;

const Notice = styled.div`
  margin-bottom: 18px;
  img {
    margin: 0 6px;
    width: 20px;
    height: 20px;
  }
  strong {
    font-size: 14px;
    color: #7d7d7d;
    font-weight: 500;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 21px 30px 5px;
  border-radius: 14px;
  background: ${({ theme }) => theme.palette.primary.main};
  color: #fff;
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  strong {
    min-width: 3em;
    font-size: 15px;
    text-align: center;
  }
  p {
    margin-top: 4px;
    font-size: 14px;
  }
`;

const Circle = styled.div`
  margin-right: 11px;
  font-size: 0.5em;
  img {
    width: 49px;
    height: 49px;
  }
`;
