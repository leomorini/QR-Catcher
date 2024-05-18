import React, { createContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import {
  ThemeColorsType,
  ThemeType,
  ColorsType,
  colors,
  modeColors,
} from "@/styles/colors";
import { borderDimension, sizeDimension } from "./dimensions";
import { _loadData, _storeData } from "@/services/api";

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
  fixed: false,
  mode: "light",
  color: "red",
  themeColors: modeColors["light"],
  setAutoMode: () => false,
  setFixedMode: (mode: ThemeModeType) => "light",
  setAccentColor: (color: ColorsType) => "red",
});

const getColorScheme = () => {
  const colorScheme = useColorScheme();
  return colorScheme || "light";
};

export const ThemeProvider = ({ children }: any) => {
  const colorScheme: ThemeModeType = getColorScheme();
  const [fixed, setFixed] = useState<boolean>(false);
  const [mode, setMode] = useState<ThemeModeType>(colorScheme);
  const [color, setColor] = useState<ColorsType>("red");
  const [themeColors, setThemeColors] = useState<ThemeType>(modeColors[mode]);

  // Load saved theme config
  useEffect(() => {
    loadTheme();
  }, []);

  /** Update theme automatic */
  useEffect(() => {
    // set theme to system selected theme
    if (!fixed) setAutoMode();
  }, [colorScheme]);

  // save theme local
  const saveTheme = () => {
    const theme = {
      fixed,
      mode,
      color,
    };

    _storeData("theme", theme);
  };

  // load theme local saved
  const loadTheme = async () => {
    const theme: any = await _loadData("theme");
    if (!!theme) {
      const { fixed, mode, color } = theme;
      if (!!fixed) setFixed(fixed);
      if (!!mode) setMode(mode);
      if (!!color) setColor(color);
    }
  };

  const setFixedMode = (fixedMode: ThemeModeType) => {
    setThemeColors(modeColors[fixedMode]);
    setFixed(true);
    setMode(fixedMode);
    saveTheme();
  };

  const setAccentColor = (accentColor: ColorsType) => {
    const colorValue = colors[accentColor];
    const newThemeColors = {
      ...themeColors,
      highlightedColored: colorValue,
      navIconBackground: colorValue,
    };

    setColor(accentColor);
    setThemeColors(newThemeColors);
    saveTheme();
  };

  const setAutoMode = () => {
    setFixed(false);
    setThemeColors(modeColors[colorScheme]);
    saveTheme();
  };

  return (
    <ThemeContext.Provider
      value={{
        fixed,
        mode,
        color,
        themeColors,
        setAutoMode,
        setFixedMode,
        setAccentColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeContext;
