import type { MDXInstance, Page } from 'astro';

export declare type FrontmatterPage = Page<MDXInstance<IFrontmatter>>;

export interface IFrontmatter {
  title: string;
  description: string;
  publicDate: string;
  coverImgSrc: string;
  coverImgAlt: string;
  draft?: boolean;
  tags?: string[];
}

/* 
{
  title: '第一篇文章',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur vero esse non molestias eos excepturi.',
  publicDate: '2020-02-01T00:00:00.000Z',
  coverImgSrc: '/src/pages/articles/first-post/cover-1.jpg',
  coverImgAlt: 'Image post 2',
  tags: [ 'Astro', 'JavaScript' ],
  file: '/Users/helloluffy/Programming/projects/astro-blog/src/pages/articles/first-post/first-post.md',
  url: '/articles/first-post/first-post',
  astro: {}
}
*/
