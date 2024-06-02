import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { ViewThemed, ButtonThemed, TextThemed } from "@/components/Themed";
import { dimensions } from "@/styles/dimensions";
import CameraSvg from "@/components/svg/CameraSvg";

type RequestPermissionsProps = {
  requestPermission: Function;
};

export default function RequestPermissions({
  requestPermission,
}: RequestPermissionsProps) {
  const { t } = useTranslation();

  return (
    <ViewThemed color="foreground" style={styles.container}>
      <View style={styles.textContainer}>
        <CameraSvg width={150} height={150} />
        <TextThemed color="highlightedColored" bold style={styles.title}>
          {t("REQUEST_PERMISSION_Attention")}
        </TextThemed>
        <TextThemed bold style={styles.text}>
          {t("REQUEST_PERMISSION_You need to activate permission_1")}
        </TextThemed>
      </View>

      <ButtonThemed
        color="highlighted"
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
    justifyContent: "space-between",
    padding: dimensions.padding.xl,
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: dimensions.margin.xl,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: dimensions.margin.xl,
  },
  button: {
    paddingHorizontal: dimensions.padding.xl,
    paddingVertical: dimensions.padding.lg,
    borderRadius: dimensions.radius.lg,
    marginBottom: dimensions.margin.lg,
  },
  buttonText: {
    fontSize: 25,
    textAlign: "center",
  },
});
