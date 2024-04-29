import { View as DefaultComponent } from "react-native";
import { ThemeProps } from "@/styles";
interface MyProps {
  padding?: boolean;
  tabsPadding?: boolean;
}
export type ComponentProps = MyProps & ThemeProps & DefaultComponent["props"];

export default function ScreenContainer({
  padding = false,
  tabsPadding = true,
  ...otherProps
}: ComponentProps) {
  return <DefaultComponent {...otherProps} />;
}
