import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type Order } from "../../types/order";
import { orders } from "../../data/orders";

const orderSlice = createSlice({
  name: "orders",
  initialState: orders as Order[],

  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.push(action.payload);
    },

    updateOrder: (state, action: PayloadAction<Order>) => {
      const index = state.findIndex((order) => order.id === action.payload.id);

      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    completeOrder: (state, action: PayloadAction<string>) => {
      const order = state.find((o) => o.id === action.payload);

      if (order) {
        order.status = "completed";
      }
    },
  },
});

export const { addOrder, updateOrder, completeOrder } = orderSlice.actions;

export default orderSlice.reducer;
