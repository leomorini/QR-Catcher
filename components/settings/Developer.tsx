import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import Gravatar from "@krosben/react-native-gravatar";
import * as Linking from "expo-linking";
import { ButtonThemed, TextThemed } from "../Themed";
import { dimensions } from "@/styles/dimensions";
import Divider from "../Themed/Divider";

import AntDesign from "@expo/vector-icons/AntDesign";
import ThemeContext from "@/styles";

export default function Developer() {
  const { themeColors } = useContext(ThemeContext);

  function openLinkedin() {
    Linking.openURL("https://www.linkedin.com/in/leomorini/");
  }

  function openGithub() {
    Linking.openURL("https://github.com/leomorini");
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Gravatar email="leomorinidev@gmail.com" size={150} />
        <View style={styles.info}>
          <TextThemed>Desenvolvido por</TextThemed>
          <TextThemed style={styles.infoText} bold>
            Leonardo Morini
          </TextThemed>
        </View>
      </View>
      <Divider size="sm" color="highlightedColored" style={styles.divider} />

      <View style={styles.row}>
        <ButtonThemed
          onPress={openLinkedin}
          style={[
            styles.row,
            styles.button,
            { borderColor: themeColors.linkedin },
          ]}
        >
          <AntDesign
            name="linkedin-square"
            size={20}
            color={themeColors.linkedin}
          />
          <TextThemed color="linkedin" style={styles.buttonText}>
            Linkedin
          </TextThemed>
        </ButtonThemed>

        <ButtonThemed
          onPress={openGithub}
          style={[
            styles.row,
            styles.button,
            { borderColor: themeColors.github },
          ]}
        >
          <AntDesign name="github" size={20} color={themeColors.github} />
          <TextThemed color="github" style={styles.buttonText}>
            Github
          </TextThemed>
        </ButtonThemed>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: dimensions.margin.md,
    paddingTop: dimensions.margin.lg,
    paddingBottom: dimensions.margin.xl * 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  gravatar: {
    height: 80,
    width: 80,
  },
  info: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: dimensions.margin.md,
  },
  infoText: {
    fontSize: 20,
  },
  divider: {
    marginVertical: dimensions.margin.lg,
  },
  button: {
    borderRadius: dimensions.radius.lg,
    borderWidth: dimensions.border.sm,
    paddingVertical: dimensions.padding.sm,
    paddingHorizontal: dimensions.padding.md,
    marginRight: dimensions.margin.md,
    backgroundColor: "transparent",
  },
  buttonText: {
    marginLeft: dimensions.margin.sm,
    fontSize: 14,
  },
});
