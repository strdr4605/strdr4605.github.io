import Document, { Head, Html as HTML, Main, NextScript } from "next/document";

export default class CustomDocument extends Document {
  render() {
    return (
      <HTML lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <meta property="og:locale" content="en_GB" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:creator" content={process.env.twitterCreator} />
          <meta name="theme-color" content="#FAF181" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </HTML>
    );
  }
}
