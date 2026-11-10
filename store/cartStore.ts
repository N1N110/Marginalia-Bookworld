import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Book } from "../data/products";

type CartItem = {
  book: Book;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  increaseQuantity: (bookId: string) => void;
  decreaseQuantity: (bookId: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addToCart: (book) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.book.id === book.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.book.id === book.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { book, quantity: 1 }],
          };
        }),

      removeFromCart: (bookId) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.book.id !== bookId
          ),
        })),

      increaseQuantity: (bookId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.book.id === bookId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      decreaseQuantity: (bookId) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.book.id === bookId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "marginalia-cart",
    }
  )
);