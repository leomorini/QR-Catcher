import { ScrollView } from "react-native";
import { TextThemed } from "@/components/Themed";
import Box from "@/components/Box";
import Header from "@/components/Header";
import Developer from "@/components/settings/Developer";
import ThemeChange from "@/components/settings/ThemeChange";

const Settings = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Header />
      <ThemeChange />
      <Developer />
    </ScrollView>
  );
};

export default Settings;
