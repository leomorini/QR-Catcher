import { useContext } from "react";
import { View as DefaultComponent } from "react-native";
import ThemeContext, { ThemeProps } from "@/styles";

interface MyProps {
  brutalism?: boolean;
}

export type ComponentProps = MyProps & ThemeProps & DefaultComponent["props"];

export default function View(props: ComponentProps) {
  const { themeColors } = useContext(ThemeContext);

  const {
    color = "foreground",
    borderColor = "border",
    borderWidth = "md",
    brutalism = false,
    style,
    ...otherProps
  } = props;

  return (
    <DefaultComponent
      style={[
        { backgroundColor: themeColors[color], overflow: "hidden" },
        style,
      ]}
      {...otherProps}
    />
  );
}
