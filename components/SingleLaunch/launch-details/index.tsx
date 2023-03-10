import Link from 'next/link';
import { FC } from 'react';

import ArticleIcon from '../../../public/icons/article-icon.svg';
import WikipediaIcon from '../../../public/icons/wikipedia-icon.svg';
import YoutubeIcon from '../../../public/icons/yt-icon.svg';
import formatDate from '../../../utils/formatDate';
import RocketInformation from '../rocket-information';
import styles from './launch-details.module.scss';

type LaunchDetailsProps = {
  name: string;
  success: boolean;
  details: string;
  date: string;
  links: any;
  rocketId: string;
  rocketName: string;
  rocketType: string;
};

const LaunchDetails: FC<LaunchDetailsProps> = ({
  rocketId,
  rocketName,
  rocketType,
  name,
  links,
  details,
  date,
  success,
}) => {
  return (
    <div className={styles.grid}>
      <h1 className={styles.title}>{name}</h1>
      <h2 className={styles.date}>
        Launch Date: {date && formatDate(date)},
        <span className={success ? styles.success : styles.failure}>
          {success ? ' Success' : ' Failure'}
        </span>
      </h2>
      <p className={styles.details}>Mission details: {details}</p>
      <div className={styles.links}>
        {links?.video_link && (
          <Link className={styles.icon} href={links?.video_link}>
            <YoutubeIcon />{' '}
          </Link>
        )}
        {links?.article_link && (
          <Link className={styles.icon} href={links?.article_link}>
            <ArticleIcon />{' '}
          </Link>
        )}
        {links?.wikipedia && (
          <Link className={styles.icon} href={links?.wikipedia}>
            <WikipediaIcon />{' '}
          </Link>
        )}
      </div>

      <RocketInformation
        rocketId={rocketId}
        rocketName={rocketName}
        rocketType={rocketType}
      />
    </div>
  );
};
export default LaunchDetails;
