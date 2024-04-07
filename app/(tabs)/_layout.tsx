import React from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import { getThemeColors } from "@/styles";

export default function TabLayout() {
  const colorsTheme = getThemeColors();
  const iconColor = colorsTheme.tabIconDefault;
  const iconColorSelected = colorsTheme.tabIconSelected;

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colorsTheme.tint,
        tabBarStyle: {
          height: 80,
          borderWidth: 1,
          backgroundColor: colorsTheme.background,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          marginBottom: 10,
          color: colorsTheme.tabIconDefault,
        },
        tabBarIconStyle: {
          marginTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Scanner",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="data-matrix-scan"
              size={24}
              color={color}
            />
          ),
          tabBarActiveTintColor: iconColorSelected,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="history" size={30} color={color} />
          ),
          tabBarActiveTintColor: iconColorSelected,
        }}
      />
    </Tabs>
  );
}
