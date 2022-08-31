import React from "react";
import styled from "styled-components";

const WriteActionButtons = ({handleSubmit}) => {
    return (
      <WriteBtn onClick={handleSubmit}>
        <button></button>
      </WriteBtn>
    )
}

export default WriteActionButtons;

const WriteBtn = styled.div`
  padding: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  button{
    width: calc(25% + 400px);
    height: 43px;
    background-color: #3EC192;
    color: white;
    font-size: 15px;
    border-radius: 5px;
    ::before{
      content : '등록하기';
    }
    :hover::before {
      content : '익명으로 등록됩니다 :)';
    }
  }
`
