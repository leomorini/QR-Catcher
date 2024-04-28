import { TextThemed } from "./Themed";

export type TitleProps = {
  title: string;
  bold?: boolean;
};

export default function Header({ title = "QrCode", bold = true }: TitleProps) {
  return (
    <TextThemed bold={bold} className="my-5 text-2xl">
      {title}
    </TextThemed>
  );
}
