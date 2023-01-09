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
