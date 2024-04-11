import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { ViewThemed, TextThemed } from "./Themed";
import { getThemeColors } from "@/styles";

const paddingBottom: number = 15;
export default function Header() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const colorsTheme = getThemeColors();
  const iconColor = colorsTheme.tabIconDefault;

  function handleInfo() {
    navigation.navigate('info');
  }

  return (
    <ViewThemed
      style={[styles.container, { paddingTop: insets.top + paddingBottom }]}
    >
      <View style={styles.row}>
        <TextThemed style={styles.title}>QrCode</TextThemed>
        <TouchableOpacity onPress={handleInfo} style={styles.info}>
          <Entypo name="info-with-circle" size={24} color={iconColor} />
        </TouchableOpacity>
      </View>
    </ViewThemed>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom,
  },
  row: {
    position: "relative",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  info: {
    position: "absolute",
    right: 15,
  },
});
