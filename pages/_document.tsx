import Document, { Head, Html as HTML, Main, NextScript } from "next/document";
import { Fragment } from "react";
import { GA_TRACKING_ID } from "../lib/gtag";

export default class CustomDocument extends Document<{
  isProduction: boolean;
}> {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);

    const isProduction = process.env.NODE_ENV === "production";

    return {
      ...initialProps,
      isProduction,
    };
  }

  render() {
    const { isProduction } = this.props;

    return (
      <HTML>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <meta property="og:locale" content="en_GB" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:creator" content={process.env.twitterCreator} />
          <meta name="theme-color" content="#FAF181" />
          {/* We only want to add the scripts if in production */}
          {isProduction && (
            <Fragment>
              {/* Global Site Tag (gtag.js) - Google Analytics */}
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                    });
                  `,
                }}
              />
            </Fragment>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </HTML>
    );
  }
}
