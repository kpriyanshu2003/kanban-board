import { create } from "zustand";

// false = light, true = dark
const useTheme = create((set) => ({
  theme: false,
  setTheme: (theme) => set({ theme }),
}));

const useDisplay = create((set) => ({
  grouping: "Status",
  ordering: "Priority",
  setGrouping: (grouping) => set({ grouping }),
  setOrdering: (ordering) => set({ ordering }),
}));

export { useTheme, useDisplay };
