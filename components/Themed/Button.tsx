import {
  TouchableOpacity as DefaultComponent,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { ThemeProps, useThemeColor } from "@/styles";
export type ComponentProps = ThemeProps & DefaultComponent["props"];

export default function Button(props: ComponentProps) {
  const {
    style,
    lightColor,
    darkColor,
    color = "background2",
    className = "",
    ...otherProps
  } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    color
  );

  return (
    <DefaultComponent
      className={`px-1 py-2 rounded-md items-center justify-center ${className}`}
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  );
}
