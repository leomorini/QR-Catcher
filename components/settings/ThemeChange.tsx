import { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Box from "../Box";
import ThemeContext from "@/styles";
import { ButtonThemed, TextThemed } from "../Themed";
import { ColorsType, colors } from "@/styles/colors";
import { useTranslation } from "react-i18next";
import { dimensions } from "@/styles/dimensions";
import { AntDesign } from "@expo/vector-icons";

export default function ThemeChange() {
  const { t } = useTranslation();
  const {
    fixed,
    mode,
    color,
    themeColors,
    setAutoMode,
    setFixedMode,
    setAccentColor,
  } = useContext(ThemeContext);

  const themeModes = ["auto", "dark", "light"];

  const handleMode = (themeMode: any) => {
    if (themeMode === "auto") {
      setAutoMode();
    } else {
      setFixedMode(themeMode);
    }
  };

  const handleColor = (color: ColorsType) => {
    setAccentColor(color);
  };

  return (
    <>
      <Box style={styles.section}>
        <TextThemed bold style={styles.sectionTitle}>
          {t("THEME_TITLE_MODE")}
        </TextThemed>
        <View style={styles.rowModes}>
          {themeModes.map((themeMode, index) => {
            const selected =
              (fixed && themeMode == mode) || (themeMode === "auto" && !fixed);

            return (
              <ButtonThemed
                key={"THEME_MODE_" + themeMode}
                style={[
                  styles.button,
                  { borderColor: themeColors.text },
                  selected && {
                    borderColor: themeColors.highlightedColored,
                  },
                ]}
                onPress={() => handleMode(themeMode)}
              >
                {selected && (
                  <AntDesign
                    style={styles.icon}
                    name="checkcircle"
                    size={dimensions.size.sm + 3}
                    color={themeColors.highlightedColored}
                  />
                )}
                <TextThemed
                  bold
                  color={selected ? "highlightedColored" : "text"}
                >
                  {t("THEME_MODE_" + themeMode)}
                </TextThemed>
              </ButtonThemed>
            );
          })}
        </View>
      </Box>

      <Box style={styles.section}>
        <TextThemed bold style={styles.sectionTitle}>
          {t("THEME_TITLE_COLOR")}
        </TextThemed>
        <View style={styles.row}>
          {Object.entries(colors[mode]).map(([key, value]: any) => {
            return (
              <View key={"color_" + key}>
                <ButtonThemed
                  style={[
                    styles.square,
                    key == color && {
                      borderColor: themeColors.highlightedColored,
                    },
                    {
                      backgroundColor: value,
                      borderColor: key == color ? themeColors.text : value,
                    },
                  ]}
                  onPress={() => handleColor(key)}
                ></ButtonThemed>
              </View>
            );
          })}
        </View>
      </Box>
    </>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: dimensions.margin.xl,
    padding: dimensions.margin.lg,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: dimensions.margin.lg,
  },
  rowModes: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    gap: dimensions.margin.md,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: dimensions.size.md,
  },
  scroll: {
    width: "100%",
  },
  button: {
    flex: 1,
    position: "relative",
    paddingVertical: dimensions.padding.md,
    paddingHorizontal: dimensions.padding.md + 5,
    borderRadius: dimensions.radius.lg,
    borderWidth: dimensions.border.sm,
  },
  square: {
    padding: dimensions.padding.sm,
    borderRadius: dimensions.radius.lg,
    borderWidth: dimensions.border.sm,
    width: 50,
    height: 50,
  },
  icon: {
    position: "absolute",
    top: 5,
    left: 5,
    zIndex: 1,
  },
});
