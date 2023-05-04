import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useClientStore = create(
  persist(
    (set, get) => ({
      currentTab: 'dashboard',
      client: {},
      coffeeShopId: '',
      setCurrentTab: (tab) => set((state) => ({ currentTab: tab })),
      setCoffeeShopId: (coffeeShopId) => set((state) => ({ coffeeShopId })),
      setClient: (currentClient) => set((state) => ({ currentClient })),
      clearSession: () => {
        localStorage.clear();
        set((state) => ({
          currentTab: 'dashboard',
          client: {},
          coffeeShopId: '',
        }));
      },
    }),
    {
      name: 'client-store', // Name of the item in the storage (must be unique)
      version: '1.0.6', // Optional version number for migrations
      storage: createJSONStorage(() => localStorage), // Optional storage type (defaults to localStorage)
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !['currentTab'].includes(key))
        ),
    }
  )
);

export default useClientStore;
