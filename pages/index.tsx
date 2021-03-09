import { GetStaticProps } from "next";
import fs from "fs-extra";
import path from "path";
import Head from "next/head";
import Link from "next/link";
import { SITE } from "../constant";
import Layout from "../components/layout";

export default function Home({ recentPosts, updatesPosts }) {
  return (
    <>
      <Head>
        <title>{SITE.NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <h2>Recent Articles</h2>
        <ul>
          {recentPosts.map((post, index: number) => (
            <li key={index}>
              <Link href={"/" + post.path}>{post.title}</Link>
            </li>
          ))}
        </ul>
        <hr />
        <h2>Updated Articles</h2>
        <ul>
          {updatesPosts.map((post, index: number) => (
            <li key={index}>
              <Link href={"/" + post.path}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const recentPostsPath = path.join(process.cwd(), "_source/recent_posts.json");
  const updatesPostsPath = path.join(
    process.cwd(),
    "_source/updates_posts.json"
  );
  const recentPosts = fs.readJsonSync(recentPostsPath);
  const updatesPosts = fs.readJsonSync(updatesPostsPath);

  return {
    props: {
      recentPosts,
      updatesPosts,
    },
  };
};