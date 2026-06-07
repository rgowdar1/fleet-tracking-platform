import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Allocation } from "../../types/allocation";
import { allocations } from "../../data/allocations";

const initialState: Allocation[] = allocations;

const allocationSlice = createSlice({
  name: "allocations",
  initialState,

  reducers: {
    addAllocation: (state, action: PayloadAction<Allocation>) => {
      state.push(action.payload);
    },

    removeAllocation: (state, action: PayloadAction<string>) => {
      return state.filter((allocation) => allocation.id !== action.payload);
    },
  },
});

export const { addAllocation, removeAllocation } = allocationSlice.actions;

export default allocationSlice.reducer;
