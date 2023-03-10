import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import LaunchItem from '@/components/Launches/launch-item';
import formatDate from '@/utils/formatDate';

import Error from '../components/ui/error';
import CancelIcon from '../public/icons/close-icon.svg';
import styles from './home.module.scss';

type Launch = {
  flight_number: string;
  mission_name: string;
  links: {
    mission_patch?: string;
  };
  details: string;
  launch_date_local: string;
};

const Home: NextPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [launches, setLaunches] = useState([]);
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [error, setError] = useState<Error | null>(null);
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
      setError(error as Error);
    }
  };

  const loadMore = () => {
    const newOffset = launches.length;
    fetchLaunches(newOffset);
  };

  useEffect(() => {
    fetchLaunches(initialOffset);
  }, []);

  const searchHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current?.value) {
      setIsSearch(true);
      setLaunches([]);
      try {
        const response = await fetch('https://api.spacexdata.com/v3/launches');
        const data = await response.json();
        const stringQuery = inputRef.current.value.toLowerCase();
        const filteredLaunchesArray = data.filter((launch: Launch) =>
          launch.mission_name.toLowerCase().includes(stringQuery),
        );
        setFilteredLaunchesAll(filteredLaunchesArray);
        setFilteredLaunches(filteredLaunchesArray.slice(0, limit));
      } catch (error) {
        setError(error as Error);
      }
    }
  };

  const loadMoreFiltered = () => {
    const newOffset = filteredLaunches.length;
    const newFilteredArray = filteredLaunchesAll.slice(0, newOffset + limit);
    setFilteredLaunches(newFilteredArray);
  };

  const cancelHandler = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    fetchLaunches(0);
    setIsSearch(false);
  };

  if (error) {
    return <Error>{error?.message}</Error>;
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
                }: Launch) => (
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
                }: Launch) => (
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
