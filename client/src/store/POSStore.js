import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import zukeeper from 'zukeeper';

const usePosStore = create(
  persist((set, get) => ({
    currentEmployee: {},
    employees: [],

    coffeeShopId: '',

    currentCategory: {},
    selectedOrder: {},
    currentOrder: {},
    recipeId: {},
    orderedProducts: [],
    kitchen: {},
    isReceiptTerminated: false,
    defaultPrinter:null,
    setDefaultPrinter: (printer) => set((state) => ({ defaultPrinter: printer })),
    setIsReceiptTerminated: (isReceiptTerminated) => set((state) => ({ isReceiptTerminated })),

    setCoffeeShopId: (coffeeShopId) => set((state) => ({ coffeeShopId })),
    setSelectedOrder: (order)=>set((state)=>({selectedOrder:order})),
    setKitchen: (kitchen) => set((state) => ({ kitchen })),
    setRecipeId: (recipeId) => set((state) => ({ recipeId })),
    clearOrderedProducts: () => set((state) => ({ orderedProducts: [] })),
    addProduct: (product) =>
      set((state) => ({
        orderedProducts: [...state.orderedProducts, product],
      })),

    setCurrentCategory: (currentCategory) =>
      set((state) => ({ currentCategory })),
    setCurrentPrinter: (printer) =>
      set((state) => ({ currentPrinter: printer })),
    setEmployees: (employees) => set((state) => ({ employees })),
    removeProduct: (productId) =>
      set((state) => {
        const productIndex = state.orderedProducts.findIndex(
          (product) => product.id === productId
        );

        if (productIndex !== -1) {
          state.orderedProducts.splice(productIndex, 1);
          return { ...state, orderedProducts: [...state.orderedProducts] };
        }

        return state;
      }),
    setCurrentEmployee: (currentEmployee) =>
      set((state) => ({ currentEmployee })),

    clearSession: () =>
      set((state) => ({
        coffeeShopId: null,
        orderedProducts: [],
        currentOrder: {},
        currentCategory: {},
      })),
  }),
      {
        name: 'pos-storage',
        version: '1.0.0',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(([key]) => !['selectedOrder', 'currentCategory'].includes(key))
          ),
      }
  )
);


export default usePosStore;
