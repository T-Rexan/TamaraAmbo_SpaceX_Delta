import { NextPage } from 'next';

import LaunchItem from '@/components/Launches/launch-item';
import Loading from '@/components/ui/loading';
import useFetch from '@/hooks/useFetch';

import styles from './home.module.scss';

type LaunchItemProps = {
  id: string;
  name: string;
  links: any;
  details: string;
};

const Home: NextPage = () => {
  const [data] = useFetch('https://api.spacexdata.com/v4/launches');

  return (
    <div>
      {!data ? (
        <Loading></Loading>
      ) : (
        <div className={styles.grid}>
          {data?.map(({ id, name, links, details }: LaunchItemProps) => (
            <LaunchItem
              key={id}
              name={name}
              id={id}
              img={links.patch.small}
              details={details}
            />
          ))}
          ;
        </div>
      )}
    </div>
  );
};

export default Home;
