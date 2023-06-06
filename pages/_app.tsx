import type { AppProps } from "next/app";
import Head from "next/head";
import "prismjs/themes/prism.css";
import "../styles/globals.css";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
      <Script
        async
        src="https://analytics.umami.is/script.js"
        data-website-id="ffd94eb4-d3a5-4505-bcd4-35c97edc57c8"
      />
    </>
  );
}

export default MyApp;
