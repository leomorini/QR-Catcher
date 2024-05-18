export const colors = {
  red: "#BB304A",
  orange: "#f97a57",
  blue: "#3BB3BD",
  green: "#7FBC8C",
  green2: "#7FA6BC",
  yellow: "#dca121",
  yellow2: "#BCA47F",
  purple_light: "#857ee4",
  purple2: "#A17FBC",
};

export const modeColors = {
  light: {
    ...colors,
    background: "#F9F4F0",
    foreground: "#FFFFFF",
    foreground2: "#F6F7F9",
    border: "#F6F7F9",
    text: "#0B0B0B",
    text2: "#979191",
    highlighted: "#8f8d88",
    highlightedColored: colors.red,
    navIconBackground: colors.red,
    linkedin: "#0e76a8",
    github: "#181616",
  },
  dark: {
    ...colors,
    background: "#050505",
    foreground: "#17181C",
    foreground2: "#201F23",
    border: "#201F23",
    text: "#F9FAFD",
    text2: "#8E8E97",
    highlighted: "#41434F",
    highlightedColored: colors.red,
    navIconBackground: colors.red,
    linkedin: "#1499d6",
    github: "#F9FAFD",
  },
};

export type ColorsType = keyof typeof colors;
export type ThemeColorsType = keyof typeof modeColors.light & keyof typeof modeColors.dark;
export type ThemeType = typeof modeColors.light & typeof modeColors.dark;
