import React from "react";
import { makeObservable, observable, action, computed } from "mobx";
import { _loadData, _storeData } from "@/services/api";
import { LinkInterface } from "@/services/interfaces";
import { getLocales } from "expo-localization";

/** Type/Interface */
type groupedLinksType = { [key: string]: LinkInterface[] };
type groupedSectionItemType = { title: string; data: LinkInterface[] };
type groupedSectionListType = groupedSectionItemType[];

class Store {
  systemLocale: string = "en";
  limit = 50;
  history: LinkInterface[] = [];

  constructor() {
    makeObservable(this, {
      history: observable,
      init: action.bound,
      increment: action.bound,
      decrement: action.bound,
      grouped: computed,
    });

    this.init();
  }

  /** Get history saved in local storage */
  async init() {
    this.systemLocale = getLocales()[0].languageCode || "en";

    const history = await _loadData("history");
    if (!!history && Array.isArray(history)) {
      this.history = history;
    }
  }

  /** Add new item in list */
  increment(item: LinkInterface) {
    if (this.history.length >= this.limit) {
      this.decrement();
    }

    this.history.push(item);
    _storeData("history", this.history);
  }

  /** Delete the old/new item of list */
  decrement(first: boolean = true) {
    first ? this.history.shift() : this.history.pop();
  }

  /**
   * Save history sorted of created_at in internal storage
   * The observer conflicts with sort. That's why I use map to create a copy of history, and only then do the sort
   * */
  get grouped() {
    return groupByDate(this.history, this.systemLocale);
  }
}

function groupByDate(arr: LinkInterface[], systemLocale: string) {
  // Sort by datetime -> my recent is in top
  arr = arr.slice().sort((a, b) => b.created_at - a.created_at);

  // Create object to group
  const grouped: groupedLinksType = {};

  // Get system locale to format date correctly
  const locale: string = systemLocale === "pt" ? "pt-BR" : "en-US";
  const localeOptions: any = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  // get today and yesterday dates for create custom section names
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const todayString = today.toLocaleDateString(locale, localeOptions);
  const yesterdayString = yesterday.toLocaleDateString(locale, localeOptions);

  arr.forEach((item) => {
    const date = new Date(item.created_at); // Extract date from timestamp
    const formattedDate = date.toLocaleDateString(locale, localeOptions); // Format date to long format (DD of MM of YYYY)

    // Verificar se a data é hoje ou ontem
    let groupKey;
    if (formattedDate === todayString) {
      groupKey = "HISTORY_DATA_Today";
    } else if (formattedDate === yesterdayString) {
      groupKey = "HISTORY_DATA_Yesterday";
    } else {
      groupKey = formattedDate;
    }

    if (!grouped[groupKey]) {
      // if is new grouped, create new grouped
      grouped[groupKey] = [];
    }

    grouped[groupKey].push(item);
  });

  // Convert object in SectionArray valid for use in SectionList react-native component
  const result: groupedSectionListType = Object.keys(grouped).map((key) => ({
    title: key,
    data: grouped[key],
  }));

  return result;
}

const historyStore = new Store();
// Create a React Context with the counter store instance.
export const HistoryStoreContext = React.createContext(historyStore);
export const useHistoryStore = () => React.useContext(HistoryStoreContext);
