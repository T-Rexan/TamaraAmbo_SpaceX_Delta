import { format } from 'date-fns';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import LaunchItem from '@/components/Launches/launch-item';

import styles from './home.module.scss';

type LaunchItemProps = {
  id: string;
  name: string;
  links: any;
  details: string;
  launch_date_local: string;
};

const Home: NextPage = () => {
  const [launches, setLaunches] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const limit = 20;
  const initialOffset = 0;

  const fetchLaunches = async (offset: number) => {
    try {
      const response = await fetch(
        `https://api.spacexdata.com/v3/launches?limit=${limit}&offset=${offset}`,
      );
      const data = await response.json();
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setLaunches((prevLaunches) => [...prevLaunches, ...data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = () => {
    const newOffset = launches.length;
    fetchLaunches(newOffset);
  };

  //can move to a util func
  function formatDate(date_local: string) {
    return format(new Date(date_local), 'dd MMMM yyyy');
  }
  console.log(launches);

  useEffect(() => {
    console.log(1);

    fetchLaunches(initialOffset);
  }, []);

  return (
    <InfiniteScroll
      dataLength={launches.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      <div className={styles.grid}>
        {launches?.map(
          ({
            id,
            name,
            links,
            details,
            launch_date_local,
          }: LaunchItemProps) => (
            <LaunchItem
              key={id}
              name={name}
              id={id}
              img={links.mission_patch || '/no-image.png'}
              details={details}
              date={formatDate(launch_date_local)}
            />
          ),
        )}
      </div>
    </InfiniteScroll>
  );
};

export default Home;
