import { useContext } from "react";
import { SectionList, StyleSheet, View } from "react-native";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { useHistoryStore } from "@/data/history";
import SectionItem from "@/components/history/SectionItem";
import SectionTitle from "@/components/history/SectionTitle";
import Header from "@/components/Header";
import Empty from "@/components/Empty";
import { dimensions } from "@/styles/dimensions";
import ThemeContext from "@/styles";

const History = observer(() => {
  const { t } = useTranslation(); // Pass t function translation to renderItem for optimization
  const { themeColors } = useContext(ThemeContext);
  const { grouped } = useHistoryStore(); // OR useContext(CounterStoreContext)

  return !!grouped ? (
    <SectionList
      style={styles.list}
      sections={grouped}
      keyExtractor={(item) => item.created_at + "_history"}
      renderItem={({ item, index }) => (
        <SectionItem
          t={t}
          themeColors={themeColors}
          item={item}
          index={index}
        />
      )}
      renderSectionHeader={({ section: { title } }) => (
        <SectionTitle title={title} />
      )}
      ListHeaderComponent={<View style={{ marginTop: dimensions.margin.xl }} />}
      ListFooterComponent={<View style={styles.footer} />}
      ItemSeparatorComponent={() => (
        <View style={{ marginVertical: dimensions.margin.sm }} />
      )}
    />
  ) : (
    <>
      <Header />
      <Empty />
    </>
  );
});

export default History;

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  footer: {
    marginBottom: dimensions.padding.xl,
  },
});
