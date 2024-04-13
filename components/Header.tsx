import { View, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { ViewThemed, TextThemed } from "./Themed";
import { getThemeColors } from "@/styles";

const paddingBottom: number = 15;
export default function Header() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const colorsTheme = getThemeColors();
  const iconColor = colorsTheme.tabIconDefault;

  function handleInfo() {
    navigation.navigate("info");
  }

  return (
    <View
      className={`py-9 w-full flex-row items-center justify-center`}
    >
      <View className="py-9 bg-red-200 relative w-full flex-row items-center justify-center">
        <TextThemed className="font-bold text-lg">QrCode</TextThemed>
        <TouchableOpacity onPress={handleInfo} className="absolute right-4">
          <Entypo name="info-with-circle" size={24} color={iconColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
