export const colors = {
  light: {
    blue: "#4897be",
    green: "#50b387",
    yellow: "#fbc64a",
    red: "#c06172",
    orange: "#f79c83",
    rose: "#bf5894",
    violet: "#8a3890",
    purple: "#8b98ee",
  },
  dark: {
    blue: "#2e8fc0",
    green: "#40A578",
    yellow: "#fbc64a",
    red: "#BB304A",
    orange: "#f97a57",
    rose: "#B51B75",
    violet: "#8e1e92",
    purple: "#615EFC",
  }
};

export const modeColors = {
  light: {
    ...colors.light,
    background: "#F9F4F0",
    foreground: "#FFFFFF",
    foreground2: "#F6F7F9",
    border: "#F6F7F9",
    text: "#0B0B0B",
    text2: "#979191",
    highlighted: "#8f8d88",
    highlightedColored: colors.light.red,
    navIconBackground: colors.dark.red,
    linkedin: "#0e76a8",
    github: "#181616",
    gray: "#41434F",
  },
  dark: {
    ...colors.dark,
    background: "#050505",
    foreground: "#17181C",
    foreground2: "#201F23",
    border: "#201F23",
    text: "#F9FAFD",
    text2: "#8E8E97",
    highlighted: "#41434F",
    highlightedColored: colors.dark.red,
    navIconBackground: colors.light.red,
    linkedin: "#1499d6",
    github: "#F9FAFD",
    gray: "#41434F",
  },
};

export type ColorsType = keyof typeof colors.light & keyof typeof colors.dark;
export type ThemeColorsType = keyof typeof modeColors.light & keyof typeof modeColors.dark;
export type ThemeType = typeof modeColors.light & typeof modeColors.dark;
