import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { TextThemed, ViewThemed } from "./Themed";
import { dimensions } from "@/styles/dimensions";
import { Entypo } from "@expo/vector-icons";
import ThemeContext from "@/styles";

export default function Empty() {
  const { t } = useTranslation();
  const { themeColors } = useContext(ThemeContext);

  return (
    <ViewThemed
      color="background"
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: dimensions.padding.xl * 2,
      }}
    >
      <Entypo name="block" size={80} color={themeColors.text2} />
      <TextThemed
        color="text2"
        style={{
          marginTop: dimensions.margin.xl,
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {t("EMPTY_We don't have data to display here yet")}
      </TextThemed>
    </ViewThemed>
  );
}
