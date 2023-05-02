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
        coffeeShopId:0,
        currentCategory:{},
        currentOrder:{},
        currentRecipe:{},
        orderedProducts:[],
        kitchen:{},
        setKitchen: (kitchen) => set((state) => ({ kitchen })),
        clearOrderedProducts: ()=>set((state)=>({orderedProducts:[]})),
        addProduct:(product)=>set(state=>({orderedProducts:[ ...state.orderedProducts , product]})),
        setOrderedProducts:(products)=>set(state=>({orderedProducts:[ ...orderedProducts]})),
        setCoffeeShopKey: (coffeeShopKey) => set((state) => ({ coffeeShopKey })),
        setCurrentCategory: (currentCategory) => set((state) => ({ currentCategory})),
        setCurrentPrinter: (printer) => set((state) => ({ currentPrinter: printer})),
        setEmployees: (employees) => set((state) => ({ employees })),
        removeProduct: (productId) =>
    set((state) => {
      const productIndex = state.orderedProducts.findIndex((product) => product.id === productId);

      if (productIndex !== -1) {
        state.orderedProducts.splice(productIndex, 1);
        return { ...state, orderedProducts: [...state.orderedProducts] };
      }

      return state;
    }),
        setCurrentEmployee: (currentEmployee) => set((state) => ({ currentEmployee })),
        fetchEmployees: async () => {
          const response = await fetchEmployees(get().coffeeShopKey);
          set({ employees: response.data.employees });
          set({ coffeeShopId: response.data.coffeeShopId });
        },
        clearSession: ()=>set((state)=>({currentEmployee:{}, orderedProducts:[], currentOrder:{}, currentCategory:{}})),
      }),
      {
        name: 'pos-store', // Name of the item in the storage (must be unique)
        version: "1.0.5", // Optional version number for migrations
        storage: createJSONStorage(() => localStorage), // Optional storage type (defaults to localStorage)
        partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !['currentCategory', 'kitchen'].includes(key))
        ),
      }
    )
  )
);

export default usePOSStore;
