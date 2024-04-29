import { View as DefaultComponent, StyleSheet } from "react-native";
import { ThemeProps, getThemeColors } from "@/styles";
import { dimensions, sizeDimension } from "@/styles/dimensions";

interface MyProps {
  mode?: string;
}

export type ComponentProps = MyProps & ThemeProps & DefaultComponent["props"];

export default function Divider(props: ComponentProps) {
  const {
    color = "bgComponents",
    size = "md",
    mode = "horizontal",
    style,
    ...otherProps
  } = props;

  const colors = getThemeColors();
  const dividerStyle: any = getDividerStyle(size, colors[color]);
  const myStyle = dividerStyle[mode];
  return <DefaultComponent style={[myStyle, style]} {...otherProps} />;
}

function getDividerStyle(size: sizeDimension, color: string) {
  return StyleSheet.create({
    vertical: {
      width: dimensions.size[size],
      height: "100%",
      backgroundColor: color,
    },
    horizontal: {
      width: "100%",
      height: dimensions.size[size],
      backgroundColor: color,
    },
  });
}
