import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    vehicleId: "vehicle-1",
    driverId: "driver-1",
    lat: 12.9716,
    lng: 77.5946,
    status: "in-progress",
  },
];

const fleetSlice = createSlice({
  name: "fleet",
  initialState,
  reducers: {
    updateLocation: (state, action) => {
      const vehicle = state.find(
        (item) => item.vehicleId === action.payload.vehicleId,
      );

      if (vehicle) {
        vehicle.lat = action.payload.lat;

        vehicle.lng = action.payload.lng;
      }
    },
  },
});

export const { updateLocation } = fleetSlice.actions;

export default fleetSlice.reducer;
