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
  const { fixed, setFixed, mode, setMode, color, setColor, themeColors } =
    useContext(ThemeContext);

  const themeModes = ["auto", "dark", "light"];

  const handleMode = (themeMode: any) => {
    if (themeMode === "auto") {
      setFixed(false);
    } else {
      setFixed(true);
      setMode(themeMode);
    }
  };

  const handleColor = (color: ColorsType) => {
    setColor(color);
  };

  return (
    <>
      <Box style={styles.container}>
        <ScrollView style={styles.scroll}>
          {themeModes.map((themeMode, index) => {
            return (
              <View key={"theme_mode_" + themeMode}>
                {index > 0 && <View />}
                <ButtonThemed onPress={() => handleMode(themeMode)}>
                  <TextThemed color="text">
                    {t("THEME_MODE_" + themeMode)}
                  </TextThemed>
                </ButtonThemed>
              </View>
            );
          })}
        </ScrollView>
      </Box>

      <Box style={styles.container}>
        <ScrollView style={styles.scroll}>
          {Object.keys(colors).map((key: any) => {
            return (
              <View key={"color_" + key}>
                <ButtonThemed onPress={() => handleColor(key)}>
                  <TextThemed color="text">
                    {t("THEME_COLOR_" + key)}
                  </TextThemed>
                </ButtonThemed>
              </View>
            );
          })}
        </ScrollView>
      </Box>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: dimensions.margin.md,
  },
  scroll: {
    width: "100%",
  },
});
