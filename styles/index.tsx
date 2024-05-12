import { useThemeStore } from "@/data/theme";
import { useColorScheme } from "./useColorScheme";
import { colors, themeColors } from "./colors";
import { borderDimension, sizeDimension } from "./dimensions";

export type ThemeModeType = "light" | "dark";
export type ColorsType = keyof typeof colors;
export type ThemeColorsType = keyof typeof themeColors.light & keyof typeof themeColors.dark;

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  color?: ThemeColorsType;
  borderColor?: ThemeColorsType;
  borderWidth?: borderDimension;
  size?: sizeDimension;
};

function getPhoneThemeMode() {
  return useColorScheme() || "light";
}

export function getThemeColors() {
  const themeStore = useThemeStore();
  const themeMode: ThemeModeType = themeStore.theme.fixed
    ? themeStore.theme.mode
    : getPhoneThemeMode(); // if theme is fixed by user

  let theme = themeColors[themeMode];
  if (themeStore.theme.colored) {
    theme.highlightedColored = themeStore.theme.colored; // if theme color highlighted is selected by user
    theme.navIconBackground = themeStore.theme.colored; // if theme color highlighted is selected by user
  }
  return theme;
}

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
