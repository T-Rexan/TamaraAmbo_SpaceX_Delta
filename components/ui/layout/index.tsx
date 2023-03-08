import Head from 'next/head';
import { FC } from 'react';

import Footer from '../footer';
import Header from '../header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="main-container">
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
