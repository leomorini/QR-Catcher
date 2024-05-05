import { TextThemed, ViewThemed } from "@/components/Themed";
import ScreenContainer from "@/components/ScreenContainer";

const Settings = () => {
  return (
    <ViewThemed
      color="bg"
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
      }}
    >
      <TextThemed>Info</TextThemed>
    </ViewThemed>
  );
};

export default Settings;
