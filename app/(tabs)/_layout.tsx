import React from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  shadowNoneStyle,
  borderBrutalismStyle,
  getThemeColors,
} from "@/styles";
import { NavButton } from "@/components/NavButton";

export default function TabLayout() {
  const { screenOptionsStyle, tabBarOptionsStyle }: any = getTabStyles();
  const { t } = useTranslation();

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        ...screenOptionsStyle,
        tabBarButton: (props) => <NavButton {...props} />,
      }}
      sceneContainerStyle={{ backgroundColor: "transparent" }} 
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarActiveBackgroundColor: tabBarOptionsStyle,
          title: t("Scan"),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="data-matrix-scan"
              size={26}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          tabBarActiveBackgroundColor: tabBarOptionsStyle,
          title: t("History"),
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="history" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

function getTabStyles() {
  const colorsTheme = getThemeColors();

  return {
    screenOptionsStyle: {
      headerShown: false,
      tabBarActiveTintColor: colorsTheme.text,
      tabBarInactiveTintColor: colorsTheme.text,
      activeBackgroundColor: colorsTheme.highlightedColored,
      tabBarStyle: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        bottom: 16,
        left: 16,
        right: 16,
        height: 80,
        borderColor: colorsTheme.text,
        backgroundColor: colorsTheme.bgComponents,
        overflow: "hidden",
        ...shadowNoneStyle,
        ...borderBrutalismStyle("md"),
      },
      tabBarItemStyle: {
        height: "100%",
      },
      tabBarLabelStyle: {
        flex: 1,
        fontSize: 14,
        fontFamily: 'InterBold',
        margin: 0,
        padding: 0,
      },
      tabBarIconStyle: {
        height: "100%",
        margin: 0,
        padding: 0,
        marginRight: -30
      },
    },
    tabBarOptionsStyle: {
      activeBackgroundColor: colorsTheme.highlightedColored,
    },
  };
}
