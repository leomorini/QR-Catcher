import React from "react";
export { useColorScheme } from "react-native";
import { makeObservable, observable, action, computed } from "mobx";
import { _loadData, _storeData } from "@/services/api";
import { ThemeModeType, ColorsType } from "@/styles";

interface ThemeType {
  fixed: boolean;
  mode: ThemeModeType;
  colored: ColorsType;
}

class Store {
  theme: ThemeType = {
    fixed: false,
    mode: "dark",
    colored: "red",
  };

  constructor() {
    makeObservable(this, {
      theme: observable,
      init: action.bound,
      set: action.bound,
    });

    this.init();
  }

  /** Get theme saved in local storage */
  async init() {
    const theme = await _loadData("theme");
    if (!!theme && typeof theme === "object") {
      this.theme = theme;
    }
  }

  /**
   * Set new theme to current theme
   * @param theme ThemeType
   */
  set(theme: ThemeType) {
    if (theme.mode !== this.theme.mode) this.theme.mode = theme.mode;
    if (theme.colored !== this.theme.colored)
      this.theme.colored = theme.colored;
    _storeData("theme", theme);
  }
}

const themeStore = new Store();
// Create a React Context with the counter store instance.
export const ThemeStoreContext = React.createContext(themeStore);
export const useThemeStore = () => React.useContext(ThemeStoreContext);
