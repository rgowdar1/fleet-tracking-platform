# State Management Architecture

## Overview

Fleet Tracking Platform uses **Redux Toolkit** for global state management. This ensures predictable, scalable state across the entire application.

## Redux Slices

### 1. Drivers (`src/features/drivers/driverSlice.ts`)

**State:**
```typescript
interface Driver {
  id: string;
  name: string;
  license: string;
  phone: string;
  status: 'active' | 'inactive' | 'on_leave';
  currentLocation: { latitude: number; longitude: number };
  assignedVehicle?: string;
}
```

**Actions:**
- `addDriver(driver)` - Add new driver
- `updateDriver(driver)` - Update driver info
- `deleteDriver(id)` - Remove driver
- `updateDriverLocation(id, location)` - Update GPS location

**Initial State:** 10 mock drivers

---

### 2. Vehicles (`src/features/vehicles/vehicleSlice.ts`)

**State:**
```typescript
interface Vehicle {
  id: string;
  model: string;
  capacity: number;
  registrationNumber: string;
  status: 'active' | 'maintenance' | 'inactive';
  currentLocation?: { latitude: number; longitude: number };
}
```

**Actions:**
- `addVehicle(vehicle)` - Register new vehicle
- `updateVehicle(vehicle)` - Update vehicle details
- `deleteVehicle(id)` - Remove vehicle
- `updateVehicleLocation(id, location)` - Track location

**Initial State:** 10 mock vehicles

---

### 3. Hubs (`src/features/hubs/hubSlice.ts`)

**State:**
```typescript
interface Hub {
  id: string;
  name: string;
  address: string;
  coordinates: { latitude: number; longitude: number };
  inventory: { itemId: string; quantity: number }[];
}
```

**Actions:**
- `addHub(hub)` - Create terminal
- `updateHub(hub)` - Update hub details
- `deleteHub(id)` - Remove hub
- `updateInventory(id, items)` - Update stock levels

**Initial State:** 10 mock hubs

---

### 4. Orders (`src/features/orders/orderSlice.ts`)

**State:**
```typescript
interface Order {
  id: string;
  sourceHub: string;
  destinationHub: string;
  items: { itemId: string; quantity: number }[];
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'failed';
  assignedDriver?: string;
  assignedVehicle?: string;
  estimatedDelivery: Date;
  failureReason?: string;
}
```

**Actions:**
- `addOrder(order)` - Create delivery order
- `updateOrder(order)` - Update order details
- `completeOrder(id)` - Mark as completed
- `failOrder(id, reason)` - Mark as failed

**Initial State:** 8 mock orders

---

### 5. Allocations (`src/features/allocations/allocationSlice.ts`)

**State:**
```typescript
interface Allocation {
  id: string;
  orderId: string;
  vehicleId: string;
  driverId: string;
  allocationDate: Date;
  allocationTime: string;
  status: 'pending' | 'assigned' | 'completed';
}
```

**Actions:**
- `addAllocation(allocation)` - Assign vehicle to order
- `removeAllocation(id)` - Cancel allocation
- `updateAllocationStatus(id, status)` - Update status

**Initial State:** 8 mock allocations

---

### 6. Shifts (`src/features/shifts/shiftSlice.ts`)

**State:**
```typescript
interface Shift {
  id: string;
  driverId: string;
  startTime: Date;
  endTime?: Date;
  status: 'active' | 'completed' | 'cancelled';
  deliveriesCompleted: number;
  deliveriesFailed: number;
}
```

**Actions:**
- `startShift(driverId)` - Begin shift
- `endShift(id)` - End shift
- `updateShiftStats(id, stats)` - Update delivery stats

**Initial State:** Empty (created at runtime)

---

### 7. Fleet (`src/features/fleet/fleetSlice.ts`)

**State:**
```typescript
interface FleetState {
  activeVehicles: number;
  totalCapacity: number;
  currentLocations: Map<string, Location>;
}
```

**Actions:**
- `updateLocation(vehicleId, location)` - Update GPS
- `updateFleetStats()` - Calculate metrics

**Used For:** Dashboard and fleet map real-time updates

---

## Data Flow

```
User Action (Form Submit)
  ↓
Component dispatches Redux action
  ↓
Reducer updates state
  ↓
Selectors derive computed state
  ↓
Components re-render via useAppSelector hook
```

## Selectors

Each slice exports selectors for efficient state access:

```typescript
// Driver selectors
export const selectAllDrivers = (state) => state.drivers.items;
export const selectDriverById = (state, id) => state.drivers.items.find(d => d.id === id);
export const selectActiveDrivers = (state) => state.drivers.items.filter(d => d.status === 'active');

// Vehicle selectors
export const selectAllVehicles = (state) => state.vehicles.items;
export const selectAvailableVehicles = (state) => state.vehicles.items.filter(v => v.status === 'active');

// Order selectors
export const selectAllOrders = (state) => state.orders.items;
export const selectOrdersByStatus = (state, status) => state.orders.items.filter(o => o.status === status);

// Similar patterns for Hubs, Allocations, Shifts, Fleet
```

## Custom Hooks

### `useAppSelector`
Typed wrapper around Redux `useSelector`:

```typescript
import { useAppSelector } from '../hooks/redux';

const drivers = useAppSelector(selectAllDrivers);
const activeOrders = useAppSelector(state => 
  selectOrdersByStatus(state, 'in_progress')
);
```

### `useAppDispatch`
Typed wrapper around Redux `dispatch`:

```typescript
import { useAppDispatch } from '../hooks/redux';

const dispatch = useAppDispatch();
dispatch(addDriver(newDriver));
```

## Usage Examples

### Adding Data

```typescript
// In a form component
const dispatch = useAppDispatch();

const handleSubmit = (data) => {
  const newDriver = {
    id: Date.now().toString(),
    ...data,
    status: 'active'
  };
  dispatch(addDriver(newDriver));
  toast.success('Driver added!');
};
```

### Reading Data

```typescript
// In any component
const drivers = useAppSelector(selectAllDrivers);
const orders = useAppSelector(selectAllOrders);

return (
  <div>
    {drivers.map(driver => (
      <div key={driver.id}>{driver.name}</div>
    ))}
  </div>
);
```

### Updating Data

```typescript
// Update existing record
const handleUpdate = (updatedDriver) => {
  dispatch(updateDriver(updatedDriver));
  toast.success('Driver updated!');
};
```

### Filtering with Selectors

```typescript
// Select only completed orders
const completedOrders = useAppSelector(state =>
  selectOrdersByStatus(state, 'completed')
);

// Select low-stock hubs
const lowStockHubs = useAppSelector(state =>
  state.hubs.items.filter(hub => 
    hub.inventory.some(item => item.quantity < 100)
  )
);
```

## Advanced Patterns

### Computing Derived State

```typescript
// Dashboard stats
const dashboardStats = useAppSelector(state => ({
  totalDrivers: state.drivers.items.length,
  activeDrivers: state.drivers.items.filter(d => d.status === 'active').length,
  completedOrders: state.orders.items.filter(o => o.status === 'completed').length,
  failedOrders: state.orders.items.filter(o => o.status === 'failed').length,
}));
```

### Conditional Updates

```typescript
// Don't add duplicate allocations
const addAllocationWithCheck = (allocation) => (dispatch, getState) => {
  const state = getState();
  const exists = state.allocations.items.find(a => 
    a.orderId === allocation.orderId && 
    a.vehicleId === allocation.vehicleId
  );
  
  if (!exists) {
    dispatch(addAllocation(allocation));
  } else {
    toast.error('Vehicle already allocated to this order');
  }
};
```

## Performance Optimization

### Memoization

```typescript
import { useMemo } from 'react';

function DriverList() {
  const drivers = useAppSelector(selectAllDrivers);
  
  // Memoize filtered results
  const activeDrivers = useMemo(() => 
    drivers.filter(d => d.status === 'active'),
    [drivers]
  );
  
  return <div>{activeDrivers.map(/* ... */)}</div>;
}
```

### Selector Memoization

Consider using Reselect for expensive computations:

```typescript
import { createSelector } from '@reduxjs/toolkit';

export const selectDriverStats = createSelector(
  [selectAllDrivers],
  (drivers) => ({
    total: drivers.length,
    active: drivers.filter(d => d.status === 'active').length,
  })
);
```

## Debugging

### Redux DevTools

Monitor all state changes in Redux DevTools browser extension:

```typescript
// Actions are logged with current state before/after
// Time-travel debugging available
// Action history inspection
```

### Logging State

```typescript
// In components
useEffect(() => {
  console.log('Current drivers:', drivers);
}, [drivers]);

// Or use Redux middleware for global logging
```

## Testing Redux Logic

```typescript
import { configureStore } from '@reduxjs/toolkit';
import driverSlice from './driverSlice';

describe('driverSlice', () => {
  let store;
  
  beforeEach(() => {
    store = configureStore({
      reducer: { drivers: driverSlice }
    });
  });
  
  it('should add a driver', () => {
    const newDriver = { id: '1', name: 'John', /* ... */ };
    store.dispatch(addDriver(newDriver));
    
    const state = store.getState();
    expect(state.drivers.items).toContainEqual(newDriver);
  });
});
```

## Future Enhancements

1. **Redux Persist** - Save state to localStorage
2. **Async Thunks** - For real API integration
3. **Middleware** - Custom logging, analytics
4. **Normalized State** - Use Normalizr for deeply nested data
5. **Real-time Updates** - WebSocket integration
6. **Time-travel Debugging** - Enhanced DevTools experience

