import { useContext } from "react";
import { StyleSheet, View } from "react-native";

import { TextThemed, ButtonThemed } from "./Themed";
import { handleLink, handleShare } from "@/services/helper";
import { LinkInterface } from "@/services/interfaces";
import { dimensions } from "@/styles/dimensions";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import ThemeContext from "@/styles";

interface MyProps {
  item: any;
  index: number;
}

export default function HistoryItem({ item, index }: MyProps) {
  const { themeColors } = useContext(ThemeContext);

  const getTagComponent = (item: LinkInterface) => {
    return item.isURL ? (
      <View style={[styles.tag, { borderColor: themeColors.blue }]}>
        <FontAwesome name="link" size={18} color={themeColors.blue} />
      </View>
    ) : (
      <View style={[styles.tag, { borderColor: themeColors.orange }]}>
        <Entypo name="text" size={18} color={themeColors.orange} />
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

        <ButtonThemed style={styles.action} onPress={() => handleShare(item)}>
          <FontAwesome
            name="share"
            size={24}
            color={themeColors.highlightedColored}
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
