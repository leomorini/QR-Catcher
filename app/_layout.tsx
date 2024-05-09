import { useEffect } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AlertNotificationRoot } from "react-native-alert-notification";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useCameraPermissions } from "expo-camera";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "@/styles/useColorScheme";
import RequestPermissions from "./RequestPermissions";

import { i18nextInit } from "@/services/intl";

import "@/global.css";
import { getThemeColors } from "@/styles";
import { ViewThemed } from "@/components/Themed";

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

export default function RootLayout() {
  const [permission, requestPermission] = useCameraPermissions();

  const [loaded, error] = useFonts({
    InterRegular: require("../assets/fonts/Inter-Regular.ttf"),
    InterBold: require("../assets/fonts/Inter-Bold.ttf"),
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

  if (!permission || !permission.granted) {
    return <RequestPermissions requestPermission={requestPermission} />;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const colorsTheme = getThemeColors();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <ViewThemed color="background" style={{ display: "flex", flex: 1 }}>
          <AlertNotificationRoot>
            <Stack>
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false
                }}
              />
            </Stack>
          </AlertNotificationRoot>
        </ViewThemed>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
