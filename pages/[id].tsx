import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import LaunchDetails from '@/components/SingleLaunch/launch-details';
import useFetch from '@/hooks/useFetch';

import BackIcon from '../public/icons/back-icon.svg';
import styles from './single-launch.module.scss';

interface IParams extends ParsedUrlQuery {
  id: string;
}

type DetailPageProps = {
  id: string;
};

const DetailPage: NextPage<DetailPageProps> = ({ id }) => {
  const { data, isLoading, error } = useFetch(
    `https://api.spacexdata.com/v3/launches?flight_number=${id}`,
  );
  let singleLaunch;

  if (isLoading) return <p>Loading</p>;
  if (error) return <p>Error</p>;
  console.log(data);

  if (data) {
    singleLaunch = data[0];
  }

  return (
    <div className={styles.container}>
      <div>
        <Image
          className={styles.image}
          src={singleLaunch?.links?.mission_patch || '/no-image.png'}
          alt={`Patch for the ${singleLaunch?.mission_name}`}
          height={500}
          width={500}
          layout="responsive"
        />
        <Link className={styles.backLink} href="/">
          <span className={styles.icon}>
            <BackIcon />
          </span>
          <span className={styles.backLinkText}>Back</span>
        </Link>
      </div>
      <div className={styles.launchGrid}>
        <LaunchDetails
          date={singleLaunch?.launch_date_local}
          name={singleLaunch?.mission_name}
          success={singleLaunch?.launch_success}
          details={singleLaunch?.details}
          links={singleLaunch?.links}
          rocketId={singleLaunch?.rocket.rocket_id}
          rocketName={singleLaunch?.rocket.rocket_name}
          rocketType={singleLaunch?.rocket.rocket_type}
        />
      </div>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as IParams;

  return {
    props: {
      id: id.toString(),
      isProtected: true,
    },
  };
};
export default DetailPage;
