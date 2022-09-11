import React from 'react';
import styled from 'styled-components';
import { useFamilyData, useRankings } from '../../../hooks/useData';
import cn from 'classnames';

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
          <strong>주간 방울 상위 10% 가족은 꽃 배지 획득! (매주 갱신)</strong>
        </Notice>
        <MyFamily>
          <LeftWrapper>
            <strong>{rankingInfo.family.ranking}</strong>
            <Circle>
              <img
                src={hwamokGrades[familyInfo.level].icon}
                alt={hwamokGrades[familyInfo.level].name}
              />
              {rankingInfo.family.flower && (
                <img
                  src={`${process.env.PUBLIC_URL}/images/grades/flower.png`}
                  alt=""
                  className="hasFlower"
                />
              )}
            </Circle>
            <div>
              <strong>{familyInfo.familyName}</strong>
              <p>총 {rankingInfo.family.totalScore}방울</p>
            </div>
          </LeftWrapper>
          <p className="score-weekly">{rankingInfo.family.weeklyScore}방울</p>
        </MyFamily>

        <RankingList>
          {rankingInfo.top10.map((family) => (
            <li key={family.familyName}>
              <ListLeft>
                <div
                  className={cn(
                    'rank',
                    family.ranking === 1 && 'first',
                    family.ranking === 2 && 'second',
                    family.ranking === 3 && 'third',
                  )}
                >
                  {family.ranking}
                </div>
                <Circle>
                  <img
                    src={hwamokGrades[family.level].icon}
                    alt={hwamokGrades[family.level].name}
                  />
                  {family.flower && (
                    <img
                      src={`${process.env.PUBLIC_URL}/images/grades/flower.png`}
                      alt=""
                      className="hasFlower"
                    />
                  )}
                </Circle>
                <div>
                  <strong>{family.familyName}</strong>
                  <p className="score-total">총 {family.totalScore}방울</p>
                </div>
              </ListLeft>
              <p className="score-weekly">{family.weeklyScore}방울</p>
            </li>
          ))}
        </RankingList>
      </RankingContent>
    </>
  );
};

export default FamilyRanking;

const RankingContent = styled.div`
  padding: 20px 20px 64px;
  .score-weekly {
    font-weight: 700;
  }
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

const MyFamily = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 21px 30px 5px;
  border-radius: 14px;
  background: ${({ theme }) => theme.palette.primary.main};
  color: #fff;
  box-shadow: 2px 2px 20px 0px #b8bbc03d;
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
  position: relative;
  margin-right: 11px;
  font-size: 0.5em;
  img {
    width: 49px;
    height: 49px;
    &.hasFlower {
      position: absolute;
      top: 0;
      left: -5px;
      width: 20px;
      height: 20px;
    }
  }
`;

const RankingList = styled.ul`
  margin-top: 11px;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 19px 20px 19px 0;
    border-bottom: 1px solid #dfdfdf;
    div.rank {
      width: 28px;
      height: 36px;
      margin: 0 19px 0 6px;
      padding-top: 14px;
      text-align: center;
      font-size: 15px;
      font-weight: 700;
      color: #7d7d7d;
      &.first,
      &.second,
      &.third {
        color: #fff;
      }
      &.first {
        background: url(/images/rank_1st.png) no-repeat;
      }
      &.second {
        background: url(/images/rank_2nd.png) no-repeat;
      }
      &.third {
        background: url(/images/rank_3rd.png) no-repeat;
      }
    }
    p.score-total {
      margin-top: 4px;
      font-size: 14px;
      color: #7d7d7d;
    }
  }
`;

const ListLeft = styled.div`
  display: flex;
  align-items: center;
`;
