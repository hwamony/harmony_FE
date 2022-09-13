import styled from 'styled-components';

export const Input = styled.input`
    width: 100%;
    height: 52px;
    padding-left: 18px;
    border: 1px solid #DDDDDD;
    border-radius: 5px;
    margin-top: 8px;
    background: #FFFFFF;
    font-size: 13px;
    color: #000000;
    }
`;

export const Checkinput = styled.input`
  width: 20px;
  height: 20px;
  border: 1px solid #dddddd;
  border-radius: 10px;
  appearance: none;

  :checked {
    background: #3ec192;
    border: none;
  }
`;

export const RadioInput = styled.input`
  display: none;

  :checked + label {
    border: 1px solid #7d7d7d;
    font-weight: 600;
  }
`;

export const CodeInput = styled.input`
  visibility: hidden;

  :checked ~ label {
    border: 2px solid #7d7d7d;

    span {
      background: #3ec192;
    }
  }
`;

export const RoleInput = styled.input`
  display: none;

  :checked ~ label {
    border: 2px solid #3ec192;

    span {
      background: #3ec192;
    }
  }
`;
