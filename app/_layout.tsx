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
import { useCameraPermissions, PermissionResponse } from "expo-camera/next";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "@/styles/useColorScheme";
import RequestPermissions from "./RequestPermissions";

import Title from "@/components/Title";
import SettingsIcon from "@/components/SetttingsIcon";
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
        <ViewThemed color="bg" style={{ display: 'flex', flex: 1 }}>
          <AlertNotificationRoot>
            <Stack
              screenOptions={{
                headerStyle: { backgroundColor: "transparent" },
                contentStyle: { backgroundColor: "transparent" },
              }}
            >
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: true,
                  headerTitle: (title) => {
                    return <Title title="QrCode" />;
                  },
                  headerRight: () => <SettingsIcon />,
                  headerShadowVisible: false,
                }}
              />
              <Stack.Screen
                name="info"
                options={{
                  headerShown: true,
                  title: "Information",
                  headerTitle: ({ children }) => {
                    return <Title title={children} />;
                  },
                  headerShadowVisible: false,
                }}
              />
            </Stack>
          </AlertNotificationRoot>
        </ViewThemed>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
