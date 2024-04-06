import { useCameraPermissions } from "expo-camera/next";
import { Button, StyleSheet, View, Text } from "react-native";

import CodeScanner from "@/components/CodeScanner";

export default function Index() {
  const [permission, requestPermission] = useCameraPermissions();


  if (!permission) {
    return (
      <View>
        <Button
          onPress={requestPermission}
          title="Request Camera Permissions"
        />
      </View>
    );
  }

  return (
    <CodeScanner />
  );
}
