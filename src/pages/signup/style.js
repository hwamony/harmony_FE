import styled from "styled-components";

export const Container = styled.form`
    width: 375px;
    padding: 20px;
    border: 1px solid #DDDDDD;
    margin: auto;
    position: relative;
`

export const Title = styled.div`
    font-size: 15px;
    font-weight: 600;
    text-align: center;
`

export const InputWrap = styled.div`
    margin-top: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
`

export const PolicyWrap = styled.div`
    margin-top: 22px;
`

export const PolicyDesc = styled.div`
    font-size: 14px;
    font-weight: 600;
`

export const PolicyLink = styled.div`
    font-size: 12px;
    text-decoration: underline;
    color: #7D7D7D;
`

export const PolicyCheck = styled.div`
    margin-top: 20px;
`

export const ButtonWrap = styled.div`
    margin-top: 40px;
`

export const ErrorMsg = styled.p`
    font-size: 13px;
    font-weight: 500;
    color: #C53737;
    margin-top: 8px;
`