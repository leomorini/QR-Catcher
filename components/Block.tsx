import { StyleSheet } from "react-native";
import { ViewThemed, ViewThemedProps } from "./Themed";
import globalStyles from "@/styles/globalStyles";

export type BlockProps = MyProps & ViewThemedProps;

export default function Block({ children, style }: BlockProps) {
  return (
    <ViewThemed
      style={}
    >
      {children}
    </ViewThemed>
  );
}
