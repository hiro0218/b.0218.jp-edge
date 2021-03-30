import { defineComponent, useContext, useMeta } from '@nuxtjs/composition-api';
import { Fragment } from 'vue-fragment';

import LayoutHeader from '~/components/LayoutHeader';
import PostAds from '~/components/PostAds';
import PostContent from '~/components/PostContent';
import PostMeta from '~/components/PostMeta';
import PostPager from '~/components/PostPager';
import PostShare from '~/components/PostShare';
import { Post } from '~/types/source';
import { postMeta } from '~/utils/post';

const posts: Array<Post> = require('~/_source/posts.json');

export default defineComponent({
  name: 'Post',
  setup(_, { root }) {
    const { params } = useContext();
    // @ts-ignore
    const { $filteredPost, isDev } = root.context;

    // nuxt generate & nuxt dev
    if (process.static && process.server) {
      // generate時はhtmlが含まれていないため付与する
      if (!params.value.post.includes('.html')) {
        params.value.post += '.html';
      }
    }

    // パラメータからヘッダー情報を取得
    const postData = posts.find((post: { path: string }) => {
      return post.path === params.value.post;
    });

    // **.html の結果が見つからない
    if (!postData || Object.keys(postData).length === 0) {
      // @ts-ignore
      root.error({ statusCode: 404, message: 'Page not found' });
      return;
    }

    const post: Post = {
      ...postData,
      // @ts-ignore
      content: $filteredPost(postData.content),
    };

    // metaを追加
    useMeta(postMeta(post, isDev));

    return {
      post,
    };
  },
  head() {
    return {};
  },
  render() {
    return (
      <div class="post">
        {this.post && (
          <Fragment>
            <article class="post__article">
              <LayoutHeader heading={this.post.title}>
                <PostMeta
                  date={this.post.date}
                  updated={this.post.updated}
                  postCategory={this.post.categories}
                  postTag={this.post.tags}
                />
              </LayoutHeader>
              <PostAds />
              <PostContent content={this.post.content} />
            </article>
            <div class="post__share">
              <client-only>
                <PostShare postTitle={this.post.title} />
              </client-only>
            </div>
            <div class="post__pager">
              <PostPager next={this.post.next} prev={this.post.prev} />
            </div>
          </Fragment>
        )}
      </div>
    );
  },
});