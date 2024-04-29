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
    <ViewThemed style={{
      display: "flex",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    }}>
      {!!historySorted && (
        <ScrollView style={{
          display: "flex",
          flex: 1,
        }}>
          {historySorted.map((item, index) => (
            <>
              {index > 0 && <View style={{}} />}
              <ButtonThemed
                onPress={() => handleLink(item)}
                // className={`flex flex-col p-7 rounded-[40px] overflow-hidden m-5`}
                key={index}
              >
                <View>
                  <View>
                    <ViewThemed color="bgComponents">
                      {item.isURL ? (
                        <Entypo name="link" size={25} color={colorsTheme.text} />
                      ) : (
                        <Feather
                          name="file-text"
                          size={25}
                          color={colorsTheme.text}
                        />
                      )}
                    </ViewThemed>
                  </View>
                  <TextThemed numberOfLines={3}>{item.text}</TextThemed>
                </View>
               
       
              </ButtonThemed>
            </>
          ))}
        </ScrollView>
      )}
    </ViewThemed>
  );
});

export default History;
