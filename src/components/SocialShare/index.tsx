import React from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  RedditShareButton,
  PocketShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  RedditIcon,
  PocketIcon,
  EmailIcon,
} from 'react-share';

import { siteUrl } from '../../../_config';

import './style.scss';

interface SocialShareInterface {
  slug: string;
}

const SocialShare: React.FC<SocialShareInterface> = ({ slug }) => {
  return (
    <div className="social-share">
      <ul>
        <li className="social-share-item email">
          <EmailShareButton url={siteUrl + slug}>
            <EmailIcon size={24} round={true} />
          </EmailShareButton>
        </li>
        <li className="social-share-item facebook">
          <FacebookShareButton url={siteUrl + slug}>
            <FacebookIcon size={24} round={true} />
          </FacebookShareButton>
        </li>
        <li className="social-share-item twitter">
          <TwitterShareButton url={siteUrl + slug}>
            <TwitterIcon size={24} round={true} />
          </TwitterShareButton>
        </li>
        <li className="social-share-item linkedin">
          <LinkedinShareButton url={siteUrl + slug}>
            <LinkedinIcon size={24} round={true} />
          </LinkedinShareButton>
        </li>
        <li className="social-share-item reddit">
          <RedditShareButton url={siteUrl + slug}>
            <RedditIcon size={24} round={true} />
          </RedditShareButton>
        </li>
        <li className="social-share-item pocket">
          <PocketShareButton url={siteUrl + slug}>
            <PocketIcon size={24} round={true} />
          </PocketShareButton>
        </li>
      </ul>
    </div>
  );
};

export default SocialShare;
