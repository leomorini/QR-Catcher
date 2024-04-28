import { useColorScheme } from "./useColorScheme";
import colors from "./colors";
import dimensions, { borderDimension } from "./dimensions";

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  color?: keyof typeof colors.light & keyof typeof colors.dark;
  borderColor?: keyof typeof colors.light & keyof typeof colors.dark;
  borderWidth?: borderDimension;
};

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof colors.light & keyof typeof colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return colors[theme][colorName];
  }
}

export function getThemeColors() {
  const colorScheme = useColorScheme();
  return colors[colorScheme ?? "light"];
}

export function borderBrutalismStyle(size: borderDimension = "md") {
  const borderWidth = dimensions.border[size];
  const borderRadius = dimensions.borderRadius[size];

  return {
    borderTopWidth: borderWidth,
    borderLeftWidth: borderWidth,
    borderRightWidth: borderWidth,
    borderBottomWidth: borderWidth,
    borderRadius,
  };
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

export function getBrutalismBorder(
  color: string = "",
  borderWidth: borderDimension = "md"
) {
  return {
    ...borderBrutalismStyle(borderWidth),
    borderColor: color,
  };
}
