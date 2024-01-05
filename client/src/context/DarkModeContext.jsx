import { createContext, useContext, useEffect } from 'react';
import { useCookieState } from '../hooks/useCookieState.js';

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useCookieState(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
    'isDarkMode'
  );

  useEffect(
    function () {
      const main = document.querySelector('main');
      if (!main) return;

      if (isDarkMode) {
        main.classList.remove('light-mode');
      } else {
        main.classList.add('light-mode');
      }
    },
    [isDarkMode]
  );

  function toggleDarkMode() {
    setIsDarkMode(current => !current);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error('DarkModeContext must be used within a DarkModeProvider');

  return context;
}

export { DarkModeProvider, useDarkMode };
