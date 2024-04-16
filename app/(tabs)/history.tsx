import { ScrollView, Text, View } from "react-native";
import { observer } from "mobx-react-lite";
import { useStorageStore } from "@/services/storage";
import { ButtonThemed, TextThemed, ViewThemed } from "@/components/Themed";
import { Entypo, Feather } from "@expo/vector-icons";
import { handleLink } from "@/services/helper";
import { getThemeColors } from "@/styles";

const History = observer(() => {
  const { historySorted } = useStorageStore(); // OR useContext(CounterStoreContext)
  const colorsTheme = getThemeColors();

  return (
    <ViewThemed className="flex flex-1 items-center justify-center">
      {!!historySorted && (
        <ScrollView
          className="flex flex-1 w-full"
          contentContainerStyle={{ padding: 10, paddingVertical: 30 }}
        >
          {historySorted.map((item, index) => (
            <ButtonThemed
              onPress={() => handleLink(item)}
              color="background2"
              className={`relative flex p-4 rounded-md shadow-lg w-full mb-8`}
              key={index}
            >
              <TextThemed className="text-lg">{item.text}</TextThemed>

              <ViewThemed
                color="tint"
                className="absolute -top-3 -right-1 rounded-full p-2"
              >
                {item.isURL ? (
                  <Entypo name="link" size={20} color={colorsTheme.text} />
                ) : (
                  <Feather
                    name="file-text"
                    size={20}
                    color={colorsTheme.text}
                  />
                )}
              </ViewThemed>
            </ButtonThemed>
          ))}
        </ScrollView>
      )}
    </ViewThemed>
  );
});

export default History;
