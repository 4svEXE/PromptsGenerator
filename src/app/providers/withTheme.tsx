import React, { useEffect, ReactNode } from "react";
import { useLocalStorage } from "usehooks-ts";
import classNames from "classnames";

interface WithThemeProps {
  children: (props: { toggleTheme: () => void }) => ReactNode;
}

const WithTheme: React.FC<WithThemeProps> = ({ children }) => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const storedTheme = window.localStorage.getItem("darkTheme");

  const [darkTheme, setDarkTheme] = useLocalStorage<boolean>(
    "darkTheme",
    storedTheme !== null ? JSON.parse(storedTheme) : prefersDark
  );

  useEffect(() => {
    window.localStorage.setItem("darkTheme", JSON.stringify(darkTheme));
  }, [darkTheme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setDarkTheme(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const toggleTheme = () => {
    setDarkTheme((theme) => !theme);
  };

  return (
    <div
      className={classNames({
        dark: darkTheme,
      })}
    >
      {children({ toggleTheme })}
    </div>
  );
};

export default WithTheme;
