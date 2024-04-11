import { ScrollView, Text, View } from "react-native";
import { observer } from "mobx-react-lite";
import { useStorageStore } from "@/services/storage";

const History = observer(() => {
  const { history } = useStorageStore(); // OR useContext(CounterStoreContext)

  return (
    <View className="flex flex-1 items-center justify-center bg-white">
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
