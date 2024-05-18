import { useContext } from "react";
import { TouchableOpacity as DefaultComponent, View } from "react-native";
import ThemeContext, { ThemeProps } from "@/styles";

export type ComponentProps = ThemeProps & DefaultComponent["props"];

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
    <DefaultComponent {...otherProps}>
      <View
        style={[
          { backgroundColor: themeColors[color], overflow: "hidden" },
          style,
        ]}
      >
        {children}
      </View>
    </DefaultComponent>
  );
}
