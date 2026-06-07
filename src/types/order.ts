export type OrderStatus =
  | "pending"
  | "assigned"
  | "in-progress"
  | "completed"
  | "failed";

export interface Order {
  id: string;
  destinationId: string;
  product: string;
  quantity: number;
  deliveryDate: string;
  assignedDriverId?: string;
  assignedVehicleId?: string;
  status: OrderStatus;
}