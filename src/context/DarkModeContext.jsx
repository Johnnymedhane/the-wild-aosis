import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();
function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(window.matchMedia("(prefers-color-scheme: dark)").matches, "isDarkMode");
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark-mode");
      root.classList.remove("light-mode");
    } else {
      root.classList.add("light-mode");
      root.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((prevMode) => !prevMode);
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
    throw new Error(" DarkModeContext was used outside of its provider");
  
  return context;
}

export { useDarkMode, DarkModeProvider };
