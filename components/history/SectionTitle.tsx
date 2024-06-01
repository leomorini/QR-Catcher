import { StyleSheet, View } from "react-native";
import { TextThemed } from "@/components/Themed";
import { dimensions } from "@/styles/dimensions";

interface MyProps {
  title: string;
}

export default function SectionTitle({ title }: MyProps) {
  return (
    <View style={styles.container}>
      <TextThemed style={styles.text} color="text" bold>
        {title}
      </TextThemed>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: dimensions.margin.lg,
    marginLeft: dimensions.margin.md,
  },
  text: {
    fontSize: 22,
  },
});
