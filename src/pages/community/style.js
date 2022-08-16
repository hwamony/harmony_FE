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
  border-bottom: 1px solid #e7e7e7;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 110px;
  text-align: center;
  background-color: white;
`;

export const TitleContainer = styled.div`
  border-bottom: 1px solid #e7e7e7;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  h1 {
    margin-left: 20px;
  }
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
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-bottom: 2px solid white;
  h3 {
    color: #ababab;
    padding: 2px 10px;
    text-align: center;
    :hover {
      color: black;
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
