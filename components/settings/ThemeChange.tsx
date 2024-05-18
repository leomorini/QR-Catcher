import { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Box from "../Box";
import ThemeContext from "@/styles";
import { ButtonThemed, TextThemed } from "../Themed";
import { useTranslation } from "react-i18next";

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

  return (
    <>
      <Box>
        <ScrollView style={styles.scroll}>
          {themeModes.map((themeMode, index) => {
            return (
              <View key={themeMode + "_" + index}>
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

      <Box></Box>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: {
    width: "100%",
  },
});
