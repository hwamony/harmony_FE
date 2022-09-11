import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useFamilyData } from '../../hooks/useData';
import { hwamokGrades, hwamokScores } from '../../utils/data';
import HeaderMid from '../../components/common/HeaderMid';
import PageTitle from '../../components/common/PageTitle';
import { IconNextMember } from '../../assets/icons';
import { Button } from '../../styles/Button';
import ReactGA from 'react-ga';

const FamilyScore = () => {
  const navigate = useNavigate();
  const { data: familyInfo } = useFamilyData();

  const createGAEvent = (action) => {
    ReactGA.event({
      category: 'Family',
      action: `화목지수에서 ${action}`,
      label: 'family',
    });
  };

  return (
    <>
      <PageTitle title="화목지수" />
      <HeaderMid text="화목지수" />

      <Content>
        <GradeInfo>
          <h2>{familyInfo.familyName}</h2>
          <Icon>
            <img src={hwamokGrades[familyInfo.level].image} alt="" />
            {familyInfo.flower && (
              <img
                src={`${process.env.PUBLIC_URL}/images/grades/flower.png`}
                alt=""
                className="hasFlower"
              />
            )}
          </Icon>
          <strong>{hwamokGrades[familyInfo.level].name}</strong>
          <p>
            <span>월간 {familyInfo.monthlyScore}방울</span> | 누적{' '}
            {familyInfo.score}방울
          </p>

          <Button
            onClick={() => {
              createGAEvent('가족랭킹 이동');
              navigate('/family/rankings');
            }}
          >
            가족랭킹 확인하기 &gt;
          </Button>
        </GradeInfo>

        <Link
          to="/family/info"
          className="link-info"
          onClick={() => createGAEvent('가족구성원 이동')}
        >
          가족구성원 확인하기
          <IconNextMember />
        </Link>

        <Desc>
          <h3>화목지수 달성조건</h3>
          <div className="desc-grades">
            {hwamokGrades.map((grade, i) => (
              <div key={grade.name} className="desc-grade">
                <img src={hwamokGrades[i].icon} alt="" />
                <p>
                  {hwamokGrades[i].name}
                  <small>({hwamokGrades[i].range})</small>
                </p>
              </div>
            ))}
          </div>

          <ul className="desc-list">
            {hwamokScores.map((info, i) => (
              <li key={info.title}>
                <p>{hwamokScores[i].title}</p>
                <span>{hwamokScores[i].score}방울</span>
              </li>
            ))}
            <p className="desc-caution">* 일정 또는 앨범 삭제 시 점수 회수</p>
          </ul>
        </Desc>
      </Content>
    </>
  );
};

export default FamilyScore;

const Content = styled.div`
  padding-bottom: 65px;
  background: #f2f2f2;
  a.link-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    padding: 32px 30px 30px 20px;
    background: #fff;
    color: #18191f;
    font-size: 15px;
    font-weight: 700;
  }
`;
const GradeInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  padding: 30px 20px 0;
  background: #fff;
  strong {
    margin: 10px 0 8px;
    font-size: 20px;
  }
  p {
    color: #a5a5a5;
    font-size: 16px;
    span {
      color: #454545;
      font-size: 700;
    }
  }
  button {
    margin: 30px 0 38px;
  }
`;

const Icon = styled.div`
  position: relative;
  img.hasFlower {
    position: absolute;
    top: 30px;
    left: 30px;
    width: 55px;
    height: 55px;
  }
`;

const Desc = styled.div`
  padding: 35px 20px 20px;
  background: #fff;
  h3 {
    margin-bottom: 28px;
    padding-bottom: 15px;
    border-bottom: 1.5px solid #101010;
    font-size: 15px;
    font-weight: 700;
  }
  .desc-grades,
  .desc-list {
    padding: 0 10px;
  }
  .desc-grades {
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 470px;
    .desc-grade {
      p {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 8px;
        font-size: 14px;
        text-align: center;
      }
      small {
        position: absolute;
        bottom: -16px;
        color: #747474;
        font-size: 11px;
        text-align: center;
      }
    }
  }

  ul.desc-list {
    max-width: 470px;
    margin: 36px auto 0;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      border-bottom: 1px solid #dfdfdf;
      font-size: 14px;
      span {
        color: #9d9d9d;
        font-weight: 700;
      }
    }
    p.desc-caution {
      margin: 18px 0 20px;
      color: #7b7b7b;
      font-size: 12px;
    }
  }
`;
