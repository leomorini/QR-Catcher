import { Text as DefaultComponent } from "react-native";
import { ThemeProps, getThemeColors } from "@/styles";

interface MyProps {
  bold?: boolean;
}

export type ComponentProps = MyProps & ThemeProps & DefaultComponent["props"];

export default function Text(props: ComponentProps) {
  const { style, color = "text", bold = false, ...otherProps } = props;

  const colors = getThemeColors();
  const fontFamily = bold ? "InterBold" : "InterRegular";

  return (
    <DefaultComponent
      style={[{ color: colors[color], fontFamily, fontSize: 14 }, style]}
      {...otherProps}
    />
  );
}
