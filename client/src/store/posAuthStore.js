import { create } from 'zustand';
import zukeeper from 'zukeeper';
import { persist, createJSONStorage } from 'zustand/middleware';

const usePosAuthStore = create(
    persist(
      (set, get) => ({
        employeeId: null,
        employeeName: null,
        employeeRole: null,
        isAuthenticated: false,
        coffeeShopId: null,
        setCoffeeShopId: (coffeeShopId) => set((state) => ({ coffeeShopId })),
        login: (employeeId, employeeName, employeeRole) => {
          set((state) => ({
            employeeId,
            employeeName,
            employeeRole,
            isAuthenticated: true,
          }));
        },
        logout: () => {
          set((state) => ({
            employeeRole: null,
            isAuthenticated: false,
            employeeId: null,
            employeeName: null,
          }));
        },
      }),

      {
        name: 'pos-auth-storage',
        version: '1.0.0',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(([key]) => ![].includes(key))
          ),
      }
    )
  
);

window.store = usePosAuthStore;

export default usePosAuthStore;
