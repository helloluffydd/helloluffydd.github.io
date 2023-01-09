import type { MDXInstance } from 'astro';

import { IFrontmatter } from '@/type';

export interface MDXInstanceProperty extends MDXInstance<IFrontmatter> {
  coverImgSrc: string;
}

export const sortByDate = (posts: MDXInstance<IFrontmatter>[]) => {
  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.publicDate).valueOf() -
      new Date(a.frontmatter.publicDate).valueOf()
  );
};

export const generateSlug = (string: string) =>
  string
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/-\\-+/g, '')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

export const generateTagsData = (tags: string[]) => {
  // const tagsData = [];
  return tags.map((t) => ({
    name: t,
    slug: generateSlug(t),
  }));
};

export const generateCopyright = (year: number) => `Copyright © ${year} Luffy`;
