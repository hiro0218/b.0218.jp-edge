import Link from 'next/link';
import React, { FC } from 'react';

import style from '@/styles/Components/post-meta.module.css';
import { Post } from '@/types/source';

type Props = Pick<Post, 'categories' | 'tags'>;

const PostTerm: FC<Props> = ({ categories, tags }) => {
  return (
    <>
      {categories.length !== 0 && (
        <div className={style['c-post-meta']}>
          {categories.map((category, index) => (
            <div key={index} className={style['c-post-meta__item--separator']}>
              <Link href={'/' + category.path}>
                <a className={style['c-post-meta__link--category']}>{category.name}</a>
              </Link>
            </div>
          ))}
        </div>
      )}

      {tags.length !== 0 && (
        <div className={style['c-post-meta']}>
          {tags.map((tag, index) => (
            <div key={index} className={style['c-post-meta__item--separator']}>
              <Link href={'/' + tag.path}>
                <a className={style['c-post-meta__link--tag']}>{tag.name}</a>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PostTerm;