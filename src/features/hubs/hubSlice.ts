import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type Hub } from "../../types/hub";
import { hubs } from "../../data/hubs";

const hubSlice = createSlice({
  name: "hubs",
  initialState: hubs as Hub[],

  reducers: {
    addHub: (state, action: PayloadAction<Hub>) => {
      state.push(action.payload);
    },

    updateHub: (state, action: PayloadAction<Hub>) => {
      const index = state.findIndex((hub) => hub.id === action.payload.id);

      if (index !== -1) {
        state[index] = action.payload;
      }
    },

    deleteHub: (state, action: PayloadAction<string>) => {
      return state.filter((hub) => hub.id !== action.payload);
    },
    updateInventory: (state, action) => {
      const hub = state.find((h) => h.id === action.payload.destinationId);

      if (hub) {
        hub.inventory.diesel += action.payload.quantity;
      }
    },
  },
});

export const { addHub, updateHub, deleteHub, updateInventory } =
  hubSlice.actions;

export default hubSlice.reducer;
