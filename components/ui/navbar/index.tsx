import Image from 'next/legacy/image';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

import styles from './navbar.module.scss';

function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  const toggleTheme = () =>
    theme === 'light' ? setTheme('dark') : setTheme('light');

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Image
          src={'/SpaceX_Logo_Black.png'}
          alt="SpaceX logo"
          objectFit="contain"
          height={50}
          width={150}
        />
        <button onClick={toggleTheme}>ClickMe</button>
      </div>
    </header>
  );
}

export default Header;
