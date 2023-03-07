import { NextPage } from 'next';

import LaunchList from '@/components/Launches/launch-list';
import Loading from '@/components/ui/loading';
import useFetch from '@/hooks/useFetch';

const Home: NextPage = () => {
  const [data] = useFetch('https://api.spacexdata.com/v4/launches');

  return (
    <div>
      {!data ? <Loading></Loading> : <LaunchList launchesList={data} />}
    </div>
  );
};

export default Home;
