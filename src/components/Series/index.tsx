import React from 'react';
import { Link } from 'gatsby';
import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import './style.scss';

interface SeriesItemInterface {
  title: string;
  slug: string;
  num: number;
  isActive: boolean;
}

export type SeriesItemData = Pick<SeriesItemInterface, 'title' | 'slug' | 'num'>;

const SeriesItem: React.FC<SeriesItemInterface> = ({ title, slug, num, isActive }) => {
  return (
    <li key={`${slug}-series-${num}`} className={`series-item ${isActive ? 'current-series' : ''}`}>
      <Link to={slug}>
        <span>{title}</span>
        <div className="icon-wrap">{isActive && <Fa icon={faAngleLeft} />}</div>
      </Link>
    </li>
  );
};

interface SeriesInterface {
  seriesTitle: string;
  series: SeriesItemData[];
  currentSlug: string;
}

const Series: React.FC<SeriesInterface> = ({ seriesTitle, series, currentSlug }) => {
  return (
    <div className="series">
      <div className="series-head">
        <h2 className="head">{seriesTitle} 系列文章</h2>
        <div className="icon-wrap">
          <Fa icon={faLayerGroup} />
        </div>
      </div>
      <ul className="series-list">
        {series.map(({ title, slug, num }) => (
          <SeriesItem key={slug} title={title} slug={slug} num={num} isActive={slug === currentSlug} />
        ))}
      </ul>
    </div>
  );
};

export default Series;
