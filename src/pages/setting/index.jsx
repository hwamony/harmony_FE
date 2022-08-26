import React, { useState } from 'react';
import PageTitle from '../../components/common/PageTitle';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import Widget from '../../components/family/Widget';
import { useFamilyCode } from '../../hooks/useData';
import useCopyClipBoard from '../../hooks/useCopyClipBoard';
import { Snackbar } from '@mui/material';
import { IconNext } from '../../assets/icons';

const Setting = () => {
  const navigate = useNavigate();
  const { data } = useFamilyCode();
  const [isCopied, onCopy] = useCopyClipBoard();
  const [isOpened, setIsOpened] = useState(false);

  const onCopyClick = () => {
    onCopy(data?.familyCode);
    setIsOpened(true);
  };

  const onLogout = async () => {
    try {
      const res = await axios.post('http://43.200.174.197/logout');
      console.log(res);
      localStorage.removeItem('TOKEN');
      window.location.href = '/login';
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <>
      <PageTitle title="설정" />
      <Widget />
      <SettingsContainer>
        <h3>초대코드</h3>
        <div className="box-code">
          <p onClick={onCopyClick}>{data?.familyCode}</p>
          {isCopied && (
            <img
              src={`${process.env.PUBLIC_URL}/images/congratulations.png`}
              alt="복사 완료"
            />
          )}
        </div>

        <button type="button" onClick={() => navigate('/rankings')}>
          <h3>가족랭킹</h3>
          <IconNext />
        </button>

        <button onClick={onLogout}>
          <h3>로그아웃</h3>
          <IconNext />
        </button>

        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={isOpened}
          autoHideDuration={2000}
          onClose={() => setIsOpened(false)}
          message="초대 코드 복사 완료! 가족들에게 공유해 보세요."
          key={'bottom' + 'center'}
        />
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
    position: relative;
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
      cursor: pointer;
    }
    img {
      position: absolute;
      right: 20px;
      width: 30px;
      height: 30px;
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

  .MuiSnackbar-root {
    bottom: 75px;
  }
`;
