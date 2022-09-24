import "../styles/globals.css";
import "../styles/InputBox.scss";
import "../styles/SearchBox.scss";
import Layout from "../components/layout/Layout";
import { Toaster } from "react-hot-toast";
import { StateContext } from "../context/StateContext";
import { SessionProvider } from "next-auth/react";

import PropTypes from "prop-types";
import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import theme from "../lib/theme";
import createEmotionCache from "../lib/createEmotionCache";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// function MyApp({ Component, pageProps: { session, ...pageProps } }) {
//   return (
//     <SessionProvider session={session}>
//       <StateContext>
//         <Layout>
//           <Toaster />
//           <Component {...pageProps} />
//         </Layout>
//       </StateContext>
//     </SessionProvider>
//   );
// }

// export default MyApp;

export default function MyApp(props) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
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
