import { View } from "react-native";
import { ViewThemed, ButtonThemed, TextThemed } from "@/components/Themed";

type RequestPermissionsProps = {
  requestPermission: Function;
};

export default function RequestPermissions({
  requestPermission,
}: RequestPermissionsProps) {
  return (
    <ViewThemed className="flex flex-1 items-center justify-center">
      <View className="mb-3">
        <TextThemed>
          É necessário ativar a permissão para usar a camera e armazenamento!
        </TextThemed>
      </View>
      <ButtonThemed onPress={() => requestPermission()}>
        <TextThemed>Clique aqui para conceder a permissão!</TextThemed>
      </ButtonThemed>
    </ViewThemed>
  );
}
