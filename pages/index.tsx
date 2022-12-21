import type { InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import Date from "../components/Date";
import Layout from "../components/Layout";
import { getSortedPostsData } from "../lib/posts";
import { PostData } from "../lib/types";
import styles from "./Home.module.css";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
}

type Props = InferGetStaticPropsType<typeof getStaticProps>;

function Home({ allPostsData }: Props) {
  return (
    <Layout>
      <Head>
        <title>Dragoș Străinu&apos;s blog</title>
        {/* <meta name="description" content={postData.description} /> */}
        <meta property="og:title" content="Dragoș Străinu's blog" />
        {/* <meta property="og:description" content={postData.description} /> */}
        <meta
          property="og:image"
          content={`${process.env.SITE_URL}/banner.jpg`}
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${process.env.SITE_URL}`} />
      </Head>
      <h2>Salut</h2>
      <p>
        I am Dragoș (Dragosh), a Front-end Software Engineer, Hackathoner, OSS
        enthusiast.
      </p>
      <section>
        <ul className={styles.blogPosts}>
          {allPostsData.map(
            ({ slug, date, title, starred, externalLink }: PostData) => (
              <li
                key={externalLink || slug}
                className={starred ? styles.starred : ""}
              >
                <span>
                  <Date date={date} />
                </span>
                <Link href={externalLink || slug}>
                  <a>{title}</a>
                </Link>
              </li>
            )
          )}
        </ul>
      </section>
    </Layout>
  );
}

export default Home;
