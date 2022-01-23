/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { title as defaultTitle, description as defaultDescription, author, language, siteUrl } from '../../_config';
interface SEOPropsType {
  title?: string;
  description?: string;
  pathname?: string;
  imageUrl?: string;
  type?: string;
  meta?: any[];
}

const SEO = ({
  title = defaultTitle,
  description = defaultDescription,
  pathname = '',
  imageUrl = '/og-default.png',
  type = 'website',
  meta = [],
}: SEOPropsType) => {
  const metaTitle = defaultTitle === title ? defaultTitle : `${title} | ${defaultTitle}`;
  const url = `${siteUrl}${pathname}`;

  const metaOg = [
    {
      property: `og:title`,
      content: metaTitle,
    },
    {
      property: `og:description`,
      content: description,
    },
    {
      property: 'og:url',
      content: url,
    },
    {
      property: 'og:image',
      content: imageUrl,
    },
    {
      property: `og:type`,
      content: type,
    },
  ];

  const metaTwitter = [
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: author,
    },
    {
      name: `twitter:title`,
      content: metaTitle,
    },
    {
      name: `twitter:description`,
      content: description,
    },
  ];

  return (
    <Helmet
      htmlAttributes={{
        lang: language,
      }}
      title={metaTitle}
      meta={[
        {
          name: `description`,
          content: description,
        },
        ...metaOg,
        ...metaTwitter,
      ].concat(meta ?? [])}
    />
  );
};

export default SEO;
