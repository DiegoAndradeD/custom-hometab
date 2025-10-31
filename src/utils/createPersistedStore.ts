/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import type { StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { PersistOptions, StateStorage } from "zustand/middleware";

const chromeStorageAdapter: StateStorage = {
  getItem: (name: string): Promise<string | null> => {
    return new Promise((resolve) => {
      if (!chrome.storage || !chrome.storage.local) {
        resolve(null);
        return;
      }
      chrome.storage.local.get([name], (result: { [x: string]: any }) => {
        resolve(result[name] ? String(result[name]) : null);
      });
    });
  },
  setItem: (name: string, value: string): Promise<void> => {
    return new Promise((resolve) => {
      if (!chrome.storage || !chrome.storage.local) {
        resolve();
        return;
      }
      chrome.storage.local.set({ [name]: value }, () => {
        resolve();
      });
    });
  },
  removeItem: (name: string): Promise<void> => {
    return new Promise((resolve) => {
      if (!chrome.storage || !chrome.storage.local) {
        resolve();
        return;
      }
      chrome.storage.local.remove(name, () => {
        resolve();
      });
    });
  },
};

const isExtensionContext = (): boolean => {
  return !!(window.chrome && chrome.storage && chrome.storage.local);
};

export function createPersistedStore<T>(
  initializer: StateCreator<T, [["zustand/persist", unknown]], []>,
  key: string
) {
  const getStorage = (): StateStorage => {
    if (isExtensionContext()) {
      return chromeStorageAdapter;
    }

    return localStorage;
  };

  return create<T>()(
    persist(initializer, {
      name: key,
      storage: createJSONStorage(getStorage),
    } as PersistOptions<T>)
  );
}
