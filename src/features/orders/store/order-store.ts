import { create } from "zustand";
import type { Order } from "@/types";

interface OrderStore {
  orders: Order[];
  selectedOrder: Order | null;
  isLoading: boolean;
  setOrders: (orders: Order[]) => void;
  setSelectedOrder: (order: Order | null) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  selectedOrder: null,
  isLoading: false,
  setOrders: (orders) => set({ orders }),
  setSelectedOrder: (selectedOrder) => set({ selectedOrder }),
  setLoading: (isLoading) => set({ isLoading }),
}));
