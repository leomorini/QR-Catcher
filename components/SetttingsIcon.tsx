import { TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { getThemeColors } from "@/styles";

export default function SettingsIcon() {
  const navigation = useNavigation<any>();
  const colorsTheme = getThemeColors();
  const iconColor = colorsTheme.tabIconDefault;

  function handleInfo() {
    navigation.navigate("info");
  }

  return (
    <TouchableOpacity onPress={handleInfo} className="absolute right-4">
      <Entypo name="info-with-circle" size={24} color={iconColor} />
    </TouchableOpacity>
  );
}
