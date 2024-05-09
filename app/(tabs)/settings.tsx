import { ScrollView } from "react-native";
import { TextThemed } from "@/components/Themed";
import Box from "@/components/Box";
import Header from "@/components/Header";

const Settings = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Header />
      <Box>
        <TextThemed>
          Desenvolvido por: <TextThemed>Leonardo Morini</TextThemed>
        </TextThemed>
        <TextThemed>Linkedin</TextThemed>
        <TextThemed>Github</TextThemed>
      </Box>
    </ScrollView>
  );
};

export default Settings;
