import type { AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";
import "prismjs/themes/prism.css";
import * as gtag from "../lib/gtag";
import "../styles/globals.css";
import Script from "next/script";

const isProduction = process.env.NODE_ENV === "production";

// Remove workers created by gatsby-plugin-offline
// https://github.com/gatsbyjs/gatsby/issues/2880#issuecomment-349789919
if (typeof window !== "undefined" && "serviceWorker" in navigator) {
  window.navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((r) => r.unregister());
  });
}

if (isProduction) {
  // Notice how we track pageview when route is changed
  Router.events.on("routeChangeComplete", (url) => gtag.pageview(url));
}

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
