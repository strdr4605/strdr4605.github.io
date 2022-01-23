import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import Date from "../components/Date";
import Layout from "../components/Layout";
import PostFooter from "../components/PostFooter";
import UtterancesComments from "../components/UtterancesComments";
import {
  readSlugFolderNameCache,
  SlugFolderNameMap,
  writeSlugFolderNameCache,
} from "../lib/post";
import { getAllPostFolderNames, getPostData } from "../lib/posts";

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ postSlug: string }>) {
  if (!params) {
    throw new Error("No folderName");
  }

  const slugFolderNameMap = readSlugFolderNameCache();
  const folderName = slugFolderNameMap[params.postSlug];

  const postData = await getPostData(folderName);
  return {
    props: {
      postData,
    },
  };
}

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function Post({ postData }: Props) {
  return (
    <Layout>
      <Head>
        {/* common meta tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta property="og:locale" content="en_GB" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={process.env.twitterCreator} />
        <meta name="theme-color" content="#FAF181" />

        <title>{postData.title}</title>
        <meta name="description" content={postData.description} />
        <meta property="og:title" content={postData.title} />
        <meta property="og:description" content={postData.description} />
        <meta
          property="og:image"
          content={`${process.env.SITE_URL}/${
            postData.banner || postData.slug + ".jpg"
          }`}
        />
        <meta property="og:type" content="article" />
        <link
          rel="canonical"
          href={`${process.env.SITE_URL}/${postData.slug}`}
        />
      </Head>
      <h1>{postData.title}</h1>
      <br />
      <Date date={postData.date} />
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      <PostFooter />
      <UtterancesComments />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postFolderNames = getAllPostFolderNames();
  const slugFolderNameMap = postFolderNames.reduce(
    (acc: SlugFolderNameMap, p) => {
      const { postSlug, folderName } = p;
      acc[postSlug] = folderName;
      return acc;
    },
    {}
  );
  writeSlugFolderNameCache(slugFolderNameMap);

  const paths = postFolderNames.map(({ postSlug }) => ({
    params: { postSlug },
  }));

  return {
    paths,
    fallback: false,
  };
};
