import type { AppProps } from "next/app";
import Head from "next/head";
import "prismjs/themes/prism.css";
import "../styles/globals.css";
import Script from "next/script";

MyApp.getStaticProps = async () => {
  const isProduction = process.env.NODE_ENV === "production";
  return { props: { isProduction } };
};

function MyApp(props: AppProps & { isProduction: boolean }) {
  const { Component, pageProps, isProduction } = props;
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
      {isProduction && (
        <Script
          async
          src="https://analytics.umami.is/script.js"
          data-website-id="ffd94eb4-d3a5-4505-bcd4-35c97edc57c8"
        />
      )}
    </>
  );
}

export default MyApp;
