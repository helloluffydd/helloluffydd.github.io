/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from 'react';
import { useEffect, useState, useCallback, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { graphql, Link } from 'gatsby';
import moment from 'moment';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import AdSense from 'react-adsense';
import { useColorMode } from 'theme-ui';
import { throttle } from 'lodash';

import './post.scss';
import './code.scss';
// import './code-theme.scss';
import './md-style.scss';
import 'katex/dist/katex.min.css';

import Layout from '../components/Layout';
import SocialShare from '../components/SocialShare';
import Series from '../components/Series';
import Toc from '../components/Toc';
import SEO from '../components/seo';

import { RootState } from '../state/reducer';
import config from '../../_config';

interface SeriesInterface {
  slug: string;
  title: string;
  num: number;
}

interface postProps {
  data: any;
  location: { pathname: string };
  pageContext: { slug: string; series: SeriesInterface[]; lastmod: string };
}

interface iConfig {
  enablePostOfContents: boolean;
  enableSocialShare: boolean;
  disqusShortname?: string;
}

const Post = ({ data, location, pageContext }: postProps) => {
  const isSSR = typeof window === 'undefined';
  const isMobile = useSelector((state: RootState) => state.isMobile);

  const [yList, setYList] = useState([] as number[]);
  const [isInsideToc, setIsInsideToc] = useState(false);
  const [commentEl, setCommentEl] = useState<JSX.Element | null>(null);
  const [colorMode] = useColorMode();

  const { markdownRemark } = data;
  const { frontmatter, html, tableOfContents, fields, excerpt } = markdownRemark;
  const { title, date, update, tags, featuredImage } = frontmatter;
  const { slug } = fields;
  const { series } = pageContext;
  const { enablePostOfContents, disqusShortname, enableSocialShare }: iConfig = config;

  const lastUpdate = update === '0001-01-01' ? null : update;
  const isTableOfContents = enablePostOfContents && tableOfContents !== '';
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isDisqus: boolean = disqusShortname ? true : false;
  const isSocialShare = enableSocialShare;

  const currentPostIdx = series.map((s: any) => s.slug).findIndex((s) => s === slug);
  const mapSeries = series.slice(currentPostIdx === 0 ? 0 : currentPostIdx - 1, currentPostIdx + 2);
  const seriesTitle = series[0]['title'].split('-')[0].trim();

  const mapTags = tags.map((tag: string) => {
    return (
      <li key={tag} className="blog-post-tag">
        <Link to={`/tags#${tag}`}>{`#${tag}`}</Link>
      </li>
    );
  });

  const renderComment = () => {
    const Comment = React.lazy(() => import('../components/Comment'));
    setCommentEl(<Comment slug={slug} title={title} />);
  };

  useEffect(() => {
    if (isMobile) {
      const adDiv = document.querySelector('.ad') as HTMLDivElement;

      if (adDiv) {
        const maxWidth = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;
        adDiv.style.maxWidth = `${maxWidth}px`;
        adDiv.style.display = 'flex';
        adDiv.style.justifyContent = 'flex-end';
      }
    }
  }, [isMobile]);

  useEffect(() => {
    const setYPos = () => {
      if (yList) {
        const index =
          yList.filter((v: number) => {
            return v < window.pageYOffset;
          }).length - 1;

        const aList = document.querySelectorAll('.toc.outside li a') as NodeListOf<HTMLAnchorElement>;

        for (const i in Array.from(aList)) {
          if (parseInt(i, 10) === index) {
            aList[i].style.opacity = '1';
          } else {
            aList[i].style.opacity = '0.4';
          }
        }
      }
    };

    if (isTableOfContents) document.addEventListener('scroll', setYPos);
    return () => {
      if (isTableOfContents) document.removeEventListener('scroll', setYPos);
    };
  }, [yList]);

  useEffect(() => {
    setCommentEl(null);

    setTimeout(() => {
      renderComment();
    }, 1000);
  }, [colorMode]);

  useEffect(() => {
    // scroll
    const postContentOriginTop = document.querySelector('.blog-post')?.getBoundingClientRect().top ?? 0;
    const removeScrollEvent = () => document.removeEventListener('scroll', scrollEvents);

    const scrollEvents = throttle(() => {
      const postContentHeight = document.querySelector('.blog-post')?.getBoundingClientRect().height ?? Infinity;
      if (window.scrollY + window.innerHeight * 1.75 - postContentOriginTop > postContentHeight) {
        renderComment();
        removeScrollEvent();
      }
    }, 250);
    scrollEvents();
    document.addEventListener('scroll', scrollEvents);

    // toc
    const hs = Array.from(document.querySelectorAll('h2, h3')) as HTMLHeadingElement[];
    const minusValue = window.innerHeight < 500 ? 100 : Math.floor(window.innerHeight / 5);
    const yPositions = hs.map((h) => h.offsetTop - minusValue);
    setYList(yPositions);

    return () => removeScrollEvent();
  }, []);

  return (
    <>
      <Helmet>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <script type="application/ld+json">
          {`
{
  "@context": "https://schema.org",
  "@type": "Article",
  "datePublished": "${moment(new Date(date)).toISOString()}",
  ${lastUpdate ? `"dateModified": "${moment(new Date(lastUpdate)).toISOString()}",` : ''}
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "${config.siteUrl}"
  },
  "author": {
    "@type": "Person",
    "name": "${config.name}"
  },
  "headline": "${title}",
  ${
    config.profileImageFileName
      ? `"publisher": {
    "@type" : "organization",
    "name" : "${config.name}",
    "logo": {
      "@type": "ImageObject",
      "url": "${config.siteUrl}${require(`../images/${config.profileImageFileName}`)}"
    }
  },
  "image": ["${config.siteUrl}${require(`../images/${config.profileImageFileName}`)}"]`
      : `"publisher": {
    "@type" : "organization",
    "name" : "${config.name}"
  },
  "image": []`
  }
}
`}
        </script>
      </Helmet>

      <SEO title={title} description={excerpt} pathname={location.pathname} imageUrl={featuredImage?.publicURL} />

      <Layout>
        <div className="blog-post-container">
          <div className="blog-post">
            <h1 className="blog-post-title">{title}</h1>

            <div className="blog-post-info">
              <div className="date-wrap">
                <span className="write-date">{date}</span>
                {lastUpdate && (
                  <>
                    <span>(</span>
                    <span className="update-date">{`Last updated: ${lastUpdate}`}</span>
                    <span>)</span>
                  </>
                )}
              </div>

              {tags.length > 0 && (
                <>
                  <span className="dot">·</span>
                  <ul className="blog-post-tag-list">{mapTags}</ul>
                </>
              )}

              {isTableOfContents && (
                <div className="blog-post-inside-toc">
                  <div
                    className="toc-button"
                    role="button"
                    onClick={() => {
                      setIsInsideToc((prev: boolean) => {
                        return !prev;
                      });
                    }}
                  >
                    <Fa icon={faListUl} />
                  </div>
                </div>
              )}
            </div>

            {isTableOfContents && (
              <div className="inside-toc-wrap" style={{ display: isInsideToc ? 'flex' : 'none' }}>
                <Toc isOutside={false} toc={tableOfContents} />
              </div>
            )}

            <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: html }} />

            {series.length > 0 && <Series seriesTitle={seriesTitle} series={mapSeries} currentSlug={slug} />}
          </div>

          {isSocialShare && <SocialShare slug={slug} />}

          {isDevelopment ? (
            <>
              <aside className="ad ad-dev">
                <span>Ads</span>
                <span>displayed when you deploy</span>
              </aside>
              {isDisqus && (
                <div className="comments comments-dev">
                  <span>Comments</span>
                  <span>displayed when you deploy</span>
                </div>
              )}
            </>
          ) : (
            <>
              <aside className="ad">
                <AdSense.Google
                  client={config.googleAdsenseClient || 'ca-pub-5001380215831339'}
                  slot={config.googleAdsenseSlot || '5214956675'}
                  style={{ display: 'block' }}
                  format="auto"
                  responsive="true"
                />
              </aside>

              {!isSSR ? <Suspense fallback={<></>}>{commentEl}</Suspense> : null}
            </>
          )}
        </div>

        {isTableOfContents && <Toc isOutside={true} toc={tableOfContents} />}
      </Layout>
    </>
  );
};

export const pageQuery = graphql`
  query ($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt(truncate: true, format: PLAIN)
      tableOfContents
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        update(formatString: "YYYY-MM-DD")
        tags
        keywords
        featuredImage {
          publicURL
        }
      }
    }
  }
`;

export default Post;
