import { TextThemed, ViewThemed } from "@/components/Themed";
import ScreenContainer from "@/components/ScreenContainer";

const Info = () => {
  return (
    <ViewThemed
      color="bg"
      className="flex flex-1 items-center justify-center m-10"
    >
      <TextThemed>Info</TextThemed>
    </ViewThemed>
  );
};

export default Info;
