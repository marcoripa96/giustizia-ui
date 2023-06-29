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

  .underline-yellow {
  background-image: linear-gradient(rgba(245,192,112,.4), rgba(245,192,112,.4));
  background-repeat: no-repeat;
  background-size: 100% 0.2em;
  background-position: 0 88%;
}

.underline-green {
  background-image: linear-gradient(rgba(245,112,112,.4), rgba(245,112,112,.4));
  background-repeat: no-repeat;
  background-size: 100% 0.2em;
  background-position: 0 88%;
}

.underline-blue {
  background-image: linear-gradient(rgba(112,130,245,.4), rgba(112,130,245,.4));
  background-repeat: no-repeat;
  background-size: 100% 0.2em;
  background-position: 0 88%;
}
`

export default GlobalStyles;