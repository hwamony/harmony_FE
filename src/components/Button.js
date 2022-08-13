import styled from "styled-components";

export const Button = styled.button`
    display: block;
    width: 100%;
    height: 52px;
    padding-left: 18px;
    border: 1px solid #DDDDDD;
    background: #7D7D7D;
    font-size: 15px;
    font-weight: 700;
    color: #FFFFFF;
`

export const InlineButton = styled(Button)`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 80px;
    padding: 18px;
    font-size: 12px;
`

export const BackButton = styled.button`
    position: absolute;
    top: 20px;
    left: 20px;
    width: 20px;
    height: 20px;
`