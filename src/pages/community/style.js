import styled from 'styled-components';

export const CommunityColor = styled.article`
  display: flex;
  flex-direction: column;
  height: 100vh;
  text-align: center;
  background-color: #f2f2f2;
  h1 {
    margin: 1em 0;
    font-size: 1.2em;
    font-weight: 700;
  }
`;

export const CommunityContainer = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  height: 40px;
  background-color: white;
  z-index: 200;
`;

export const ToolContainer = styled.div`
  padding-right: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  font-size: 25px;
  :hover {
    cursor: pointer;
  }
`;

export const Space = styled.div`
  width: 20px;
`;

export const Category = styled.div`
  display: flex;
  width: 100vw;
  height: 44px;
  padding: 0 10px;
  h3 {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 49px;
    height: 100%;
    margin-right: 10px;
    border-bottom: 2px solid transparent;
    color: #545454;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    word-break: keep-all;
    :hover {
      border-bottom: 2px solid #3ec192;
      color: ${({ theme }) => theme.palette.primary.main};
      font-weight: 700;
      cursor: pointer;
    }
  }
`;

export const Order = styled.div`
  padding-top: 130px;
  width: 95vw;
  height: 40px;
  padding-right: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  h5 {
    color: #868686;
    font-size: 15px;
    :hover {
      cursor: pointer;
      color: black;
    }
  }
`;
