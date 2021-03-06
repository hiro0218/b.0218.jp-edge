import fs from 'fs-extra';
import { GetStaticProps, NextPage } from 'next';
import path from 'path';

import Heading from '@/components/Heading';
import { MenuList, MenuListItem } from '@/components/layout/MenuList';
import PageContainer from '@/components/layout/PageContainer';
import LinkCard from '@/components/LinkCard';
import { Post as PropsPost } from '@/types/source';

interface Props {
  recentPosts: Array<PropsPost>;
  updatesPosts: Array<PropsPost>;
}

const Home: NextPage<Props> = ({ recentPosts, updatesPosts }) => {
  return (
    <>
      <PageContainer>
        <header>
          <Heading text={'Home'} />
        </header>
        <section className="p-home">
          <section className="p-home-section">
            <header>
              <Heading tagName={'h2'} text={'Recent Articles'} isWeightNormal={true} />
            </header>
            <MenuList className="p-home-section__contents">
              {recentPosts.map((post, index) => (
                <MenuListItem key={index}>
                  <LinkCard link={`${post.slug}.html`} title={post.title} date={post.date} excerpt={post.excerpt} />
                </MenuListItem>
              ))}
            </MenuList>
          </section>

          <section className="p-home-section">
            <header>
              <Heading tagName={'h2'} text={'Updated Articles'} isWeightNormal={true} />
            </header>
            <MenuList className="p-home-section__contents">
              {updatesPosts.map((post, index) => (
                <MenuListItem key={index}>
                  <LinkCard link={`${post.slug}.html`} title={post.title} date={post.date} excerpt={post.excerpt} />
                </MenuListItem>
              ))}
            </MenuList>
          </section>
        </section>
      </PageContainer>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const postsPath = path.join(process.cwd(), 'dist/posts.json');
  const posts: Array<PropsPost> = fs.readJsonSync(postsPath);
  const recentPosts = posts.filter((_, i) => i < 5);
  const updatesPosts = posts
    .sort((a, b) => {
      return a.updated < b.updated ? 1 : -1;
    })
    .filter((post) => post.date < post.updated)
    .filter((post) => {
      // recentPosts に含まれているものは除外する
      return !recentPosts.filter((recentPost) => post.slug === recentPost.slug).length;
    })
    .filter((_, i) => i < 5);

  return {
    props: {
      recentPosts,
      updatesPosts,
    },
  };
};
