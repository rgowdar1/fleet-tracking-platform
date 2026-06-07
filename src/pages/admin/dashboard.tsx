import { useMemo } from "react";
import AppLayout from "../../components/layout/appLayout";
import { useAppSelector } from "../../hooks/redux";
import StatsGrid from "../../components/dashboard/statsGrid";
import OrdersList from "../../components/dashboard/ordersList";
import QuickOverview from "../../components/dashboard/quickOverview";

export default function Dashboard() {
  const drivers = useAppSelector((state) => state.drivers);
  const vehicles = useAppSelector((state) => state.vehicles);
  const orders = useAppSelector((state) => state.orders);
  const hubs = useAppSelector((state) => state.hubs);
  const shifts = useAppSelector((state) => state.shifts);

  const today = new Date().toISOString().split("T")[0];

  const todayOrders = useMemo(
    () => orders.filter((o) => o.deliveryDate === today),
    [orders, today],
  );

  const activeShifts = useMemo(
    () => shifts.filter((s) => s.status === "active").length,
    [shifts],
  );

  const completedOrders = useMemo(
    () => orders.filter((o) => o.status === "completed").length,
    [orders],
  );

  const lowStockHubs = useMemo(
    () =>
      hubs.filter(
        (h) =>
          (h.inventory?.diesel ?? 0) < 5000 ||
          (h.inventory?.petrol ?? 0) < 5000,
      ).length,
    [hubs],
  );

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to the Fleet Tracking Platform</p>
      </div>

      <StatsGrid
        driversCount={drivers.length}
        vehiclesCount={vehicles.length}
        activeShifts={activeShifts}
        totalHubs={hubs.length}
        totalOrders={orders.length}
        completedOrders={completedOrders}
        lowStockHubs={lowStockHubs}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <OrdersList todayOrders={todayOrders} />
        </div>

        <div className="md:col-span-1">
          <QuickOverview />
        </div>
      </div>
    </AppLayout>
  );
}
