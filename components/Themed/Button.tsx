import { TouchableOpacity as DefaultComponent, View } from "react-native";
import { ThemeProps, getBrutalismBorder, getThemeColors } from "@/styles";

interface MyProps {
  brutalism?: boolean;
}

export type ComponentProps = MyProps & ThemeProps & DefaultComponent["props"];

export default function Button(props: ComponentProps) {
  const {
    color = "bgComponents",
    borderColor = "border",
    brutalism,
    style,
    children,
    ...otherProps
  } = props;

  const colors = getThemeColors();

  return (
    <DefaultComponent {...otherProps}>
      <View
        style={[
          { backgroundColor: colors[color], overflow: "hidden" },
          brutalism ? getBrutalismBorder(colors[borderColor]) : {},
          style,
        ]}
      >
        {children}
      </View>
    </DefaultComponent>
  );
}
