import { StyleSheet, View, ViewProps } from "react-native";

export default function TabBarIcon({ children }: ViewProps) {
  return <View style={[styles.container]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
  },
});
