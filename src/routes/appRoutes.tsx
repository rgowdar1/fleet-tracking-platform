import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/admin/dashboard";
import Drivers from "../pages/admin/drivers";
import VehicleAllocation from "../pages/admin/vehicleAllocation";
import Orders from "../pages/admin/orders";
import Hubs from "../pages/admin/hubs";
import Vehicles from "../pages/admin/vehicles";
import Inventory from "../pages/admin/inventory";
import FleetMap from "../pages/admin/fleetMap";

import DriverLayout from "../layouts/driverLayout";
import DriverDashboard from "../pages/driver/driverDashboard";
import DriverMap from "../pages/driver/driverMap";
import ShiftHistory from "../pages/driver/shiftHistory";

import AdminLayout from "../layouts/adminLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="hubs" element={<Hubs />} />
          <Route path="orders" element={<Orders />} />
          <Route path="allocations" element={<VehicleAllocation />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="map" element={<FleetMap />} />
        </Route>

        {/* Driver Routes */}
        <Route path="/driver" element={<DriverLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DriverDashboard />} />
          <Route path="map" element={<DriverMap />} />
          <Route path="history" element={<ShiftHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
