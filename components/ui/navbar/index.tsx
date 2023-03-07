import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

function NavBar() {
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

  return <button onClick={toggleTheme}>ClickMe</button>;
}

export default NavBar;
