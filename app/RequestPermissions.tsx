import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { ViewThemed, ButtonThemed, TextThemed } from "@/components/Themed";
import { dimensions } from "@/styles/dimensions";

type RequestPermissionsProps = {
  requestPermission: Function;
};

export default function RequestPermissions({
  requestPermission,
}: RequestPermissionsProps) {
  const { t } = useTranslation();

  return (
    <ViewThemed color="background" style={styles.container}>
      <TextThemed bold style={styles.text}>
        {t(
          "REQUEST_PERMISSION_You need to activate permission to use the camera and storage!"
        )}
      </TextThemed>

      <ButtonThemed
        color="foreground"
        style={styles.button}
        onPress={() => requestPermission()}
      >
        <TextThemed bold style={[styles.buttonText]}>
          {t("REQUEST_PERMISSION_grant permission")}
        </TextThemed>
      </ButtonThemed>
    </ViewThemed>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: dimensions.padding.xl,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: dimensions.margin.xl,
  },
  button: {
    paddingHorizontal: dimensions.padding.lg,
    paddingVertical: dimensions.padding.md,
    borderRadius: dimensions.radius.lg,
    marginBottom: dimensions.margin.lg,
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
  },
});
