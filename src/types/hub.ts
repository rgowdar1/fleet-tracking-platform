export interface Inventory {
  diesel: number;
  petrol: number;
}

export interface Hub {
  id: string;
  name: string;
  type: "hub" | "terminal";
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  inventory: Inventory;
}