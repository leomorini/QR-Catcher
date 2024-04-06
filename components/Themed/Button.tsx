import { TouchableOpacity as DefaultComponent, StyleSheet, ViewStyle } from "react-native";
import { ThemeProps, useThemeColor } from "@/styles";
export type ComponentProps = ThemeProps & DefaultComponent["props"];

export default function Button(props: ComponentProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <DefaultComponent
      style={[{ backgroundColor }, defaultStyle, style]}
      {...otherProps}
    />
  );
}

const defaultStyle: ViewStyle = {
  padding: 20,
  borderRadius: 10,
  justifyContent: "center",
  alignItems: "center"
}
