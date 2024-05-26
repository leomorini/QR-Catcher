import React, { useContext } from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import TabBarIcon from "@/components/TabBarIcon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { dimensions } from "@/styles/dimensions";
import ThemeContext, { shadowNoneStyle } from "@/styles";
import { ThemeType } from "@/styles/colors";

export default function TabLayout() {
  const { themeColors } = useContext(ThemeContext);

  const { screenOptionsStyle }: any = getTabStyles(themeColors);
  const { t } = useTranslation();

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={({ route }) => ({
        ...screenOptionsStyle,
      })}
      sceneContainerStyle={{ backgroundColor: themeColors.background }}
    >
      <Tabs.Screen
        name="history"
        options={{
          title: t("TABS_History"),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon>
              <MaterialIcons
                name="history"
                size={28}
                color={
                  focused ? themeColors.highlightedColored : themeColors.text2
                }
              />
            </TabBarIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: t("TABS_Scan"),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon>
              <MaterialCommunityIcons
                name="data-matrix-scan"
                size={24}
                color={
                  focused ? themeColors.highlightedColored : themeColors.text2
                }
              />
            </TabBarIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("TABS_Settings"),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon>
              <MaterialIcons
                name="settings"
                size={28}
                color={
                  focused ? themeColors.highlightedColored : themeColors.text2
                }
              />
            </TabBarIcon>
          ),
        }}
      />
    </Tabs>
  );
}

function getTabStyles(themeColors: ThemeType) {
  const insets = useSafeAreaInsets();
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
        marginTop: dimensions.margin.sm - 5
      },
      tabBarIconStyle: {
        flex: 1,
        height: "100%",
        padding: 0,
        marginTop: dimensions.margin.sm
      },
    },
  };
}
