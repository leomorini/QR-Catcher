import { StyleSheet, Text, View } from "react-native";
import { ViewThemed, TextThemed, ButtonThemed } from "./Themed";
import Divider from "./Themed/Divider";
import { getBrutalismBorder, getThemeColors } from "@/styles";
import { handleLink } from "@/services/helper";
import { LinkInterface } from "@/services/interfaces";

interface MyProps {
  item: any;
  index: number;
}

export default function HistoryItem({ item, index }: MyProps) {
  const colorsTheme = getThemeColors();
  const borderBrutalismStyle = getBrutalismBorder(
    colorsTheme.border,
    "sm",
    false
  );

  const getTagComponent = (item: LinkInterface) => {
    return item.isURL ? (
      <View style={[styles.tag, getBrutalismBorder(colorsTheme.blue, "md")]}>
        <TextThemed color="blue">Link</TextThemed>
      </View>
    ) : (
      <View style={[styles.tag, getBrutalismBorder(colorsTheme.orange, "md")]}>
        <TextThemed color="orange">Texto</TextThemed>
      </View>
    );
  };

  return (
    <ViewThemed style={[styles.container, borderBrutalismStyle]}>
      <View style={styles.tagContainer}>{getTagComponent(item)}</View>
      <TextThemed numberOfLines={3}>{item.text}</TextThemed>
      <View style={styles.bottom}>
        <ButtonThemed onPress={() => handleLink(item)}>
          <TextThemed>Copiar</TextThemed>
        </ButtonThemed>

        <ButtonThemed onPress={() => handleLink(item)}>
          <TextThemed>Compartilhar</TextThemed>
        </ButtonThemed>
      </View>
    </ViewThemed>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  tagContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  tag: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  bottom: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 10,
  },
});
