import { StyleSheet, View, ViewProps } from "react-native";
import { ThemeColorsType } from "@/styles/colors";
import { dimensions } from "@/styles/dimensions";

interface MyProps {
  focused?: boolean;
  background?: ThemeColorsType;
}

export type TabBarIconProps = MyProps & ViewProps;

export default function TabBarIcon({
  focused,
  background,
  children,
}: TabBarIconProps) {
  return <View style={[styles.container]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
  },
});
