import { useContext, useState } from "react";
import { TouchableNativeFeedback, View, ViewStyle } from "react-native";
import ThemeContext, { ThemeProps } from "@/styles";
import { ThemeType } from "@/styles/colors";

type MyProps = {
  transparent?: boolean;
  borderRadius?: number;
  rippleColor?: string | null;
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
    rippleColor = null,
    ...otherProps
  } = props;

  return (
    <View style={[{ borderRadius, overflow: "hidden" }, containerStyle]}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(
          rippleColor || themeColors.highlightedColored,
          false
        )}
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
