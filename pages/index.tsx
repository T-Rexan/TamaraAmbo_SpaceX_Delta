import { NextPage } from 'next';

import useFetch from '@/hooks/useFetch';

const Home: NextPage = () => {
  const [data] = useFetch('https://api.spacexdata.com/v4/launches');

  return <div>Test</div>;
};
export default Home;
