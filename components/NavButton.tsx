import { getThemeColors } from "@/styles";
import { View, TouchableOpacity, StyleSheet } from "react-native";

export function NavButton({ children, accessibilityState, ...rest }: any) {
  const selected =
    typeof accessibilityState == "object" && accessibilityState.selected;

  const colorsTheme = getThemeColors();
  return (
    <TouchableOpacity {...rest}>
      <View style={styles.button}>{children}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
