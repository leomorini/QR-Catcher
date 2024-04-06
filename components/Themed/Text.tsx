import { Text as DefaultComponent, TextStyle } from "react-native";
import { ThemeProps, useThemeColor } from "@/styles";
export type ComponentProps = ThemeProps & DefaultComponent["props"];

export default function Text(props: ComponentProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <DefaultComponent
      style={[{ color }, defaultStyle, style]}
      {...otherProps}
    />
  );
}

const defaultStyle: TextStyle = {
  fontSize: 15,
};
