import type { AppProps } from "next/app";
import Router from "next/router";
import "prismjs/themes/prism.css";
import * as gtag from "../lib/gtag";
import "../styles/globals.css";

const isProduction = process.env.NODE_ENV === "production";

// Remove workers created by gatsby-plugin-offline
// https://github.com/gatsbyjs/gatsby/issues/2880#issuecomment-349789919
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(r => r.unregister())
  })
}

if (isProduction) {
  // Notice how we track pageview when route is changed
  Router.events.on("routeChangeComplete", (url) => gtag.pageview(url));
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
