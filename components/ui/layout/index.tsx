import Head from 'next/head';
import { FC } from 'react';

import Footer from '../footer';
import NavBar from '../navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <div>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
