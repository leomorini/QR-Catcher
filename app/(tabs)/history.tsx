import { ScrollView, StyleSheet, Text, View } from "react-native";
import { observer } from "mobx-react-lite";
import { useStorageStore } from "@/services/storage";

const History = observer(() => {
  const { history } = useStorageStore(); // OR useContext(CounterStoreContext)

  return (
    <View style={styles.container}>
      <Text>Histórico</Text>

      {!!history && (
        <ScrollView>
          {history.map((item, index) => (
            <View key={index}>
              <Text>{index}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
});

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'red',
  },
});
