import "../styles/globals.css";

import Layout from "../components/layout/Layout";
import PropTypes from "prop-types";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";

import { StateContext, useStateContext } from "../context/StateContext";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import { Toaster } from "react-hot-toast";

import theme from "../lib/materialUI/theme";
import createEmotionCache from "../lib/materialUI/createEmotionCache";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { useStateContext, session, ...pageProps },
  } = props;

  return (
    <SessionProvider session={session}>
      <StateContext>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
              <Toaster />
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </CacheProvider>
      </StateContext>
    </SessionProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
