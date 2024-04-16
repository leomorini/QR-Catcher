import { TextThemed } from "./Themed";

export type TitleProps = {
  title: string;
};

export default function Header({ title = "QrCode" }: TitleProps) {
  return <TextThemed className="my-5 font-bold text-2xl">{title}</TextThemed>;
}
