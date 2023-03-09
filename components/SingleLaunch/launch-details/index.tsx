import Link from 'next/link';
import { FC } from 'react';

import formatDate from '@/utils/formatDate';

import YoutubeIcon from '../../../public/icons/yt-icon.svg';
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
