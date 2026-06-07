import { z } from "zod";

// Hub Schema
export const hubSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Hub name is required"),
  type: z.enum(["hub", "terminal"], {
    message: "Type must be hub or terminal",
  }),
  address: z.string().min(5, "Address must be at least 5 characters"),
  coordinates: z.object({
    lat: z.number().min(-90).max(90, "Invalid latitude"),
    lng: z.number().min(-180).max(180, "Invalid longitude"),
  }),
  inventory: z.object({
    diesel: z.number().min(0, "Diesel quantity cannot be negative"),
    petrol: z.number().min(0, "Petrol quantity cannot be negative"),
  }),
});

export type HubFormData = z.infer<typeof hubSchema>;

// Driver Schema
export const driverSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Driver name must be at least 2 characters"),
  license: z.string().min(5, "License number must be at least 5 characters"),
  phone: z
    .string()
    .regex(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
      "Invalid phone number format",
    ),
});

export type DriverFormData = z.infer<typeof driverSchema>;

// Vehicle Schema
export const vehicleSchema = z.object({
  id: z.string().optional(),
  registration: z
    .string()
    .min(5, "Registration number must be at least 5 characters"),
  capacity: z.number().min(1000, "Capacity must be at least 1000 liters"),
  type: z.enum(["Tanker", "Truck"], {
    message: "Type must be Tanker or Truck",
  }),
});

export type VehicleFormData = z.infer<typeof vehicleSchema>;

// Order Schema
export const orderSchema = z.object({
  id: z.string().optional(),
  destinationId: z.string().min(1, "Destination is required"),
  product: z.enum(["diesel", "petrol"], {
    message: "Product must be diesel or petrol",
  }),
  quantity: z.number().min(100, "Quantity must be at least 100 liters"),
  deliveryDate: z.string().refine((date) => {
    return new Date(date) > new Date();
  }, "Delivery date must be in the future"),
  assignedDriverId: z.string().optional(),
  assignedVehicleId: z.string().optional(),
  status: z
    .enum(["pending", "assigned", "in-progress", "completed", "failed"])
    .optional(),
});

export type OrderFormData = z.infer<typeof orderSchema>;

// Vehicle Allocation Schema
export const allocationSchema = z.object({
  id: z.string().optional(),
  driverId: z.string().min(1, "Driver is required"),
  vehicleId: z.string().min(1, "Vehicle is required"),
  date: z.string().refine((date) => {
    return new Date(date) >= new Date(new Date().setHours(0, 0, 0, 0));
  }, "Allocation date must be today or in the future"),
});

export type AllocationFormData = z.infer<typeof allocationSchema>;

// Order Status Filter Schema
export const orderFilterSchema = z.object({
  status: z
    .enum(["all", "pending", "assigned", "in-progress", "completed", "failed"])
    .optional(),
});

export type OrderFilterData = z.infer<typeof orderFilterSchema>;
