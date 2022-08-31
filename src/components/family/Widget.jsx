import React from 'react';
import styled from 'styled-components';
import { useFamilyData } from '../../hooks/useData';
import { IconAlert, IconDetail } from '../../assets/icons';
import { useNavigate } from 'react-router-dom';

const Widget = () => {
  const navigate = useNavigate();

  // FIXME: 랭킹 api 완성 후 교체 - 방울 정보 및 화목 등급 필요
  const { data: familyInfo } = useFamilyData();

  return (
    <FamilyWidget>
      <LeftWrapper>
        <Circle>화목등급 이미지</Circle>
        <div>
          {/* TODO: 가족 정보 페이지 링크 추가 */}
          <strong>
            {familyInfo.familyName}
            <IconDetail />
          </strong>
          <p>
            33방울 <span>| 140방울</span>
            <span className="level">씨앗</span>
          </p>
        </div>
      </LeftWrapper>
      <AlertBtn onClick={() => navigate('/notice')}>
        <IconAlert />
      </AlertBtn>
    </FamilyWidget>
  );
};

export default Widget;

const FamilyWidget = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
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
  width: 50px;
  height: 50px;
  margin-right: 11px;
  border-radius: 50%;
  background: #e4efd5;
  font-size: 0.5em;
`;

const AlertBtn = styled.div`
  cursor: pointer;
`