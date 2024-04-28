import { getThemeColors } from "@/styles";
import { View, TouchableOpacity } from "react-native";

export function NavButton({ children, accessibilityState, ...rest }: any) {
  const selected =
    typeof accessibilityState == "object" && accessibilityState.selected;

    const colorsTheme = getThemeColors();
  return (
    <TouchableOpacity {...rest}>
      <View className={`flex-1 flex flex-row items-center justify-center`}>
        {children}
      </View>
    </TouchableOpacity>
  );
}
