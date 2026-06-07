import { type Allocation } from "../types/allocation";

const today = new Date().toISOString().split("T")[0];

export const allocations: Allocation[] = [
  {
    id: "alloc-1",
    driverId: "driver-1",
    vehicleId: "vehicle-1",
    date: today,
  },
  {
    id: "alloc-2",
    driverId: "driver-2",
    vehicleId: "vehicle-2",
    date: "2026-06-08",
  },
  {
    id: "alloc-3",
    driverId: "driver-3",
    vehicleId: "vehicle-3",
    date: "2026-06-12",
  },
  {
    id: "alloc-4",
    driverId: "driver-4",
    vehicleId: "vehicle-4",
    date: "2026-06-09",
  },
  {
    id: "alloc-5",
    driverId: "driver-5",
    vehicleId: "vehicle-5",
    date: "2026-06-11",
  },
  {
    id: "alloc-6",
    driverId: "driver-6",
    vehicleId: "vehicle-6",
    date: "2026-06-07",
  },
  {
    id: "alloc-7",
    driverId: "driver-7",
    vehicleId: "vehicle-7",
    date: "2026-06-14",
  },
  {
    id: "alloc-8",
    driverId: "driver-8",
    vehicleId: "vehicle-8",
    date: "2026-06-15",
  },
];