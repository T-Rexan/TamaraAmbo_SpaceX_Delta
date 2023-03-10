import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import LaunchItem from '@/components/Launches/launch-item';
import formatDate from '@/utils/formatDate';

import CancelIcon from '../public/icons/close-icon.svg';
import styles from './home.module.scss';

type LaunchItemProps = {
  flight_number: string;
  mission_name: string;
  links: any;
  details: string;
  launch_date_local: string;
};

const Home: NextPage = () => {
  const inputRef = useRef();
  const [launches, setLaunches] = useState([]);
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [error, setError] = useState(null);
  const [filteredLaunchesAll, setFilteredLaunchesAll] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isSearch, setIsSearch] = useState(false);
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
      setError(error);
    }
  };

  const loadMore = () => {
    const newOffset = launches.length;
    fetchLaunches(newOffset);
  };

  useEffect(() => {
    fetchLaunches(initialOffset);
  }, []);

  const searchHandler = async (e) => {
    if (e.key === 'Enter') {
      setIsSearch(true);
      setLaunches([]);
      try {
        const response = await fetch('https://api.spacexdata.com/v3/launches');
        const data = await response.json();
        const stringQuery = inputRef.current?.value;
        const filteredLaunchesArray = data.filter((launch) =>
          launch.mission_name.toLowerCase().includes(stringQuery.toLowerCase()),
        );
        setFilteredLaunchesAll(filteredLaunchesArray);
        setFilteredLaunches(filteredLaunchesArray.slice(0, 20));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const loadMoreFiltered = () => {
    const newOffset = filteredLaunches.length;
    const newFilteredArray = filteredLaunchesAll.slice(0, newOffset + 20);
    setFilteredLaunches(newFilteredArray);
  };

  const cancelHandler = () => {
    inputRef.current.value = '';
    fetchLaunches(0);
    setIsSearch(false);
  };

  if (error) {
    return <>{error?.message}</>;
  }

  return (
    <>
      <div className={styles.search}>
        <input
          ref={inputRef}
          onKeyDown={searchHandler}
          className={styles.input}
          type="text"
          placeholder="Search..."
        />
        {isSearch && (
          <button onClick={cancelHandler} className={styles.cancelBttn}>
            <span className={styles.icon}>
              <CancelIcon />
            </span>
          </button>
        )}
      </div>
      <InfiniteScroll
        dataLength={isSearch ? filteredLaunches.length : launches.length}
        next={isSearch ? loadMoreFiltered : loadMore}
        hasMore={
          isSearch
            ? filteredLaunches.length < filteredLaunchesAll.length
            : hasMore
        }
        loader={<h4>Loading...</h4>}
      >
        <div className={styles.grid}>
          {isSearch
            ? filteredLaunches?.map(
                ({
                  flight_number,
                  mission_name,
                  links,
                  details,
                  launch_date_local,
                }: LaunchItemProps) => (
                  <LaunchItem
                    key={flight_number}
                    name={mission_name}
                    id={flight_number}
                    img={links.mission_patch || '/no-image.png'}
                    details={details}
                    date={formatDate(launch_date_local)}
                  />
                ),
              )
            : launches?.map(
                ({
                  flight_number,
                  mission_name,
                  links,
                  details,
                  launch_date_local,
                }: LaunchItemProps) => (
                  <LaunchItem
                    key={flight_number}
                    name={mission_name}
                    id={flight_number}
                    img={links.mission_patch || '/no-image.png'}
                    details={details}
                    date={formatDate(launch_date_local)}
                  />
                ),
              )}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Home;
