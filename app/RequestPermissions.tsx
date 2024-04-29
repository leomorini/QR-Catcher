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
    <ViewThemed style={{
      display: "flex",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    }}>
      <View>
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
