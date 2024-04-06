import { View as DefaultComponent } from 'react-native';
import { ThemeProps, useThemeColor } from '@/styles';
export type ComponentProps = ThemeProps & DefaultComponent['props'];


export default function View(props: ComponentProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultComponent style={[{ backgroundColor }, style]} {...otherProps} />;
}
