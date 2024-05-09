import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LogoTextSvg from "./svg/LogoTextSvg";
import { dimensions } from "@/styles/dimensions";

export type HeaderProps = {
  fixed?: boolean;
};

const paddingVertical = dimensions.padding.md;
const paddingHorizontal = dimensions.padding.md;

export default function Header({ fixed = false }: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        fixed && styles.fixed,
        styles.container,
        { paddingTop: insets.top + paddingVertical },
      ]}
    >
      <LogoTextSvg />
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
