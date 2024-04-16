import {
  TouchableOpacity as DefaultComponent,
  View,
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
    children,
    ...otherProps
  } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    color
  );

  return (
    <DefaultComponent {...otherProps}>
      <View
        className={`${className}`}
        style={[{ backgroundColor }, style]}
      >
        {children}
      </View>
    </DefaultComponent>
  );
}
