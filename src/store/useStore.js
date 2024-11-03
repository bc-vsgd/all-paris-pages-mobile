import { create } from "zustand";

const useStore = create((set) => ({
  userLocation: null,
  setUserLocation: (location) => set({ userLocation: location }),
}));

export default useStore;
