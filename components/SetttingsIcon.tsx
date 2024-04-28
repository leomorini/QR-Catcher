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
    <TouchableOpacity onPress={handleInfo} className="absolute right-4 bg-transparent">
      <ViewThemed brutalism color="bg" className="bg-transparent rounded-md py-2 px-2">
        <Entypo name="info-with-circle" size={24} color={iconColor} />
      </ViewThemed>
    </TouchableOpacity>
  );
}1
