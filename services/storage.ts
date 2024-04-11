import React from "react";
import { makeObservable, observable, action } from "mobx";
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
    });

    this.init();
  }

  async init() {
    const history = await _loadData('history');
    if (!!history && Array.isArray(history)) {
      this.history = history;
    }
  }

  historyIncrement(item:LinkInterface) {
    if (this.history.length >= this.limit) {
      this.historyDecrement();
    }

    this.history.push(item);
    _saveHistory(this.history);
  }

  historyDecrement(first:boolean = true) {
    first ? this.history.shift() : this.history.pop();
  }
}

const storageStore = new StorageStore();
// Create a React Context with the counter store instance.
export const StorageStoreContext = React.createContext(storageStore);
export const useStorageStore = () => React.useContext(StorageStoreContext);
