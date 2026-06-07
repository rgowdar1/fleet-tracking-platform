import { configureStore } from "@reduxjs/toolkit";

import driverReducer from "../features/drivers/driverSlice";
import vehicleReducer from "../features/vehicles/vehicleSlice";
import hubReducer from "../features/hubs/hubSlice";
import allocationReducer from "../features/allocations/allocationSlice";
import orderSlice from "../features/orders/orderSlice";
import fleetReducer from "../features/fleet/fleetSlice";
import shiftReducer from "../features/shifts/shiftSlice";

export const store = configureStore({
  reducer: {
    drivers: driverReducer,
    vehicles: vehicleReducer,
    hubs: hubReducer,
    allocations: allocationReducer,
    orders: orderSlice,
    fleet: fleetReducer,
    shifts: shiftReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
