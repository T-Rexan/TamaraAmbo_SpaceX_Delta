import { FC } from 'react';

import LaunchItem from '../launch-item';
import styles from './launch-list.module.scss';

type LaunchListProps = { launchesList: Array<any> | null };

const LaunchList: FC<LaunchListProps> = ({ launchesList }) => {
  return (
    <div className={styles.grid}>
      {launchesList?.map((launch) => (
        <LaunchItem key={launch.id} item={launch} />
      ))}
      ;
    </div>
  );
};
export default LaunchList;
