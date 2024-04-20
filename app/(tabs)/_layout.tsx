import React from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { getScreenOptionsStyle } from "@/styles";

export default function TabLayout() {
  const screenOptions: any = getScreenOptionsStyle();
  const { t } = useTranslation();

  return (
    <Tabs initialRouteName="index" screenOptions={screenOptions}>
      <Tabs.Screen
        name="index"
        options={{
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
          title: t("History"),
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="history" size={32} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
