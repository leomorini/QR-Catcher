import { useContext } from "react";
import { dimensions } from "@/styles/dimensions";
import { ButtonThemed, TextThemed, ViewThemed } from "../Themed";
import { StyleSheet, View } from "react-native";
import Ripple from "react-native-material-ripple";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import Divider from "../Themed/Divider";
import ThemeContext from "@/styles";
import { useTranslation } from "react-i18next";

interface MyProps {
  handleUploadImage: Function;
  handleFacing: Function;
}

export function ScannerActions({ handleUploadImage, handleFacing }: MyProps) {
  const { themeColors } = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <ViewThemed
      style={[styles.camActions, { borderColor: themeColors.highlighted }]}
    >
      <ButtonThemed
        onPress={() => handleUploadImage()}
        containerStyle={{ flex: 1 }}
        style={styles.camAction}
      >
        <View style={styles.camActionBody}>
          <TextThemed style={styles.camActionBodyText}>
            {t("SCANNER_ACTIONS_Search in")}
          </TextThemed>
          <View style={styles.camActionContent}>
            <Feather
              style={{ marginRight: dimensions.margin.sm }}
              name="image"
              size={22}
              color={themeColors.highlightedColored}
            />
            <TextThemed
              bold
              color="highlightedColored"
              style={styles.camActionContentText}
            >
              {t("SCANNER_ACTIONS_Image")}
            </TextThemed>
          </View>
        </View>
      </ButtonThemed>

      <Divider size="sm" mode="vertical" color="highlighted" />

      <ButtonThemed
        onPress={() => handleFacing()}
        containerStyle={{ flex: 1 }}
        style={styles.camAction}
      >
        <View style={styles.camActionBody}>
          <TextThemed style={styles.camActionBodyText}>
            {t("SCANNER_ACTIONS_Invert the")}
          </TextThemed>
          <View style={styles.camActionContent}>
            <MaterialCommunityIcons
              style={{ marginRight: dimensions.margin.sm }}
              name="camera-retake-outline"
              size={26}
              color={themeColors.highlightedColored}
            />
            <TextThemed
              color="highlightedColored"
              bold
              style={styles.camActionContentText}
            >
              {t("SCANNER_ACTIONS_Camera")}
            </TextThemed>
          </View>
        </View>
      </ButtonThemed>
    </ViewThemed>
  );
}

const styles = StyleSheet.create({
  camActions: {
    height: 75,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: dimensions.radius.lg,
    borderWidth: dimensions.border.sm,
  },
  camAction: {
    display: "flex",
    flex: 1,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  camActionBody: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
  camActionContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  camActionBodyText: {
    fontSize: 10,
  },
  camActionContentText: {
    fontSize: 16,
  },
});
