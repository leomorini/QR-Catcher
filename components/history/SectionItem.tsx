import { StyleSheet, View } from "react-native";
import { TextThemed, ButtonThemed } from "@/components/Themed";
import { handleLink, handleShare } from "@/services/helper";
import { dimensions } from "@/styles/dimensions";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { ThemeType } from "@/styles/colors";

interface MyProps {
  item: any;
  index: number;
  t: Function;
  themeColors: ThemeType;
}

export default function SectionItem({ t, item, themeColors }: MyProps) {
  return (
    <ButtonThemed
      style={[styles.container, { borderColor: themeColors.border }]}
      onPress={() => handleLink(item)}
    >
      <View style={styles.textPanel}>
        <TextThemed
          style={[styles.text, { color: themeColors.text }]}
          numberOfLines={3}
        >
          {item.text}
        </TextThemed>
      </View>

      <View style={styles.bottom}>
        <View style={styles.action}>
          {item.isURL ? (
            <Ionicons
              size={dimensions.size.lg}
              color={themeColors.highlightedColored}
              style={{ marginRight: dimensions.margin.sm }}
              name="open-outline"
            />
          ) : (
            <Ionicons
              size={dimensions.size.lg}
              color={themeColors.highlightedColored}
              style={{ marginRight: dimensions.margin.sm }}
              name="copy-outline"
            />
          )}

          <TextThemed color="highlightedColored">
            {item.isURL ? t("LINK_Access") : t("LINK_Copy")}
          </TextThemed>
        </View>

        <ButtonThemed style={styles.action} onPress={() => handleShare(item)}>
          <FontAwesome
            name="share"
            size={dimensions.size.lg}
            color={themeColors.highlightedColored}
            style={{ marginTop: 2 }}
          />
          <TextThemed style={styles.actionText} color="highlightedColored">
            {t("GLOBAL_Share")}
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
