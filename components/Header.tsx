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
    <ViewThemed
      className={`w-full flex-row items-center justify-center pb-[${paddingBottom}px] 
      pt-[${insets.top + paddingBottom}px]`}
    >
      <View className="relative w-full flex-row items-center justify-center">
        <TextThemed className="font-bold text-lg">QrCode</TextThemed>
        <TouchableOpacity onPress={handleInfo} className="absolute right-4">
          <Entypo name="info-with-circle" size={24} color={iconColor} />
        </TouchableOpacity>
      </View>
    </ViewThemed>
  );
}
