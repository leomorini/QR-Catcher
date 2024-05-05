import { useColorScheme } from "./useColorScheme";
import colors from "./colors";
import { dimensions, borderDimension, sizeDimension } from "./dimensions";

export type ColorType = keyof typeof colors.light & keyof typeof colors.dark;
export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  color?: ColorType;
  borderColor?: ColorType;
  borderWidth?: borderDimension;
  size?: sizeDimension;
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

export function borderBrutalismStyle(
  size: borderDimension = "md",
  rounded: boolean = true
) {
  const borderWidth = dimensions.border[size];
  let style: any = {
    borderTopWidth: borderWidth,
    borderLeftWidth: borderWidth,
    borderRightWidth: borderWidth,
    borderBottomWidth: borderWidth,
  };

  if (rounded) {
    style.borderRadius = dimensions.radius[size];
  }

  return style;
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
  borderWidth: borderDimension = "md",
  rounded: boolean = true
) {
  return {
    ...borderBrutalismStyle(borderWidth, rounded),
    borderColor: color,
  };
}
