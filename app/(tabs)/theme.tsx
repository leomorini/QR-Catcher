import { ScrollView } from "react-native";
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
