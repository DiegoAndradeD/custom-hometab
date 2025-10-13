import { create } from "zustand";
import type { StateCreator } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";
import type { PersistOptions } from "zustand/middleware";

export function createPersistedStore<T>(
  initializer: StateCreator<T, [["zustand/persist", unknown]], []>,
  key: string,
  storage: "local" | "session" = "local"
) {
  return create<T>()(
    persist(initializer, {
      name: key,
      storage: createJSONStorage(() =>
        storage === "session" ? sessionStorage : localStorage
      ),
    } as PersistOptions<T>)
  );
}
