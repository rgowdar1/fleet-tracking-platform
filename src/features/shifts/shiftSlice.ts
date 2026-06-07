import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { type Shift } from "../../types/shift";

const initialState: Shift[] = [
  {
    id: "shift-1",
    driverId: "driver-1",
    vehicleId: "vehicle-1",
    startTime: new Date().toISOString(),
    status: "active",
  },
];

const shiftSlice = createSlice({
  name: "shifts",
  initialState,

  reducers: {
    startShift: (state, action: PayloadAction<Shift>) => {
      state.push(action.payload);
    },

    endShift: (state, action: PayloadAction<string>) => {
      const shift = state.find((s) => s.id === action.payload);

      if (shift) {
        shift.status = "completed";
        shift.endTime = new Date().toISOString();
      }
    },
  },
});

export const { startShift, endShift } = shiftSlice.actions;

export default shiftSlice.reducer;
