import { useContext } from "react";
import { Text as DefaultComponent } from "react-native";
import ThemeContext, { ThemeProps } from "@/styles";

interface MyProps {
  bold?: boolean;
}

export type ComponentProps = MyProps & ThemeProps & DefaultComponent["props"];

export default function Text(props: ComponentProps) {
  const { themeColors } = useContext(ThemeContext);
  const { style, color = "text", bold = false, ...otherProps } = props;

  const fontFamily = bold ? "FontBold" : "FontRegular";

  return (
    <DefaultComponent
      style={[{ color: themeColors[color], fontFamily, fontSize: 14 }, style]}
      {...otherProps}
    />
  );
}
