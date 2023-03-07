import React, { createContext, useContext, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  toggleTheme: () => {},
});

function ThemeProvider(props: React.PropsWithChildren<{}>) {
  const [theme, setTheme] = useState<Theme>(() => {
    let storedTheme: Theme | null = null;
    if (typeof window !== 'undefined') {
      storedTheme = localStorage.getItem('theme') as Theme | null;
    }

    return storedTheme || 'light';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
  };

  const value: ThemeContextProps = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  return useContext(ThemeContext);
}

export { ThemeProvider, useTheme };
