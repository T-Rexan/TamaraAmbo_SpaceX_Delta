import { useTheme } from 'next-themes';
import React from 'react';

function NavBar() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () =>
    theme === 'light' ? setTheme('dark') : setTheme('light');

  return <button onClick={toggleTheme}>ClickMe</button>;
}

export default NavBar;
