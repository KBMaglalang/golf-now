import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import { Toaster } from "react-hot-toast";
import { StateContext } from "../context/StateContext";

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}

export default MyApp;
