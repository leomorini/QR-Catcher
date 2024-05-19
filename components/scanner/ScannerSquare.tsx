import { useContext } from "react";
import { dimensions } from "@/styles/dimensions";
import { TextThemed, ViewThemed } from "../Themed";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Divider from "../Themed/Divider";
import ThemeContext from "@/styles";
import { useTranslation } from "react-i18next";

export function ScannerSquare() {
  const { themeColors } = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <ViewThemed style={styles.container}>
      <View
        style={[styles.square, { borderColor: themeColors.highlightedColored }]}
      >
        <TextThemed
          bold
          style={[
            styles.text,
            { color: "white" },
            { textShadowColor: themeColors.highlightedColored },
          ]}
        >
          {t("SCANNER_SQUARE_Target the QR Code or Barcode")}
        </TextThemed>
      </View>
    </ViewThemed>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  square: {
    position: "relative",
    height: "50%",
    width: "85%",
    marginVertical: dimensions.margin.md,
    backgroundColor: "transparent",
    borderRadius: dimensions.radius.xl,
    borderWidth: dimensions.border.md,
    borderStyle: "dashed",
  },
  text: {
    position: "absolute",
    top: -100,
    left: 0,
    right: 0,
    fontSize: 22,
    textAlign: "center",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    marginBottom: dimensions.margin.lg,
    marginHorizontal: dimensions.margin.lg,
  },
});
