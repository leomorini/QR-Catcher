export const colors = {
  light: {
    blue: "#2e8fc0",
    cyan: "#0097A7",
    green: "#40A578",
    lightGreen: "#8BC34A",
    gold: "#FFB300",
    yellow: "#fbc64a",
    red: "#BB304A",
    orange: "#f97a57",
    pink: "#D81B60",
    rose: "#B51B75",
    violet: "#8e1e92",
    purple: "#615EFC",
    darkPurple: "#311B92",
    brown: "#795548",
    blueGray: "#607D8B"
  },
  dark: {
    blue: "#2e8fc0",
    cyan: "#0097A7",
    green: "#40A578",
    lightGreen: "#8BC34A",
    gold: "#FFB300",
    yellow: "#fbc64a",
    red: "#BB304A",
    orange: "#f97a57",
    pink: "#D81B60",
    rose: "#B51B75",
    violet: "#8e1e92",
    purple: "#615EFC",
    darkPurple: "#311B92",
    brown: "#795548",
    blueGray: "#607D8B"
  }
};

export const modeColors = {
  light: {
    ...colors.light,
    background: "#F9F4F0",
    foreground: "#FFFFFF",
    foreground2: "#F6F7F9",
    border: "#f5f1ef",
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
