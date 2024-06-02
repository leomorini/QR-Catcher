import React, { useContext } from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import TabBarIcon from "@/components/tabs/TabBarIcon";
import TabBarButton from "@/components/tabs/TabBarButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { dimensions } from "@/styles/dimensions";
import ThemeContext, { shadowNoneStyle } from "@/styles";
import { ThemeType } from "@/styles/colors";

export default function TabLayout() {
  const { themeColors } = useContext(ThemeContext);
  const insets = useSafeAreaInsets();
  const { screenOptionsStyle }: any = getTabStyles(insets, themeColors);
  const { t } = useTranslation();

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={({ route }) => ({
        ...screenOptionsStyle,
        tabBarButton: (props) => {
          return TabBarButton(props);
        },
      })}
      sceneContainerStyle={{ backgroundColor: themeColors.background }}
    >
      <Tabs.Screen
        name="history"
        options={{
          title: t("TABS_History"),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "reader" : "reader-outline"}
              size={focused ? 22 : 18}
              color={
                focused ? themeColors.highlightedColored : themeColors.text2
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: t("TABS_Scan"),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="qr-code"
              size={focused ? 22 : 18}
              color={
                focused ? themeColors.highlightedColored : themeColors.text2
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="theme"
        options={{
          title: t("TABS_Theme"),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "brush" : "brush-outline"}
              size={focused ? 22 : 18}
              color={
                focused ? themeColors.highlightedColored : themeColors.text2
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}

function getTabStyles(insets: any, themeColors: ThemeType) {
  const itemHeight = 58 + dimensions.margin.sm;

  return {
    screenOptionsStyle: {
      headerShown: false,
      tabBarActiveTintColor: themeColors.highlightedColored,
      tabBarInactiveTintColor: themeColors.text2,
      // tabBarActiveBackgroundColor: colorsTheme.highlightedColored, //background color item selected
      tabBarStyle: {
        display: "flex",
        flexDirection: "row",
        height: itemHeight + insets.bottom,
        borderTopWidth: 2,
        borderColor: themeColors.border,
        backgroundColor: themeColors.foreground,
        overflow: "hidden",
        ...shadowNoneStyle,
      },
      tabBarItemStyle: {
        flex: 1,
        height: itemHeight,
      },
      tabBarLabelStyle: {
        flex: 0,
        fontSize: 11,
        fontFamily: "FontRegular",
        padding: 0,
        marginBottom: dimensions.margin.sm + 2,
        marginTop: dimensions.margin.sm - 5,
      },
      tabBarIconStyle: {
        flex: 1,
        height: "100%",
        padding: 0,
        marginTop: dimensions.margin.sm,
      },
    },
  };
}
