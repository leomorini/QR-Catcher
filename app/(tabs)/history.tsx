import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { observer } from "mobx-react-lite";
import { useStorageStore } from "@/services/storage";
import HistoryItem from "@/components/HistoryItem";
import Divider from "@/components/Themed/Divider";

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
          ItemSeparatorComponent={() => <View style={{ marginVertical: 10 }} />}
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
});
