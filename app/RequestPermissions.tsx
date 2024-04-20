import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { ViewThemed, ButtonThemed, TextThemed } from "@/components/Themed";

type RequestPermissionsProps = {
  requestPermission: Function;
};

export default function RequestPermissions({
  requestPermission,
}: RequestPermissionsProps) {
  const { t } = useTranslation();

  return (
    <ViewThemed className="flex flex-1 items-center justify-center">
      <View className="mb-3">
        <TextThemed>
          {t("You need to activate permission to use the camera and storage!")}
        </TextThemed>
      </View>
      <ButtonThemed onPress={() => requestPermission()}>
        <TextThemed>{t("Click here to grant permission!")}</TextThemed>
      </ButtonThemed>
    </ViewThemed>
  );
}
