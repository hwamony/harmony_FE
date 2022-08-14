import { createGlobalStyle } from 'styled-components';

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
  }
  button {
    cursor: pointer;
  }
  img, video {
    height: auto;
    max-width: 100%;
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
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyle;
