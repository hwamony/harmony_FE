import styled from 'styled-components';

export const CommunityFixed = styled.section`
  display: flex;
  flex-direction: column;
  height: 144px;
  text-align: center;
  h1 {
    margin: 1em 0;
    font-size: 1.2em;
    font-weight: 700;
  }
`;

export const CommunityNav = styled.nav`
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  z-index: 200;
`;

export const Category = styled.div`
  display: flex;
  height: 44px;
  padding: 0 10px;
  background-color: #fff;
  overflow-x: scroll;
  overflow-y: hidden;
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 49px;
    height: 100%;
    margin-right: 10px;
    border-bottom: 2px solid transparent;
    color: #545454;
    text-align: center;
    word-break: keep-all;
    font-size: 14px;
    font-weight: 600;
    &:hover {
      border-bottom: 2px solid #3ec192;
      color: ${({ theme }) => theme.palette.primary.main};
      font-weight: 700;
    }
  }
  &::-webkit-scrollbar {
    display: fixed;
    height: 3px;
  }
  &::-webkit-scrollbar-thumb {
    border: 7px solid transparent;
    border-radius: 10px;
    background: #e3e5e9;
    background-clip: border-box;
  }
  &::-webkit-scrollbar-trac {
    background: none;
  }
`;

export const Order = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 40px;
  padding: 0 23px;
  background: #efefef;
  p {
    display: inline-block;
    color: #868686;
    font-size: 12px;
    &:hover {
      color: #000;
      font-weight: 700;
    }
    &:first-child::after {
      content: '';
      display: inline-block;
      width: 3px;
      height: 3px;
      margin: 0 8px 2px;
      border-radius: 50%;
      background: #303030;
    }
  }
`;

export const CommunityContent = styled.main`
  padding: 0 0 65px;
  min-height: calc(100vh - 144px);
  background: #efefef;
`;
