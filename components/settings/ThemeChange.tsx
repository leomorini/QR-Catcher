import { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Box from "../Box";
import ThemeContext from "@/styles";
import { ButtonThemed, TextThemed } from "../Themed";
import { ColorsType, colors } from "@/styles/colors";
import { useTranslation } from "react-i18next";
import { dimensions } from "@/styles/dimensions";

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
        <ScrollView horizontal style={styles.scroll}>
          {themeModes.map((themeMode, index) => {
            return (
              <ButtonThemed
                key={"THEME_MODE_" + themeMode}
                style={[
                  styles.button,
                  { borderColor: themeColors.text },
                  ((fixed && themeMode == mode) ||
                    (themeMode === "auto" && !fixed)) && {
                    backgroundColor: themeColors.highlightedColored,
                    borderColor: themeColors.highlightedColored,
                  },
                  index > 0 && { marginLeft: dimensions.margin.md },
                ]}
                onPress={() => handleMode(themeMode)}
              >
                <TextThemed bold color="text">
                  {t("THEME_MODE_" + themeMode)}
                </TextThemed>
              </ButtonThemed>
            );
          })}
        </ScrollView>
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
    paddingVertical: dimensions.padding.sm,
    paddingHorizontal: dimensions.padding.md,
    borderRadius: dimensions.radius.md,
    borderWidth: dimensions.border.sm,
  },
  square: {
    padding: dimensions.padding.sm,
    borderRadius: dimensions.radius.md,
    borderWidth: dimensions.border.sm,
    width: 50,
    height: 50,
  },
});
