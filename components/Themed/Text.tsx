import { Text as DefaultComponent } from "react-native";
import { ThemeProps, useThemeColor } from "@/styles";
export type ComponentProps = ThemeProps & DefaultComponent["props"];

export default function Text(props: ComponentProps) {
  const { style, lightColor, darkColor, className = "", ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <DefaultComponent
      className={`text-md ${className}`}
      style={[{ color }, style]}
      {...otherProps}
    />
  );
}
