import { useTheme } from 'next-themes';
import { FC, useEffect, useState } from 'react';

import styles from './toggle.module.scss';

const ToggleButton: FC = () => {
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
    <label className={styles.toggle}>
      <input type="checkbox" onClick={toggleTheme} checked={theme === 'dark'} />
      <span className={styles.slider}></span>
    </label>
  );
};

export default ToggleButton;
