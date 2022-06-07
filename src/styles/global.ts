import { createGlobalStyle, css } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  ${({ theme }) => css`
    html {
      font-size: 62.5%;
    }

    body {
      background-color: ${theme.colors.mainBg};
      font-family: ${theme.font.family};
      font-size: ${theme.font.sizes.medium};
      color: ${theme.colors.white};
    }
  `}

`

export default GlobalStyles
