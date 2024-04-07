import { StyleSheet, Text, View } from 'react-native';

export default function History() {
  return (
    <View style={styles.container}>
      <Text>Histórico</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
