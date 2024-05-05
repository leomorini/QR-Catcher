import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  flex: {
    display: "flex",
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  flex4: {
    flex: 4,
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
  alignItemsStart: {
    alignItems: "flex-start",
  },
  alignItemsCenter: {
    alignItems: "center",
  },
  alignItemsEnd: {
    alignItems: "flex-end",
  },
  justifyContentStart: {
    justifyContent: "flex-start",
  },
  justifyContentCenter: {
    justifyContent: "center",
  },
  justifyContentEnd: {
    justifyContent: "flex-end",
  },
  justifyContentBetween: {
    justifyContent: "space-between",
  },
});

export default globalStyles;
