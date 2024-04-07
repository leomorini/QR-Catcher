import Colors from '@/constants/Colors';
import { useColorScheme } from './useColorScheme';

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  color?: keyof typeof Colors.light & keyof typeof Colors.dark;
};

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

