import { StyleSheet, View, ViewProps } from "react-native";
import { ColorType } from "@/styles";

interface MyProps {
  focused: boolean;
  background: ColorType;
}

export type TabBarIconProps = MyProps & ViewProps;

export default function TabBarIcon({
  focused,
  background,
  children,
}: TabBarIconProps) {
  return (
    <View
      style={[styles.container, focused && { backgroundColor: background }]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: "transparent",
    borderRadius: 5
  },
});
