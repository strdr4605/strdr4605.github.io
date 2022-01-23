import type { AppProps } from "next/app";
import Router from "next/router";
import "prismjs/themes/prism.css";
import * as gtag from "../lib/gtag";
import "../styles/globals.css";

const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  // Notice how we track pageview when route is changed
  Router.events.on("routeChangeComplete", (url) => gtag.pageview(url));
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
