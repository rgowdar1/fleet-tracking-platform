import StatsCard from "../ui/statsCard";

type Props = {
  driversCount: number;
  vehiclesCount: number;
  activeShifts: number;
  totalHubs: number;
  totalOrders: number;
  completedOrders: number;
  lowStockHubs: number;
};

export default function StatsGrid({
  driversCount,
  vehiclesCount,
  activeShifts,
  totalHubs,
  totalOrders,
  completedOrders,
  lowStockHubs,
}: Props) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 auto-rows-fr">
        <StatsCard title="Drivers" value={driversCount} icon="👥" />
        <StatsCard title="Vehicles" value={vehiclesCount} icon="🚚" />
        <StatsCard title="Active Shifts" value={activeShifts} icon="▶️" />
        <StatsCard title="Total Hubs" value={totalHubs} icon="📍" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 auto-rows-fr">
        <StatsCard title="Total Orders" value={totalOrders} icon="📦" />
        <StatsCard title="Completed" value={completedOrders} icon="✅" />
        <StatsCard title="Low Stock Hubs" value={lowStockHubs} icon="⚠️" />
      </div>
    </>
  );
}
