import { View as DefaultComponent } from "react-native";
import { ThemeProps, getThemeColors } from "@/styles";

interface MyProps {
  brutalism?: boolean;
}

export type ComponentProps = MyProps & ThemeProps & DefaultComponent["props"];

export default function View(props: ComponentProps) {
  const {
    color = "foreground",
    borderColor = "border",
    borderWidth = "md",
    brutalism = false,
    style,
    ...otherProps
  } = props;

  const colors = getThemeColors();

  return (
    <DefaultComponent
      style={[
        { backgroundColor: colors[color], overflow: "hidden" },
        style,
      ]}
      {...otherProps}
    />
  );
}
