import { GetStaticProps } from "next";
import fs from "fs-extra";
import path from "path";
import Head from "next/head";
import Layout from "../components/layout";
import { SITE } from "../constant";

const About = ({ page }) => {
  return (
    <>
      <Head>
        <title>サイトについて - {SITE.NAME}</title>
      </Head>

      <Layout>
        <h1>{page.title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: `${page.content}`,
          }}
        />
      </Layout>
    </>
  );
};

export default About;

export const getStaticProps: GetStaticProps = async (context) => {
  const dataPath = path.join(process.cwd(), "_source/pages.json");
  const pages = fs.readJsonSync(dataPath);
  const postData = pages.find((page: any) => page.slug === "about");

  return {
    props: {
      page: postData,
    },
  };
};