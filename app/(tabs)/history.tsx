import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { observer } from "mobx-react-lite";
import { useStorageStore } from "@/services/storage";
import HistoryItem from "@/components/HistoryItem";
import Header from "@/components/Header";
import { dimensions } from "@/styles/dimensions";

const History = observer(() => {
  const { historySorted } = useStorageStore(); // OR useContext(CounterStoreContext)

  return (
    <>
      {!!historySorted && (
        <FlatList
          style={styles.list}
          data={historySorted}
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
      )}
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
