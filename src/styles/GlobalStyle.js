import { createGlobalStyle } from 'styled-components';
import { createTheme } from '@mui/material/styles';
import { koKR } from '@mui/material/locale';

export const theme = createTheme(
  {
    palette: {
      primary: { main: '#3ec192' },
      EAT_OUT: { main: '#FF7583', sub: '#FFF1F2' },
      TRIP: { main: '#45BFFF', sub: '#EDF8FF' },
      COOK: { main: '#FFBC54', sub: '#FFF5E5' },
      CLEAN: { main: '#3EC192', sub: '#EDFAF6' },
      ETC: { main: '#727DF0', sub: '#F5F4FE' },
      PERSONAL: { main: '#7D7D7D', sub: '#F2F2F2' },
    },
  },
  koKR,
);

const GlobalStyle = createGlobalStyle`
  /*! minireset.css v0.0.6 | MIT License | github.com/jgthms/minireset.css */
  *, :after, :before {
    box-sizing: inherit;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif !important;
  }
  html {
    box-sizing: border-box;
  }
  blockquote, body, dd, dl, dt, fieldset, figure, h1, h2, h3, h4, h5, h6, hr, html, iframe, legend, li, ol, p, pre, textarea, ul {
    margin: 0;
    padding: 0;
  }
  h1, h2, h3, h4, h5, h6 {
    font-size: 100%;
    font-weight: 400;
  }
  ul {
    list-style: none;
  }
  button, input, select {
    margin: 0;
    border: none;
    background: none;
    outline: none;
    color: #000;
  }
  button {
    cursor: pointer;
  }
  img, svg, video {
    height: auto;
    max-width: 100%;
    vertical-align: middle;
  }
  iframe {
    border: 0;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  td, th {
    padding: 0;
  }
  a {
    color: #000;
    text-decoration: none;
  }

  * {
  .hidden {
    overflow: hidden;
    position: relative;
    display: inline-block;
    width: 1px;
    height: 1px;
    border: 0;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    z-index: -1;
  }

  &::selection {
    background: #3ec192;
    color: #fff;
  }

  &::-moz-selection {
    background: #3ec192;
    color: #fff;
  }
}

  @media only screen and (min-width: 1025px) {
    body {
      height: 100vh;
      background-image: url('${process.env.PUBLIC_URL}/images/webappbackground.png');
      background-size: cover;
      background-repeat: no-repeat;
      background-attachment: fixed;
      overflow: hidden;
    }

    #root {
      overflow-x: hidden;
      overflow-y: auto;
      width: 500px;
      height: 100vh;
      box-shadow: 2px 2px 20px rgba(184, 187, 192, 0.4);
      position: relative;
      left: calc(50vw - 250px);
      background: #ffffff;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export default GlobalStyle;
