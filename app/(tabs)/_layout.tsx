import React from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { shadowNoneStyle, getThemeColors } from "@/styles";
import TabBarIcon from "@/components/TabBarIcon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { dimensions } from "@/styles/dimensions";

export default function TabLayout() {
  const { screenOptionsStyle, colorsTheme }: any = getTabStyles();
  const { t } = useTranslation();

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={({ route }) => ({
        ...screenOptionsStyle,
      })}
      sceneContainerStyle={{ backgroundColor: "transparent" }}
    >
      <Tabs.Screen
        name="history"
        options={{
          title: t("History"),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              background={colorsTheme.navIconBackground}
            >
              <MaterialIcons
                name="history"
                size={28}
                color={focused ? colorsTheme.text : colorsTheme.text2}
              />
            </TabBarIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: t("Scan"),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              background={colorsTheme.navIconBackground}
            >
              <MaterialCommunityIcons
                name="data-matrix-scan"
                size={24}
                color={focused ? colorsTheme.text : colorsTheme.text2}
              />
            </TabBarIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("Settings"),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              background={colorsTheme.navIconBackground}
            >
              <MaterialIcons
                name="settings"
                size={28}
                color={focused ? colorsTheme.text : colorsTheme.text2}
              />
            </TabBarIcon>
          ),
        }}
      />
    </Tabs>
  );
}

function getTabStyles() {
  const colorsTheme = getThemeColors();
  const insets = useSafeAreaInsets();
  const itemHeight = 74 + dimensions.margin.sm;

  return {
    screenOptionsStyle: {
      headerShown: false,
      tabBarActiveTintColor: colorsTheme.text,
      tabBarInactiveTintColor: colorsTheme.text2,
      // tabBarActiveBackgroundColor: colorsTheme.highlightedColored, //background color item selected
      tabBarStyle: {
        display: "flex",
        flexDirection: "row",
        height: itemHeight + insets.bottom,
        borderTopWidth: 2,
        borderColor: colorsTheme.border,
        backgroundColor: colorsTheme.foreground,
        overflow: "hidden",
        ...shadowNoneStyle,
      },
      tabBarItemStyle: {
        flex: 1,
        height: itemHeight,
      },
      tabBarLabelStyle: {
        flex: 0,
        fontSize: 12,
        fontFamily: "InterBold",
        marginBottom: dimensions.margin.sm,
        padding: 0,
      },
      tabBarIconStyle: {
        flex: 1,
        height: "100%",
        marginTop: dimensions.margin.sm,
        padding: 0,
      },
    },
    colorsTheme,
  };
}
