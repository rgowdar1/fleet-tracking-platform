import { createSlice } from "@reduxjs/toolkit";
import { type PayloadAction } from "@reduxjs/toolkit";
import { type Driver } from "../../types/driver";
import { drivers } from "../../data/drivers";

const driverSlice = createSlice({
  name: "drivers",
  initialState: drivers,
  reducers: {
    addDriver: (state, action: PayloadAction<Driver>) => {
      state.push(action.payload);
    },

    updateDriver: (state, action: PayloadAction<Driver>) => {
      const index = state.findIndex(
        (driver) => driver.id === action.payload.id,
      );

      if (index !== -1) {
        state[index] = action.payload;
      }
    },

    deleteDriver: (state, action: PayloadAction<string>) => {
      return state.filter((driver) => driver.id !== action.payload);
    },
  },
});

export const { addDriver, updateDriver, deleteDriver } = driverSlice.actions;

export default driverSlice.reducer;
