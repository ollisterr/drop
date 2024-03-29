import { createGlobalStyle, ThemeProvider } from "styled-components";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

import theme from "../components/theme";

const GlobalStyle = createGlobalStyle`
/*** The new CSS Reset - version 1.2.0 (last updated 23.7.2021) ***/

/* Remove all the styles of the "User-Agent-Stylesheet", except for the 'display' property */
*:where(:not(iframe, canvas, img, svg, video):not(svg *)) {
  all: unset;
  display: revert;
}

/* Preferred box-sizing value */
*,
*::before,
*::after {
  box-sizing: border-box;
  font-family: "Open Sans";
}

/*
  Remove list styles (bullets/numbers)
  in case you use it with normalize.css
*/
ol, ul {
  list-style: none;
}

/* For images to not be able to exceed their container */
img {
  max-width: 100%;
}

/* Removes spacing between cells in tables */
table {
  border-collapse: collapse;
}

/* Revert the 'white-space' property for textarea elements on Safari */
textarea {
  white-space: revert;
}

@font-face {
    font-family: 'NATS';
    src: url('/fonts/NATS-Regular.ttf');
    font-weight: 500;
    font-style: normal;
}
`;

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
