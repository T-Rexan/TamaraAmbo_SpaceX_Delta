import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { NextPage } from 'next';
import useFetch from '@/hooks/useFetch';

const Home: NextPage = () => {
  const [data] = useFetch('https://api.spacexdata.com/v4/launches');
  console.log(data);

  return <div>Test</div>;
};
export default Home;
