import React, { createContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeColorsType, ThemeType, modeColors } from "@/styles/colors";
import { borderDimension, sizeDimension } from "./dimensions";

export type ThemeModeType = "light" | "dark";

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  color?: ThemeColorsType;
  borderColor?: ThemeColorsType;
  borderWidth?: borderDimension;
  size?: sizeDimension;
};

/** style utils */
export const shadowNoneStyle = {
  shadowColor: "transparent",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0,
  shadowRadius: 0,
  elevation: 0,
};

const ThemeContext = createContext({
  theme: "light",
  themeColors: modeColors["light"],
  toggleTheme: () => false,
  useSystemTheme: () => false,
});

export const ThemeProvider = ({ children }: any) => {
  const colorScheme: any = useColorScheme();
  const [theme, setTheme] = useState<ThemeModeType>(colorScheme || "light");
  const themeColors: ThemeType = modeColors[theme];

  useEffect(() => {
    // Load saved theme from storage
    const getTheme = async () => {
      try {
        const savedTheme: any = await AsyncStorage.getItem("theme");
        if (savedTheme) {
          setTheme(savedTheme);
        }
      } catch (error) {
        console.log("Error loading theme:", error);
      }
    };
    getTheme();
  }, []);

  useEffect(() => {
    // set theme to system selected theme
    if (colorScheme) {
      setTheme(colorScheme);
    }
  }, [colorScheme]);

  const toggleTheme = (newTheme: any) => {
    setTheme(newTheme);
    AsyncStorage.setItem("theme", newTheme); // Save selected theme to storage
  };

  const useSystemTheme = () => {
    setTheme(colorScheme);
    AsyncStorage.setItem("theme", colorScheme);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, themeColors, toggleTheme, useSystemTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeContext;
