import { useContext } from "react";
import { View as DefaultComponent, StyleSheet } from "react-native";
import { dimensions, sizeDimension } from "@/styles/dimensions";
import ThemeContext, { ThemeProps } from "@/styles";

interface MyProps {
  mode?: string;
}

export type ComponentProps = MyProps & ThemeProps & DefaultComponent["props"];

export default function Divider(props: ComponentProps) {
  const { themeColors } = useContext(ThemeContext);

  const {
    color = "foreground",
    size = "md",
    mode = "horizontal",
    style,
    ...otherProps
  } = props;

  const dividerStyle: any = getDividerStyle(size, themeColors[color]);
  const myStyle = dividerStyle[mode];
  return <DefaultComponent style={[myStyle, style]} {...otherProps} />;
}

function getDividerStyle(size: sizeDimension, color: string) {
  return StyleSheet.create({
    vertical: {
      width: dimensions.border[size],
      height: "100%",
      backgroundColor: color,
    },
    horizontal: {
      width: "100%",
      height: dimensions.border[size],
      backgroundColor: color,
    },
  });
}
