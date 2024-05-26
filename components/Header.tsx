import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LogoTextSvg from "./svg/LogoTextSvg";
import { dimensions } from "@/styles/dimensions";
import ThemeContext from "@/styles";

export type HeaderProps = {
  fixed?: boolean;
  style?: object;
};

const paddingVertical = dimensions.padding.md;
const paddingHorizontal = dimensions.padding.md;

export default function Header({ fixed = false, style = {} }: HeaderProps) {
  const { themeColors } = useContext(ThemeContext);
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        fixed && styles.fixed,
        styles.container,
        { paddingTop: insets.top + paddingVertical },
        style,
      ]}
    >
      <LogoTextSvg
        color={themeColors.highlightedColored}
        width={200}
        height={50}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical,
    paddingHorizontal,
  },
  fixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
});
