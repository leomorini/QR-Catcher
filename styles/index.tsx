import React, { createContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import {
  ThemeColorsType,
  ThemeType,
  ColorsType,
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

interface initialContextType {
  fixed: boolean;
  mode: ThemeModeType;
  color: ColorsType;
  themeColors: ThemeType;
  setAutoMode: () => void;
  setFixedMode: (mode: ThemeModeType) => void;
  setAccentColor: (color: ColorsType) => void;
}

const initialContext: initialContextType = {
  fixed: false,
  mode: "light",
  color: "red",
  themeColors: modeColors["light"],
  setAutoMode: () => false,
  setFixedMode: (mode: ThemeModeType) => "light",
  setAccentColor: (color: ColorsType) => "red",
};

const ThemeContext = createContext(initialContext);

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
      setThemeColors(getNewThemeColors(mode, color));
    }
  };

  function getNewThemeColors(newMode: ThemeModeType, newColor: ColorsType) {
    const newThemeColors = modeColors[newMode];
    const colorValue = newThemeColors[newColor];
    newThemeColors.highlightedColored = colorValue;
    newThemeColors.navIconBackground = colorValue;
    return newThemeColors;
  }

  const setFixedMode = (fixedMode: ThemeModeType) => {
    setFixed(true);
    setThemeColors(getNewThemeColors(fixedMode, color));
    setMode(fixedMode);
  };

  const setAccentColor = (accentColor: ColorsType) => {
    setColor(accentColor);
    setThemeColors(getNewThemeColors(fixed ? mode : colorScheme, accentColor));
    saveTheme();
  };

  const setAutoMode = () => {
    setFixed(false);
    setMode(colorScheme);
    setThemeColors(getNewThemeColors(colorScheme, color));
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
