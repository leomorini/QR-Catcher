import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useCameraPermissions, PermissionResponse } from "expo-camera";
import * as SplashScreen from "expo-splash-screen";
import RequestPermissions from "./RequestPermissions";

import { i18nextInit } from "@/services/intl";
import { ThemeProvider } from "@/styles";
import { ViewThemed } from "@/components/Themed";
import { AlertNotificationRoot } from "@/components/AlertNotification";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

type MyProps = {
  permission: PermissionResponse;
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    FontRegular: require("../assets/fonts/Lexend-Regular.ttf"),
    FontBold: require("../assets/fonts/Lexend-Bold.ttf"),
    ...FontAwesome.font,
  });

  // ComponentDidMount
  useEffect(() => {
    i18nextInit();
  }, []);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const [permission, requestPermission] = useCameraPermissions();

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        {!permission || !permission.granted ? (
          <RequestPermissions requestPermission={requestPermission} />
        ) : (
          <ViewThemed color="background" style={{ display: "flex", flex: 1 }}>
            <AlertNotificationRoot>
              <Stack>
                <Stack.Screen
                  name="(tabs)"
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack>
            </AlertNotificationRoot>
          </ViewThemed>
        )}
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
