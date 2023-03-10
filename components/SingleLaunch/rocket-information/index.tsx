import { FC, useState } from 'react';

import useFetch from '../../../hooks/useFetch';
import ArrowDown from '../../../public/icons/arrow-down.svg';
import ArrowUp from '../../../public/icons/arrow-up.svg';
import CircleIcon from '../../../public/icons/circle-icon.svg';
import HeightIcon from '../../../public/icons/height-icon.svg';
import RocketIcon from '../../../public/icons/rocket-icon.svg';
import WeightIcon from '../../../public/icons/weight-icon.svg';
import Error from '../../ui/error';
import Loading from '../../ui/loading';
import styles from './rocket-info.module.scss';

type RocketInformationProps = {
  rocketId: string;
  rocketName: string;
  rocketType: string;
};

const RocketInformation: FC<RocketInformationProps> = ({
  rocketId,
  rocketName,
  rocketType,
}) => {
  const [showRocketDetails, setShowRocketDetails] = useState(false);
  const { data, isLoading, error } = useFetch(
    rocketId && `https://api.spacexdata.com/v3/rockets/${rocketId}`,
  );

  const { mass, height, diameter, description, success_rate_pct } = data || {};

  if (error) return <Error>Error</Error>;

  if (isLoading) return <Loading />;

  return (
    <div className={styles.container}>
      <div className={styles.rocketInfo}>
        <div className={styles.center}>
          <span className={styles.icon}>
            <RocketIcon />
          </span>
          <span>{rocketName}</span>
        </div>
        <div>
          <span>
            <b>Type:</b>
          </span>
          <span style={{ marginLeft: '5px' }}>
            {rocketType || 'Type unkwon'}
          </span>
        </div>
        <button
          aria-label="show more rocket details"
          className={styles.showDetails}
          onClick={() => setShowRocketDetails(!showRocketDetails)}
        >
          {showRocketDetails ? (
            <span className={styles.icon}>
              <ArrowUp />
            </span>
          ) : (
            <span className={styles.icon}>
              <ArrowDown />
            </span>
          )}
        </button>
      </div>
      {showRocketDetails && (
        <div className={styles.hiddenInfo}>
          <div className={styles.rocketDimension}>
            <div className={styles.center}>
              <span className={styles.icon}>
                <WeightIcon />
              </span>
              {mass?.kg} {'kg'}
            </div>
            <div className={styles.center}>
              <span className={styles.icon}>
                <HeightIcon />
              </span>
              {height?.meters} {'m'}
            </div>
            <div className={styles.center}>
              <span className={styles.icon}>
                <CircleIcon />
              </span>
              {diameter?.meters} {'m'}
            </div>
            <div className={styles.center}>
              <span
                style={{ marginLeft: '12px', fontSize: '1rem' }}
                className={styles.icon}
              ></span>
              <b style={{ fontSize: '1rem' }}>Success:</b>{' '}
              <span style={{ marginLeft: '4px' }}>
                {success_rate_pct} {'%'}
              </span>
            </div>
          </div>
          <div className={styles.rocketDescription}>
            <h3>More details:</h3>
            <p>{description}</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default RocketInformation;
