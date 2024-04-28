import { View as DefaultComponent } from "react-native";
import { ThemeProps } from "@/styles";
interface MyProps {
  padding?: boolean;
  tabsPadding?: boolean;
}
export type ComponentProps = MyProps & ThemeProps & DefaultComponent["props"];

export default function ScreenContainer({
  className,
  padding = false,
  tabsPadding = true,
  ...otherProps
}: ComponentProps) {
  return (
    <DefaultComponent
      className={`
        relative flex flex-1 bg-transparent pt-4
        ${padding ? "p-10" : ""} 
        ${tabsPadding ? "pb-[100px]" : ""} 
        ${className}
      `}
      {...otherProps}
    />
  );
}
