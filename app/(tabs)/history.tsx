import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { observer } from "mobx-react-lite";
import { useHistoryStore } from "@/data/history";
import HistoryItem from "@/components/HistoryItem";
import Header from "@/components/Header";
import { dimensions } from "@/styles/dimensions";
import Empty from "@/components/Empty";

const History = observer(() => {
  const { sorted } = useHistoryStore(); // OR useContext(CounterStoreContext)

  return sorted && sorted.length > 0 ? (
    <FlatList
      style={styles.list}
      data={sorted}
      keyExtractor={(item) => item.created_at + "_history"}
      renderItem={({ item, index }) => (
        <HistoryItem item={item} index={index} />
      )}
      ListHeaderComponent={<Header />}
      ListFooterComponent={<View style={styles.footer} />}
      ItemSeparatorComponent={() => (
        <View style={{ marginVertical: dimensions.margin.md }} />
      )}
    />
  ) : (
    <Empty />
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
