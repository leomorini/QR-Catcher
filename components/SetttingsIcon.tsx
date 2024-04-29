import { TouchableOpacity, View } from "react-native";
import { useNavigation } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { getThemeColors } from "@/styles";
import { ViewThemed } from "./Themed";

export default function SettingsIcon() {
  const navigation = useNavigation<any>();
  const colorsTheme = getThemeColors();
  const iconColor = colorsTheme.text;

  function handleInfo() {
    navigation.navigate("info");
  }

  return (
    <TouchableOpacity
      onPress={handleInfo}
      style={{ position: "absolute", right: 4, backgroundColor: "transparent" }}
    >
      <ViewThemed brutalism color="bg" style={{ borderRadius: 14, padding: 2 }}>
        <Entypo name="info-with-circle" size={24} color={iconColor} />
      </ViewThemed>
    </TouchableOpacity>
  );
}
1;
