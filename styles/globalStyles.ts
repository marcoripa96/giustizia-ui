import { css } from "@emotion/react";

const GlobalStyles = css`
  html,
  body {
    min-height: 100vh;
    padding: 0;
    margin: 0;
    font-family: 'Inter', sans-serif;
    --nextui-fonts-sans: 'Inter', sans-serif;
    background: #FFF;
  }

  html {
    scroll-padding-top: 95px;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  #__next {
    min-height: 100vh;
  }
`

export default GlobalStyles;