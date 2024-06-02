import { useContext, useState } from "react";
import { TouchableNativeFeedback, View, ViewStyle } from "react-native";
import ThemeContext, { ThemeProps } from "@/styles";

type MyProps = {
  transparent?: boolean;
  borderRadius?: number;
  rippleColor?: string;
  rippleOverflow?: boolean;
  containerStyle?: ViewStyle;
  style?: ViewStyle;
};

export type ComponentProps = MyProps &
  ThemeProps &
  TouchableNativeFeedback["props"];

export default function Button(props: ComponentProps) {
  const { themeColors } = useContext(ThemeContext);

  const {
    transparent = false,
    color = "foreground",
    borderColor = "border",
    borderRadius = 0,
    containerStyle = {},
    style,
    children,
    rippleColor = themeColors.highlightedColored,
    ...otherProps
  } = props;

  return (
    <View style={[{ borderRadius, overflow: "hidden" }, containerStyle]}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(rippleColor, false)}
        {...otherProps}
      >
        <View
          style={[
            {
              backgroundColor: transparent ? "transparent" : themeColors[color],
              borderRadius,
              overflow: "hidden",
            },
            style,
          ]}
        >
          {children}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}
