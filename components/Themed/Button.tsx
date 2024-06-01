import { useContext } from "react";
import Ripple from "react-native-material-ripple";
import ThemeContext, { ThemeProps } from "@/styles";

export type ComponentProps = ThemeProps & Ripple["props"];

export default function Button(props: ComponentProps) {
  const { themeColors } = useContext(ThemeContext);

  const {
    color = "foreground",
    borderColor = "border",
    style,
    children,
    ...otherProps
  } = props;

  return (
    <Ripple
      rippleColor={themeColors.text}
      style={[
        { backgroundColor: themeColors[color], overflow: "hidden" },
        style,
      ]}
      {...otherProps}
    >
      {children}
    </Ripple>
  );
}
