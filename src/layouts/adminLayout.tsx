import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/adminSidebar";
import AdminHeader from "../components/admin/adminHeader";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col">
        <AdminHeader onOpenSidebar={() => setSidebarOpen(true)} />

        <main className="flex-1 bg-slate-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
