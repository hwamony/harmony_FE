import styled, { css } from 'styled-components';

export const Main = styled.main`
  position: relative;
  overflow-y: auto;
  height: 100vh;
`;

export const CommunityNav = styled.nav`
  z-index: 200;
`;

export const Category = styled.ul`
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  height: 44px;
  padding: 0 10px;
  background-color: #fff;
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

export const CategoryItem = styled.li`
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
  cursor: pointer;
  ${({ active }) =>
    active &&
    css`
      border-bottom: 2px solid #3ec192;
      color: ${({ theme }) => theme.palette.primary.main};
      font-weight: 700;
    `}
`;

export const ContentWrap = styled.div`
  overflow: auto;
`;

export const CommunityContent = styled.main`
  padding: 0 0 65px;
  min-height: calc(100vh - 144px);
  background: #efefef;
  `;
