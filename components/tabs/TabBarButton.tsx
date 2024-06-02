import { StyleSheet, Text, View, ViewProps } from "react-native";
import { ThemeColorsType } from "@/styles/colors";
import { dimensions } from "@/styles/dimensions";
import { ButtonThemed } from "../Themed";

interface MyProps {
  focused?: boolean;
  background?: ThemeColorsType;
}

export type TabBarIconProps = MyProps & ViewProps;

export default function TabBarButton({ children, ...restProps }: any) {
  return <ButtonThemed containerStyle={styles.button} style={styles.button} {...restProps}>{children}</ButtonThemed>;
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    width: "100%",
  }
});

