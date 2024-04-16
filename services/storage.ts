import React from "react";
import { makeObservable, observable, action, computed } from "mobx";
import { _loadData, _saveHistory } from "@/services/api";
import { LinkInterface } from "@/services/interfaces";

class StorageStore {
  limit = 20;
  history: LinkInterface[] = [];

  constructor() {
    makeObservable(this, {
      history: observable,
      init: action.bound,
      historyIncrement: action.bound,
      historyDecrement: action.bound,
      historySorted: computed,
    });

    this.init();
  }

  /** Get history saved in local storage */
  async init() {
    const history = await _loadData("history");
    if (!!history && Array.isArray(history)) {
      this.history = history;
    }
  }

  /** Add new item in list */
  historyIncrement(item: LinkInterface) {
    if (this.history.length >= this.limit) {
      this.historyDecrement();
    }

    this.history.push(item);
    _saveHistory(this.history);
  }

  /** Delete the old/new item of list */
  historyDecrement(first: boolean = true) {
    first ? this.history.shift() : this.history.pop();
  }

  /**
   * Save history sorted of created_at in internal storage
   * The observer conflicts with sort. That's why I use map to create a copy of history, and only then do the sort
   * */
  get historySorted() {
    const data = this.history.map((item) => item);
    return data.sort((a, b) => b.created_at - a.created_at);
  }
}

const storageStore = new StorageStore();
// Create a React Context with the counter store instance.
export const StorageStoreContext = React.createContext(storageStore);
export const useStorageStore = () => React.useContext(StorageStoreContext);
