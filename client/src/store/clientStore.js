import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useClientStore = create(
  persist(
    (set, get) => ({
      currentTab: 'dashboard',
      client: {},
      recipeId: null,
      setRecipeId: (recipeId) => set((state) => ({ recipeId })),
      coffeeShopId: '',
      setCurrentTab: (tab) => set((state) => ({ currentTab: tab })),
      setCoffeeShopId: (coffeeShopId) => set((state) => ({ coffeeShopId })),
      setClient: (currentClient) => set((state) => ({ currentClient })),
      clearSession: () => {
        localStorage.removeItem('jwtClient');
        set((state) => ({
          currentTab: 'dashboard',
          client: {},
          coffeeShopId: '',
        }));
      },
    }),
    {
      name: 'client-store', 
      version: '1.0.6', 
      storage: createJSONStorage(() => localStorage),
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !['currentTab', 'recipeId'].includes(key))
        ),
    }
  )
);

export default useClientStore;
