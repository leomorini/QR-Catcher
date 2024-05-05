const colors = {
  orange: "#BC7F7F",
  blue: "#3BB3BD",
  green: "#7FBC8C",
  green2: "#7FA6BC",
  yellow: "#FFC700",
  yellow2: "#BCA47F",
  purple: "#857ee4",
  purple2: "#A17FBC",
};

export default {
  light: {
    background: "#F9F4F0",
    foreground: "#FFFFFF",
    foreground2: "#F6F7F9",
    border: "#F6F7F9",
    text: "#0B0B0B",
    text2: "#727175",
    highlighted: "#41434F",
    highlightedColored: colors.purple,
    ...colors,
  },
  dark: {
    background: "#050505",
    foreground: "#17181C",
    foreground2: "#201F23",
    border: "#201F23",
    text: "#F9FAFD",
    text2: "#8E8E97",
    highlighted: "#41434F",
    highlightedColored: colors.purple,
    ...colors,
  },
};
