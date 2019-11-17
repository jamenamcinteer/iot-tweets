import { IPropsTheme } from "../interfaces/interfaces"
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body, html {
    box-sizing: border-box;
  }
  body {
    background: url("/images/background-desktop.jpg") no-repeat center center fixed; /* TODO: need different sizes for mobile and tablet to help with performance / data usage */
    background-color: ${(props: IPropsTheme) => props.theme.pageBackgroundColor};
    background-size: cover;
    color: ${(props: IPropsTheme) => props.theme.baseFontColor};
    margin: 0;
    font-family: ${(props: IPropsTheme) => props.theme.baseFontFamily};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`