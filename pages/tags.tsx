import Link from "next/link";
import { InferGetStaticPropsType } from "next/types";
import Layout from "../components/Layout";
import { getAllTags } from "../lib/posts";

export async function getStaticProps() {
  const allTags = getAllTags();

  return {
    props: {
      allTags,
    },
  };
}

type Props = InferGetStaticPropsType<typeof getStaticProps>;
export default function Tags({ allTags }: Props) {
  return (
    <Layout>
      <h1>All tags</h1>
      <ul>
        {allTags.map((tag) => {
          const hashTag = `#${tag}`;
          return (
            <li key={tag}>
              <Link href={`/tags/${tag}`}>{hashTag}</Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}
