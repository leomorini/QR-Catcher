import { getThemeColors } from "@/styles";
import { View, TouchableOpacity } from "react-native";

export function NavButton({ children, accessibilityState, ...rest }: any) {
  const selected =
    typeof accessibilityState == "object" && accessibilityState.selected;

  const colorsTheme = getThemeColors();
  return (
    <TouchableOpacity {...rest}>
      <View
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
}
