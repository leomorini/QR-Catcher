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

export function getScreenOptionsStyle() {
  const colorsTheme = getThemeColors();
  const iconColorSelected = colorsTheme.tabIconSelected;
  const borderWidthThemed = {
    ...borderWidthTheme,
    borderColor: colorsTheme.text,
  }

  return {
    headerShown: false,
    tabBarActiveTintColor: colorsTheme.tint,
    tabBarInactiveTintColor: colorsTheme.tabIconDefault,
    tabBarStyle: {
      height: 70,
      backgroundColor: colorsTheme.background,
      borderColor: 'transparent',
      ...shadowNoneTheme,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: "bold",
      marginBottom: 8,
    },
    tabBarIconStyle: {
      marginTop: 8,
    },
    tabBarItemStyle: {
    },
  };
}

const borderWidthTheme = {
  borderRadius: 5,
  borderWidth: 1,
  borderBottomWidth: 3,
}

const shadowTheme = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 8,
  },
  shadowOpacity: 0.44,
  shadowRadius: 10.32,
  elevation: 16,
}

const shadowNoneTheme = {
  shadowColor: "transparent",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0,
  shadowRadius: 0,
  elevation: 0,
}