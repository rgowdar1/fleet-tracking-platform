# Component Architecture

## Directory Structure

```
src/
├── components/
│   ├── admin/
│   │   ├── adminHeader.tsx
│   │   └── adminSidebar.tsx
│   ├── driver/
│   │   ├── driverHeader.tsx
│   │   └── driverSidebar.tsx
│   ├── forms/
│   │   ├── driverForm.tsx
│   │   ├── orderForm.tsx
│   │   ├── vehicleAllocationForm.tsx
│   │   ├── hubForm.tsx
│   │   └── vehicleForm.tsx
│   ├── layout/
│   │   └── appLayout.tsx
│   ├── tables/
│   │   ├── allocationTable.tsx
│   │   ├── inventoryTable.tsx
│   │   └── ordersTable.tsx
│   └── ui/
│       ├── pageHeader.tsx
│       ├── searchInput.tsx
│       ├── statsCard.tsx
│       └── errorBoundary.tsx
```

## Component Overview

### Forms (`src/components/forms/`)

#### `driverForm.tsx`
- **Purpose**: Create and update driver records
- **Inputs**: License plate, phone number, vehicle type
- **Integration**: Redux dispatch to `driverSlice`
- **Validation**: Zod schema with phone format validation
- **Features**: Toast notifications on success/error

#### `hubForm.tsx`
- **Purpose**: Create/update hub/terminal locations
- **Inputs**: Hub name, address, coordinates, inventory items
- **Integration**: Redux dispatch to `hubSlice`
- **Validation**: Nested object validation for coordinates, inventory
- **Features**: Multiple inventory items with quantity tracking

#### `vehicleForm.tsx`
- **Purpose**: Register new vehicles
- **Inputs**: Vehicle model, capacity, registration number
- **Integration**: Redux dispatch to `vehicleSlice`
- **Validation**: Minimum capacity enforcement

#### `orderForm.tsx`
- **Purpose**: Create delivery orders
- **Inputs**: Hub selection, optional driver/vehicle assignment
- **Integration**: Redux dispatch to `orderSlice`
- **Validation**: Automatic status determination based on assignment
- **Features**: Real-time form updates

#### `vehicleAllocationForm.tsx`
- **Purpose**: Assign vehicles to orders with conflict detection
- **Inputs**: Order, vehicle, allocation date/time
- **Integration**: Redux dispatch with double-booking check
- **Features**: Real-time conflict detection UI

### UI Components (`src/components/ui/`)

#### `errorBoundary.tsx`
- **Type**: Class component
- **Purpose**: Catch React errors and display fallback UI
- **Features**: Error details display, recovery button
- **Usage**: Wrapper for entire app

#### `pageHeader.tsx`
- **Purpose**: Standardized page title and description
- **Props**: `title`, `description`
- **Usage**: Top of every admin page

#### `searchInput.tsx`
- **Purpose**: Reusable search/filter input
- **Props**: `placeholder`, `onSearch`
- **Usage**: Lists (drivers, vehicles, orders)

#### `statsCard.tsx`
- **Purpose**: Display metric with icon
- **Props**: `icon`, `label`, `value`, `color`
- **Usage**: Dashboard cards

#### `emptyState.tsx`
- **Purpose**: Display when no data available
- **Props**: `message`, `link`
- **Usage**: Empty tables and lists

### Layout Components (`src/layouts/`)

#### `adminLayout.tsx`
- **Components**: AdminHeader + AdminSidebar + main content
- **Navigation**: Admin menu with links to all pages
- **Responsive**: Sidebar collapse on mobile

#### `driverLayout.tsx`
- **Components**: DriverHeader + DriverSidebar + main content
- **Navigation**: Driver menu (Dashboard, Map, History)
- **Responsive**: Mobile-friendly sidebar

### Header/Sidebar Components

#### `adminHeader.tsx`
- **Features**: Logo, navigation, user menu
- **Integration**: Redux for user state

#### `adminSidebar.tsx`
- **Links**: Dashboard, Drivers, Vehicles, Hubs, Orders, Vehicle Allocation, Fleet Map, Inventory
- **Active state**: Highlights current page

#### `driverHeader.tsx`
- **Features**: Logo, driver name, logout
- **Integration**: Redux shifts state

#### `driverSidebar.tsx`
- **Links**: Dashboard, Map, Shift History
- **Status**: Shows current shift status

## Component Hierarchy

```
App
├── ErrorBoundary
│   ├── Layout (Admin/Driver)
│   │   ├── Header
│   │   ├── Sidebar
│   │   └── Page Content
│   │       ├── PageHeader
│   │       ├── Forms (conditional)
│   │       ├── Tables (DataTable/OrdersTable/AllocationTable)
│   │       └── Maps (conditionally rendered)
│   └── Routes
└── Toaster (Sonner)
```

## Component Props Pattern

All forms follow this pattern:
```typescript
interface FormProps {
  initialData?: Entity;
  onSuccess?: () => void;
}
```

All tables follow:
```typescript
interface TableProps {
  data: Entity[];
  onEdit?: (item: Entity) => void;
  onDelete?: (id: string) => void;
}
```

## Reusability Patterns

### Forms
- Validation via Zod schemas
- Redux state persistence
- Toast notifications
- Consistent error display

### Tables
- Sortable columns
- Pagination support
- Row selection (optional)
- Responsive design

### UI Components
- Tailwind styling for consistency
- Lucide React icons
- Accessible color contrasts
- Mobile-responsive

## State Management Integration

Forms dispatch to Redux slices:
- `driverSlice.addDriver()`
- `vehicleSlice.addVehicle()`
- `hubSlice.addHub()`
- `orderSlice.addOrder()`
- `allocationSlice.addAllocation()`

Tables read from Redux selectors:
- `useAppSelector(selectAllDrivers)`
- `useAppSelector(selectAllVehicles)`
- `useAppSelector(selectAllOrders)`
- etc.

## Styling Approach

- **Tailwind CSS**: Utility-first styling
- **Color Scheme**: Blue primary, green success, red error, orange warning
- **Responsive**: Mobile-first breakpoints (sm, md, lg, xl)
- **Accessibility**: WCAG 2.1 AA compliant colors

## Future Improvements

- Component tests with Vitest
- Storybook integration for component library
- TypeScript strict mode improvements
- Performance optimization with React.memo
- Accessibility enhancements (ARIA labels, keyboard navigation)
