# Fleet Tracking Platform

A comprehensive real-time fleet tracking and logistics management system built with React 19, TypeScript, and Redux for managing drivers, vehicles, hubs, and delivery orders.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Documentation](#documentation)
- [Mock Data](#mock-data)
- [Features Overview](#features-overview)
- [Contributing](#contributing)

---

## ✨ Features

### Admin Dashboard
- 📊 Real-time statistics (drivers, vehicles, orders, hubs)
- 🛣️ Fleet map with live vehicle tracking
- 📋 Master data management (drivers, vehicles, hubs)
- 📦 Order management with status filtering
- 🚗 Vehicle allocation with double-booking prevention
- 📦 Hub inventory management
- ✅ Comprehensive reporting

### Driver Portal
- 🗺️ Interactive map with destination routes
- 📋 Active orders and delivery tracking
- ⏱️ Shift management (start/end workflow)
- ✔️ Delivery completion/failure workflows
- 📱 GPS location updates
- 📜 Shift history and statistics

### Core Features
- ✅ Form validation with Zod schemas
- 🔄 Real-time state synchronization via Redux
- 🎨 Responsive design with Tailwind CSS
- 🗺️ Interactive maps with Leaflet
- 🔔 Toast notifications
- ⚠️ Error boundary with graceful fallbacks
- 🎯 Type-safe TypeScript throughout

---

## 🛠 Tech Stack

| Category | Technologies |
|----------|---------------|
| **Frontend** | React 19.2.6, TypeScript 6.0.2 |
| **Build** | Vite 8.0.12 |
| **State Management** | Redux Toolkit 2.12.0 |
| **Forms** | React Hook Form 7.77.0, Zod 4.4.3 |
| **Styling** | Tailwind CSS 4.3.0 |
| **Maps** | Leaflet 1.9.4, react-leaflet 5.0.0 |
| **UI Components** | Lucide React 1.17.0 |
| **Notifications** | Sonner 2.0.7 |
| **Routing** | React Router DOM 7.17.0 |
| **Package Manager** | npm 10.2.4 |

---

## 📁 Project Structure

```
fleet-tracking-platform/
├── src/
│   ├── components/           # Reusable React components
│   │   ├── admin/           # Admin-specific components
│   │   ├── dashboard/       # Dashboard-specific componenents
│   │   ├── driver/          # Driver-specific components
│   │   ├── forms/           # Form components with validation
│   │   ├── layout/          # Layout wrappers
│   │   ├── tables/          # Data table components
│   │   └── ui/              # Reusable UI components
│   ├── pages/               # Page components (routes)
│   │   ├── admin/           # Admin pages
│   │   ├── driver/          # Driver pages
│   ├── features/            # Redux slices
│   │   ├── drivers/
│   │   ├── vehicles/
│   │   ├── hubs/
│   │   ├── orders/
│   │   ├── allocations/
│   │   ├── shifts/
│   │   └── fleet/
│   ├── app/                 # Redux setup
│   │   ├── store.ts         # Redux store configuration
│   │   └── providers.tsx    # Redux provider
│   ├── hooks/               # Custom React hooks
│   ├── types/               # TypeScript type definitions
│   ├── data/                # Mock data
│   ├── utils/               # Utility functions
│   │   ├── schemas.ts       # Zod validation schemas
│   │   └── ...
│   ├── routes/              # Route configuration
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Public assets
├── docs/                    # Project documentation
│   ├── COMPONENTS.md        # Component architecture
│   ├── STATE_MANAGEMENT.md  # Redux patterns
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies
└── README.md                # This file
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm 10+

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/fleet-tracking-platform.git
cd fleet-tracking-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open in browser**
```
Base URL - http://localhost:5173
Admin Dashboard - http://localhost:5173/admin/dashboard
Driver Dashboard - http://localhost:5173/driver/dashboard

```

---

## 📝 Available Scripts

### Development
```bash
# Start Vite dev server with HMR
npm run dev
```

### Production Build
```bash
# Create optimized production build
npm run build
```

### Preview Build
```bash
# Preview production build locally
npm run preview
```

### Linting
```bash
# Run ESLint
npm run lint
```

---

## 📖 Documentation

### Component Architecture
See [docs/COMPONENTS.md](docs/COMPONENTS.md) for:
- Component directory structure
- Component descriptions and responsibilities
- Props patterns and interfaces
- Reusability patterns

### State Management
See [docs/STATE_MANAGEMENT.md](docs/STATE_MANAGEMENT.md) for:
- Redux slice documentation
- Action descriptions
- State structure and interfaces
- Usage examples and patterns
- Custom hooks documentation

## 📊 Mock Data

The application comes pre-loaded with comprehensive mock data:

### Data Volumes
- **10 Drivers** - Various statuses and locations
- **10 Vehicles** - Different capacities (6000-15000L)
- **10 Hubs/Terminals** - Across Karnataka region
- **8 Orders** - Various statuses (pending, assigned, in-progress, completed, failed)
- **8 Allocations** - Vehicle-to-order assignments

### Data Files
```
src/data/
├── drivers.ts       # Driver mock data
├── vehicles.ts      # Vehicle mock data
├── hubs.ts          # Hub/terminal locations
├── orders.ts        # Delivery orders
├── allocations.ts   # Order allocations
└── shifts.ts        # Shift management (runtime)
```

---

## 🎯 Features Overview

### Admin Features

#### Dashboard
- 9 metric cards (drivers, vehicles, orders, hubs, etc.)
- Order status overview
- Fleet utilization metrics
- Real-time statistics

#### Drivers Management
- ➕ Add drivers with validation
- 📋 Search across name, license, phone
- ✏️ Edit driver details
- 🗑️ Delete drivers
- 📍 View driver locations

#### Vehicles Management
- ➕ Register new vehicles
- 📋 Filter by status/type
- ✏️ Update vehicle details
- 🗑️ Remove vehicles
- 📦 View capacity and allocation

#### Hubs/Terminals
- ➕ Create new hubs
- 🗺️ Set coordinates
- 📦 Manage inventory
- ✏️ Update hub details
- 📊 View low-stock alerts

#### Orders
- ➕ Create delivery orders
- 🔍 Filter by status (pending, assigned, in-progress, completed, failed)
- ➕ Optional driver/vehicle assignment
- ✏️ Edit order details
- 📋 Track delivery progress

#### Vehicle Allocation
- ➕ Allocate vehicles to orders
- ⚠️ Double-booking prevention UI
- 📅 Schedule allocation date/time
- ✏️ Modify allocations
- 🗑️ Remove allocations

#### Fleet Map
- 🗺️ Live vehicle tracking
- 🔍 Filter by driver/vehicle/status
- 🛣️ Route visualization to destinations
- 📍 Hub terminal markers
- 🔄 Auto-refresh every 30 seconds
- 📈 Legend and metrics

#### Inventory
- 📦 Hub inventory tracking
- ⚠️ Low-stock highlighting
- 📊 Stock level trends
- 🔔 Stock alerts

### Driver Features

#### Dashboard
- ⏱️ Start/end shift buttons
- ✔️ Delivery status cards
- ✅ Complete delivery action
- ❌ Mark delivery failed
- 📝 Failure reason input
- 📍 GPS location updates

#### Driver Map
- 🗺️ Current vehicle location
- 📍 Destination markers
- 🛣️ Route polylines
- 📋 Active orders panel
- 🔍 Zoom to destination

#### Shift History
- 📜 Historical shifts list
- ⏱️ Shift duration calculation
- 📊 Deliveries completed/failed stats
- 🔍 Detailed shift view

## 🎨 Design System

### Color Palette
- **Primary** (Blue): #3B82F6 - Main actions, active states
- **Success** (Green): #10B981 - Completed orders, successful actions
- **Error** (Red): #EF4444 - Failed orders, validation errors
- **Warning** (Orange): #F59E0B - Alerts, low stock
- **Info** (Sky): #0EA5E9 - Informational messages

### Responsive Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

---


## 🐛 Known Limitations

1. **State Persistence**: Redux state resets on page refresh (no localStorage)
2. **Real-time Updates**: Mock data updates locally, no server sync
3. **Authentication**: No login/authentication system
4. **Offline Support**: No offline mode implemented
5. **API Integration**: All data is mock-based in-memory

---

## 🚀 Future Enhancements

- [ ] Backend API integration (Node.js/Express)
- [ ] Real-time updates via WebSocket
- [ ] User authentication and role-based access
- [ ] Redux-persist for state persistence
- [ ] Advanced analytics and reporting
- [ ] Mobile native app (React Native)
- [ ] Dark mode support
- [ ] Accessibility improvements (WCAG 2.1 AA)
- [ ] Performance optimization and code splitting
- [ ] Comprehensive unit and integration tests

---

## 👥 Contributors

- Rakshith R ( rgowdar1 ) - Initial development

---

## 📧 Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the development team.

---

**Last Updated**: June 2026
