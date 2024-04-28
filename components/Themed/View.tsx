import { View as DefaultComponent } from "react-native";
import { ThemeProps, getBrutalismBorder, getThemeColors } from "@/styles";

interface MyProps {
  brutalism?: boolean;
}

export type ComponentProps = MyProps & ThemeProps & DefaultComponent["props"];

export default function View(props: ComponentProps) {
  const {
    color = "bgComponents",
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
        brutalism ? getBrutalismBorder(colors[borderColor], borderWidth) : {},
        style,
      ]}
      {...otherProps}
    />
  );
}
