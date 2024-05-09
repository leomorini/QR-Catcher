import { ScrollView } from "react-native";
import { TextThemed } from "@/components/Themed";
import Box from "@/components/Box";
import Header from "@/components/Header";
import Developer from "@/components/settings/Developer";

const Settings = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Header />
      <Developer />
    </ScrollView>
  );
};

export default Settings;
