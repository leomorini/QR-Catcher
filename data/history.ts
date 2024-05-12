import React from "react";
import { makeObservable, observable, action, computed } from "mobx";
import { _loadData, _storeData } from "@/services/api";
import { LinkInterface } from "@/services/interfaces";

class Store {
  limit = 50;
  history: LinkInterface[] = [];

  constructor() {
    makeObservable(this, {
      history: observable,
      init: action.bound,
      increment: action.bound,
      decrement: action.bound,
      sorted: computed,
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
  increment(item: LinkInterface) {
    if (this.history.length >= this.limit) {
      this.decrement();
    }

    this.history.push(item);
    _storeData('history', this.history);
  }

  /** Delete the old/new item of list */
  decrement(first: boolean = true) {
    first ? this.history.shift() : this.history.pop();
  }

  /**
   * Save history sorted of created_at in internal storage
   * The observer conflicts with sort. That's why I use map to create a copy of history, and only then do the sort
   * */
  get sorted() {
    const data = this.history.map((item) => item);
    return data.sort((a, b) => b.created_at - a.created_at);
  }
}

const historyStore = new Store();
// Create a React Context with the counter store instance.
export const HistoryStoreContext = React.createContext(historyStore);
export const useHistoryStore = () => React.useContext(HistoryStoreContext);
