import type { MarkdownInstance, Page } from 'astro';

export declare type FrontmatterPage = Page<MarkdownInstance<IFrontmatter>>;

export interface IFrontmatter {
  title: string;
  description: string;
  pubDate: string;
  imgSrc: string;
  imgAlt: string;
  tags?: string[];
}

/* 
{
  title: '第一篇文章',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur vero esse non molestias eos excepturi.',
  pubDate: '2020-02-01T00:00:00.000Z',
  imgSrc: '/src/pages/articles/first-post/cover-1.jpg',
  imgAlt: 'Image post 2',
  tags: [ 'Astro', 'JavaScript' ],
  file: '/Users/helloluffy/Programming/projects/astro-blog/src/pages/articles/first-post/first-post.md',
  url: '/articles/first-post/first-post',
  astro: {}
}
*/
