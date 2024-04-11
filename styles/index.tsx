import { useColorScheme } from "./useColorScheme";
import colors from "./colors";

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  color?: keyof typeof colors.light & keyof typeof colors.dark;
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
