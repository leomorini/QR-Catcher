const colors = {
  orange: "#BC7F7F",
  blue: "#3BB3BD",
  green: "#7FBC8C",
  green2: "#7FA6BC",
  yellow: "#FFC700",
  yellow2: "#BCA47F",
  purple: "#746BEB",
  purple2: "#A17FBC",
};

export default {
  light: {
    bg: "#F9F4F0",
    bgComponents: "#FFFFFF",
    text: "#000000",
    border: "#000000",
    highlighted: "#000000",
    highlightedColored: colors.purple,
    ...colors,
  },
  dark: {
    bg: "#161616",
    bgComponents: "#000000",
    text: "#FFFFFF",
    border: "#FFFFFF",
    highlighted: "#2C2C2C",
    highlightedColored: colors.purple,
    ...colors,
  },
};
