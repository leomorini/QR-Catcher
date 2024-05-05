import { StyleSheet, View } from "react-native";
import { TextThemed, ButtonThemed } from "./Themed";
import { getThemeColors } from "@/styles";
import { handleLink } from "@/services/helper";
import { LinkInterface } from "@/services/interfaces";
import { dimensions } from "@/styles/dimensions";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";

interface MyProps {
  item: any;
  index: number;
}

export default function HistoryItem({ item, index }: MyProps) {
  const colorsTheme = getThemeColors();

  const getTagComponent = (item: LinkInterface) => {
    return item.isURL ? (
      <View style={[styles.tag, { borderColor: colorsTheme.blue }]}>
        <FontAwesome name="link" size={18} color={colorsTheme.blue} />
      </View>
    ) : (
      <View style={[styles.tag, { borderColor: colorsTheme.orange }]}>
        <Entypo name="text" size={18} color={colorsTheme.orange} />
      </View>
    );
  };

  return (
    <ButtonThemed style={styles.container} onPress={() => handleLink(item)}>
      <TextThemed numberOfLines={2}>{item.text}</TextThemed>
      <View style={styles.bottom}>
        <View style={styles.tagContainer}>{getTagComponent(item)}</View>
        <TextThemed color="highlighted">
          {item.isURL ? "Clique para abrir" : "Clique para copiar"}
        </TextThemed>

        <ButtonThemed
          style={styles.action}
          onPress={() => console.log("clicou")}
        >
          <FontAwesome
            name="share"
            size={24}
            color={colorsTheme.highlightedColored}
          />
        </ButtonThemed>
      </View>
    </ButtonThemed>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: dimensions.padding.md,
    paddingVertical: dimensions.padding.lg,
  },
  tagContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: dimensions.padding.sm,
    paddingHorizontal: dimensions.padding.sm,
    borderWidth: 1,
    borderRadius: dimensions.radius.lg,
  },
  bottom: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: dimensions.margin.lg,
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  action: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: dimensions.padding.sm,
    paddingHorizontal: dimensions.padding.sm,
    borderRadius: dimensions.radius.lg,
    marginLeft: dimensions.margin.lg,
  },
});
