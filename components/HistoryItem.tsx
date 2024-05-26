import { useContext } from "react";
import { StyleSheet, View } from "react-native";

import { TextThemed, ButtonThemed } from "./Themed";
import { handleLink, handleShare } from "@/services/helper";
import { LinkInterface } from "@/services/interfaces";
import { dimensions } from "@/styles/dimensions";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import ThemeContext from "@/styles";
import { useTranslation } from "react-i18next";

interface MyProps {
  item: any;
  index: number;
}

export default function HistoryItem({ item, index }: MyProps) {
  const { t } = useTranslation();

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
    <ButtonThemed
      style={[styles.container, { borderColor: themeColors.border }]}
      onPress={() => handleLink(item)}
    >
      <View style={styles.textPanel}>
        {item.isURL ? (
          <>
            <View style={[styles.tag, { borderColor: themeColors.blue }]}>
              <FontAwesome name="link" size={18} color={themeColors.blue} />
            </View>
            <TextThemed
              style={[styles.text, { color: themeColors.blue }]}
              numberOfLines={3}
            >
              {item.text}
            </TextThemed>
          </>
        ) : (
          <>
            <View style={[styles.tag, { borderColor: themeColors.orange }]}>
              <Entypo name="text" size={18} color={themeColors.orange} />
            </View>
            <TextThemed
              style={[styles.text, { color: themeColors.orange }]}
              numberOfLines={3}
            >
              {item.text}
            </TextThemed>
          </>
        )}
      </View>

      <View style={styles.bottom}>
        <View style={styles.action}>
          <TextThemed color="text">
            {item.isURL ? t("LINK_Access") : t("LINK_Copy")}
          </TextThemed>
        </View>

        <ButtonThemed style={styles.action} onPress={() => handleShare(item)}>
          <FontAwesome
            name="share"
            size={dimensions.size.md}
            color={themeColors.highlightedColored}
            style={{ marginTop: 2 }}
          />
          <TextThemed style={styles.actionText} color="highlightedColored">
            Compartilhar
          </TextThemed>
        </ButtonThemed>
      </View>
    </ButtonThemed>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    borderTopWidth: dimensions.border.sm,
    borderBottomWidth: dimensions.border.sm,
  },
  textPanel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: dimensions.padding.lg,
    paddingBottom: dimensions.padding.sm,
    paddingHorizontal: dimensions.padding.lg,
  },
  text: {
    fontSize: 16,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: dimensions.margin.sm,
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
    justifyContent: "flex-end",
    paddingVertical: dimensions.padding.lg,
    paddingHorizontal: dimensions.padding.lg,
    borderRadius: dimensions.radius.lg,
    backgroundColor: "transparent",
  },
  actionText: {
    marginLeft: dimensions.margin.sm,
  },
});
