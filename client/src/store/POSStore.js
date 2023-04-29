import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import { fetchEmployees } from '../api/coffeeShopAPI';

const usePOSStore = create(
  devtools(
    persist(
      (set, get) => ({
        currentEmployee: {},
        employees: [],
        coffeeShopKey: "",
        setCoffeeShopKey: (coffeeShopKey) => set((state) => ({ coffeeShopKey })),
        setEmployees: (employees) => set((state) => ({ employees })),
        setCurrentEmployee: (currentEmployee) => set((state) => ({ currentEmployee })),
        fetchEmployees: async () => {
          const response = await fetchEmployees(get().coffeeShopKey);
          set({ employees: response.data });
        }
      }),
      {
        name: 'pos-store', // Name of the item in the storage (must be unique)
        version: "1.0.5", // Optional version number for migrations
        storage: createJSONStorage(() => localStorage), // Optional storage type (defaults to localStorage)
      }
    )
  )
);

export default usePOSStore;
