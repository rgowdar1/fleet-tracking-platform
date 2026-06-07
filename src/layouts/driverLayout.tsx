import { useState } from "react";
import { Outlet } from "react-router-dom";
import DriverSidebar from "../components/driver/driverSidebar";
import DriverHeader from "../components/driver/driverHeader";

export default function DriverLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <DriverSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col">
        <DriverHeader onOpenSidebar={() => setSidebarOpen(true)} />

        <main className="flex-1 bg-slate-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
