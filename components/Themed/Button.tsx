import { TouchableOpacity as DefaultComponent, View } from "react-native";
import { ThemeProps, getThemeColors } from "@/styles";

export type ComponentProps = ThemeProps & DefaultComponent["props"];

export default function Button(props: ComponentProps) {
  const {
    color = "foreground",
    borderColor = "border",
    style,
    children,
    ...otherProps
  } = props;

  const colors = getThemeColors();

  return (
    <DefaultComponent {...otherProps}>
      <View
        style={[{ backgroundColor: colors[color], overflow: "hidden" }, style]}
      >
        {children}
      </View>
    </DefaultComponent>
  );
}
