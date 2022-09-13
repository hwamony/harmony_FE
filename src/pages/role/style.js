import styled from 'styled-components';

export const Container = styled.form`
  height: 100vh;
  padding: 20px;
  position: relative;
  background: #ffffff;
`;

export const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  margin: auto;
`;

export const Wrap = styled.div`
  position: relative;
  width: 33.333%;
  padding: 5px 4px;
`;

export const Desc = styled.div`
  display: block;
  width: 100%;
  margin: 50px 0 30px;
  font-size: 25px;
  color: #191919;
  text-align: center;
`;

export const InputWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  width: 100%;
`;

export const IconWrap = styled.span`
  position: absolute;
  top: 24px;
  width: 24px;
  height: 24px;
  margin: auto;
  border-radius: 12px;
  background: #dcdcdc;
  transform: translateX(-50%);
`;

export const BtnWrap = styled.div`
  position: relative;
  width: 100%;
  margin-top: 70px;
`;
