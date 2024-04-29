import { TextThemed } from "./Themed";

export type TitleProps = {
  title: string;
  bold?: boolean;
};

export default function Header({ title = "QrCode", bold = true }: TitleProps) {
  return (
    <TextThemed bold={bold} style={{ marginHorizontal: 10, fontSize: 36 }}>
      {title}
    </TextThemed>
  );
}
