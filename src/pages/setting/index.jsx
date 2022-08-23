import React from 'react';
import PageTitle from '../../components/common/PageTitle';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Widget from '../../components/family/Widget';
import { IconNext } from '../../assets/icons';

const Setting = () => {
  const navigate = useNavigate();
  return (
    <>
      <PageTitle title="설정" />
      <Widget />
      <SettingsContainer>
        <h3>초대코드</h3>
        <div className="box-code">
          {/* TODO: 가족코드 조회 API 요청 */}
          <p>94321114</p>
        </div>
        <button type="button" onClick={() => navigate('/rankings')}>
          <h3>가족랭킹</h3>
          <IconNext />
        </button>
        <button
          onClick={() => {
            localStorage.removeItem('TOKEN');
            window.location.href = '/login';
          }}
        >
          <h3>로그아웃</h3>
          <IconNext />
        </button>
      </SettingsContainer>
    </>
  );
};

export default Setting;

const SettingsContainer = styled.section`
  position: relative;
  overflow-y: auto;
  height: calc(100vh - 75px - 65px);
  margin-top: 119px;
  padding: 0px 20px 25px;

  h3 {
    display: inline-block;
    font-size: 14px;
    font-weight: 700;
  }

  div.box-code {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 66px;
    margin: 10px 0 19px;
    border-radius: 5px;
    background: #eee;
    font-size: 20px;
    font-weight: 700;
    p {
      border-bottom: 2px solid #000;
    }
  }

  button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 5px;
    padding: 24px 0;
    border-bottom: 1px solid #dadada;
  }
`;
