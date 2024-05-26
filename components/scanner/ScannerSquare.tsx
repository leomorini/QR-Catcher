import { useContext } from "react";
import { dimensions } from "@/styles/dimensions";
import { TextThemed, ViewThemed } from "../Themed";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Divider from "../Themed/Divider";
import ThemeContext from "@/styles";
import { useTranslation } from "react-i18next";

export function ScannerSquare({ children }: any) {
  const { themeColors } = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <ViewThemed style={styles.container}>
      <View style={[styles.square, { top: 0, borderBottomWidth: 1, borderColor: themeColors.gray }]}>
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

      <View style={[styles.square, { bottom: 0, borderTopWidth: 1, borderColor: themeColors.gray }]}>
        {children}
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
    position: "absolute",
    left: 0,
    right: 0,
    height: "20%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingHorizontal: dimensions.padding.lg,
  },
  text: {
    marginTop: dimensions.margin.md,
    fontSize: 20,
    textAlign: "center",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    marginHorizontal: dimensions.margin.lg,
  },
});
