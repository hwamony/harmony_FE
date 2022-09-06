import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useQueryClient } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import { useFamilyData } from '../../hooks/useData';
import { hwamokGrades } from '../../utils/data';

const ScoreModal = ({ isVisible, setIsVisible }) => {
  const queryClient = useQueryClient();
  const { data: familyInfo } = useFamilyData();
  const { scoreUp, actions } = useAuth();

  const ModalClose = () => {
    actions.onScoreChanged(null);
    setIsVisible(false);
  };

  const onDimmerClick = (e) => {
    if (e.currentTarget !== e.target) return;
    ModalClose();
  };

  return (
    <ModalWrap visible={isVisible}>
      <Overlay onClick={onDimmerClick}>
        <ModalInner>
          <img
            src={hwamokGrades[familyInfo?.level]?.grow}
            alt={hwamokGrades[familyInfo?.level]?.name}
          />
          <strong>{scoreUp}방울 획득!</strong>
          <p>축하합니다!</p>
          <BtnWrap>
            <ModalBtn
              onClick={() => {
                ModalClose();
                return queryClient.invalidateQueries(['familyInfo']);
              }}
            >
              확인
            </ModalBtn>
          </BtnWrap>
        </ModalInner>
      </Overlay>
    </ModalWrap>
  );
};

ScoreModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  setIsVisible: PropTypes.func.isRequired,
};

export default ScoreModal;

const ModalWrap = styled.div`
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  width: 335px;
  max-width: 480px;
  height: 222px;
  padding: 34px 26px;
  border-radius: 10px;
  margin: auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background: #ffffff;
  color: #191919;
  text-align: center;
  img {
    position: absolute;
    top: -112px;
    left: 87px;
    width: 174px;
  }
  strong {
    display: block;
    margin-top: 54px;
    font-size: 20px;
    font-weight: 600;
  }
  p {
    margin-top: 8px;
    font-size: 15px;
  }
`;

const BtnWrap = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const ModalBtn = styled.button`
  width: 100%;
  height: 56px;
  border-top: 1px solid #dadada;
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
`;
