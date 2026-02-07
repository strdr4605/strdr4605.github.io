import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";

export default function Custom404() {
  return (
    <Layout>
      <Head>
        <title>Dragoș Străinu&apos;s blog</title>
        <meta property="og:title" content="Dragoș Străinu's blog" />
        <meta
          property="og:image"
          content={`${process.env.SITE_URL}/banner.jpg`}
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${process.env.SITE_URL}`} />
      </Head>
      <h1>Page Not Found</h1>
      <p>
        Probably you mistyped or the page was removed.{" "}
        <a
          target="_blank"
          href={`mailto:str.dr4605@gmail.com?subject=Page not found&body=Hey Dragoș, I think [please insert url here] should exist.`}
          rel="noreferrer"
        >
          Let me know
        </a>{" "}
        if you think that this page should exist.
      </p>
      <p>
        Meanwhile you can check the <Link href="/">main page</Link>. Or follow
        me{" "}
        <a target="_blank" href="http://twitter.com/strdr4605" rel="noreferrer">
          @strdr4605
        </a>
        .
      </p>
    </Layout>
  );
}
