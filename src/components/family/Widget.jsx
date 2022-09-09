import React from 'react';
import styled from 'styled-components';
import { useFamilyData } from '../../hooks/useData';

import { IconAlert, IconDetail } from '../../assets/icons';
import { useNavigate, Link } from 'react-router-dom';
import { hwamokGrades } from '../../utils/data';
import ReactGA from 'react-ga';

const Widget = () => {
  const navigate = useNavigate();
  const { data: familyInfo } = useFamilyData();

  const createGAEvent = (menu) => {
    ReactGA.event({
      category: 'Button',
      action: `위젯에서 ${menu} 이동`,
      label: 'widget',
    });
  };

  return (
    <FamilyWidget>
      <Link to="/family" onClick={() => createGAEvent('화목지수')}>
        <LeftWrapper>
          <Circle>
            <img
              src={hwamokGrades[familyInfo.level].icon}
              alt={hwamokGrades[familyInfo.level].name}
            />
          </Circle>
          <div>
            <strong>
              {familyInfo.familyName}
              <IconDetail />
            </strong>
            <p>
              {familyInfo.monthlyScore}방울{' '}
              <span>| {familyInfo.score}방울</span>
              <span className="level">
                {hwamokGrades[familyInfo.level].name}
              </span>
            </p>
          </div>
        </LeftWrapper>
      </Link>

      <AlertBtn
        onClick={() => {
          createGAEvent('알림');
          navigate('/notice');
        }}
      >
        <IconAlert />
      </AlertBtn>
    </FamilyWidget>
  );
};

export default Widget;

const FamilyWidget = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 20px 0;
  strong {
    display: block;
    margin-bottom: 5px;
    font-size: 20px;
    svg {
      margin: -2px 0 0 8px;
    }
  }
`;

const LeftWrapper = styled.div`
  display: flex;
  p {
    font-size: 14px;
    span {
      color: #a5a5a5;
      &.level {
        margin-left: 5px;
        border-radius: 60px;
        padding: 1px 9px;
        background: #d3d3d3;
        color: #fff;
        font-size: 14px;
      }
    }
  }
`;

const Circle = styled.div`
  margin-right: 11px;
  font-size: 0.5em;
`;

const AlertBtn = styled.div`
  cursor: pointer;
`;
