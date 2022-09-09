import React, { useState } from 'react';
import PageTitle from '../../components/common/PageTitle';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Snackbar } from '@mui/material';

import { useFamilyCode } from '../../hooks/useData';
import useAuth from '../../hooks/useAuth';
import useCopyClipBoard from '../../hooks/useCopyClipBoard';
import Widget from '../../components/family/Widget';
import { IconNext } from '../../assets/icons';
import ReactGA from 'react-ga';

const Setting = () => {
  const navigate = useNavigate();
  const { data } = useFamilyCode();
  const { actions } = useAuth();
  const [isCopied, onCopy] = useCopyClipBoard();
  const [isOpened, setIsOpened] = useState(false);

  const onCopyClick = () => {
    onCopy(data.familyCode);
    setIsOpened(true);
  };

  const onLogout = () => {
    actions.onLoggedOut();
    window.location.href = '/';
    return localStorage.removeItem('TOKEN');
  };

  const createGAEvent = (action) => {
    ReactGA.event({
      category: 'Settings',
      action: `설정에서 ${action}`,
      label: 'settings',
    });
  };

  return (
    <>
      <PageTitle title="설정" />
      <Widget />
      <SettingsContainer>
        <h3>초대 코드</h3>
        <div className="box-code">
          <p
            onClick={() => {
              createGAEvent('초대 코드 복사');
              onCopyClick();
            }}
          >
            {data.familyCode}
          </p>
          {isCopied && (
            <img
              src={`${process.env.PUBLIC_URL}/images/congratulations.png`}
              alt="복사 완료"
            />
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            createGAEvent('가족구성원 이동');
            navigate('/family/info');
          }}
        >
          <h3>가족 구성원</h3>
          <IconNext />
        </button>

        <button
          type="button"
          onClick={() => {
            createGAEvent('프로필관리 이동');
            navigate('/mypage/editprofile');
          }}
        >
          <h3>프로필 관리</h3>
          <div className="wrapper-email">
            <p>{data.email}</p>
            <IconNext />
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            createGAEvent('계정관리 이동');
            navigate('/mypage/editpassword');
          }}
        >
          <h3>계정 관리</h3>
          <IconNext />
        </button>

        <button onClick={onLogout}>
          <h3>로그아웃</h3>
          <IconNext />
        </button>

        <h3 onClick={() => navigate('')} className="btn-out">
          회원탈퇴
        </h3>

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
  min-height: calc(100vh - 75px - 65px);
  margin-top: 44px;
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
    div.wrapper-email {
      display: flex;
      p {
        margin-right: 12px;
        color: #ababab;
      }
    }
  }

  h3.btn-out {
    display: block;
    text-align: right;
    margin-top: 20px;
    color: #555;
    font-size: 13px;
    font-weight: 400;
    cursor: pointer;
  }

  .MuiSnackbar-root {
    bottom: 75px;
  }
`;
