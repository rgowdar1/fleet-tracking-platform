import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type Vehicle } from "../../types/vehicle";
import { vehicles } from "../../data/vehicles";

const vehicleSlice = createSlice({
  name: "vehicles",
  initialState: vehicles as Vehicle[],

  reducers: {
    addVehicle: (state, action: PayloadAction<Vehicle>) => {
      state.push(action.payload);
    },

    updateVehicle: (state, action: PayloadAction<Vehicle>) => {
      const index = state.findIndex(
        (vehicle) => vehicle.id === action.payload.id,
      );

      if (index !== -1) {
        state[index] = action.payload;
      }
    },

    deleteVehicle: (state, action: PayloadAction<string>) => {
      return state.filter((vehicle) => vehicle.id !== action.payload);
    },
  },
});

export const { addVehicle, updateVehicle, deleteVehicle } =
  vehicleSlice.actions;

export default vehicleSlice.reducer;
