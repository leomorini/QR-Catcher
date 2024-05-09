const allColors = {
  linkedin: "#0e76a8",
  github: "#181616",
};

const colorsLight = {
  ...allColors,
  red: "#BB304A",
  orange: "#f97a57",
  blue: "#3BB3BD",
  green: "#7FBC8C",
  green2: "#7FA6BC",
  yellow: "#dca121",
  yellow2: "#BCA47F",
  purple: "#857ee4",
  purple2: "#A17FBC",
};

const colorsDark = {
  ...allColors,
  red: "#BB304A",
  orange: "#cf6e3d",
  blue: "#43c3cf",
  green: "#8dd19c",
  green2: "#88b3cb",
  yellow: "#E8B74C",
  yellow2: "#d5ba92",
  purple: "#c6c4ff",
  purple2: "#b28dd1",
};

const selected = "yellow";

export default {
  light: {
    ...colorsLight,
    background: "#F9F4F0",
    foreground: "#FFFFFF",
    foreground2: "#F6F7F9",
    border: "#F6F7F9",
    text: "#0B0B0B",
    text2: "#979191",
    highlighted: "#8f8d88",
    highlightedColored: colorsLight[selected],
    navIconBackground: colorsDark[selected],
  },
  dark: {
    ...colorsDark,
    background: "#050505",
    foreground: "#17181C",
    foreground2: "#201F23",
    border: "#201F23",
    text: "#F9FAFD",
    text2: "#8E8E97",
    highlighted: "#41434F",
    highlightedColored: colorsDark[selected],
    navIconBackground: colorsLight[selected],
  },
};
