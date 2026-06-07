import { useState, useEffect, useMemo, Fragment } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import AppLayout from "../../components/layout/appLayout";
import PageHeader from "../../components/ui/pageHeader";
import { useAppSelector } from "../../hooks/redux";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function FleetMap() {
  const fleet = useAppSelector((state) => state.fleet);
  const drivers = useAppSelector((state) => state.drivers);
  const vehicles = useAppSelector((state) => state.vehicles);
  const orders = useAppSelector((state) => state.orders);
  const hubs = useAppSelector((state) => state.hubs);

  const [filterDriver, setFilterDriver] = useState<string>("all");
  const [filterVehicle, setFilterVehicle] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const filteredFleet = useMemo(
    () =>
      fleet.filter((item) => {
        if (filterDriver !== "all" && item.driverId !== filterDriver)
          return false;
        if (filterVehicle !== "all" && item.vehicleId !== filterVehicle)
          return false;
        if (filterStatus !== "all" && item.status !== filterStatus)
          return false;
        return true;
      }),
    [fleet, filterDriver, filterVehicle, filterStatus]
  );

  const getDriverName = (driverId: string) =>
    drivers.find((d) => d.id === driverId)?.name || "Unknown";

  const getVehicleReg = (vehicleId: string) =>
    vehicles.find((v) => v.id === vehicleId)?.registration || "Unknown";

  const getDriverOrders = (driverId: string) =>
    orders.filter((o) => o.assignedDriverId === driverId);

  const getHubCoordinates = (hubId: string) => {
    const hub = hubs.find((h) => h.id === hubId);
    return hub
      ? [hub.coordinates.lat, hub.coordinates.lng]
      : [12.9716, 77.5946];
  };

  const handleRefresh = () => {
    setLastUpdate(new Date());
    toast.success("Map refreshed!");
  };

  return (
    <AppLayout>
      <PageHeader
        title="Fleet Map"
        description="Real-time locations of all vehicles"
      />

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl shadow p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Driver</label>
            <select
              value={filterDriver}
              onChange={(e) => setFilterDriver(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Drivers</option>
              {drivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Vehicle</label>
            <select
              value={filterVehicle}
              onChange={(e) => setFilterVehicle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Vehicles</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.registration}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="in-progress">In Progress</option>
              <option value="idle">Idle</option>
            </select>
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={handleRefresh}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600 flex justify-between">
          <span>Vehicles shown: {filteredFleet.length}</span>
          <span>Total fleet: {fleet.length}</span>
          <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Map */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <MapContainer
          center={[12.9716, 77.5946]}
          zoom={7}
          className="h-[700px] w-full"
        >
          <TileLayer
            attribution="OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Show hubs/terminals */}
          {hubs.map((hub) => (
            <Marker
              key={hub.id}
              position={[hub.coordinates.lat, hub.coordinates.lng]}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-bold">{hub.name}</p>
                  <p className="text-gray-600">{hub.address}</p>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Show vehicle locations */}
          {filteredFleet.map((vehicle) => {
            const driverId = vehicle.driverId;
            const driverOrders = getDriverOrders(driverId);
            const nextOrder = driverOrders.find(
              (o) => o.status === "assigned" || o.status === "in-progress"
            );
            const destinationCoords = nextOrder
              ? getHubCoordinates(nextOrder.destinationId)
              : null;

            return (
              <Fragment key={vehicle.vehicleId}>
                <Marker key={`marker-${vehicle.vehicleId}`} position={[vehicle.lat, vehicle.lng]}>
                  <Popup>
                    <div className="text-sm">
                      <p className="font-bold">
                        {getVehicleReg(vehicle.vehicleId)}
                      </p>
                      <p className="text-gray-600">
                        Driver: {getDriverName(driverId)}
                      </p>
                      <p className="text-gray-600">Status: {vehicle.status}</p>
                      {nextOrder && (
                        <p className="text-gray-600">
                          Next: {nextOrder.product}
                        </p>
                      )}
                      <p className="text-gray-600 text-xs mt-1">
                        Lat: {vehicle.lat.toFixed(4)}, Lng:{" "}
                        {vehicle.lng.toFixed(4)}
                      </p>
                    </div>
                  </Popup>
                </Marker>

                {/* Draw polyline to destination */}
                {destinationCoords && (
                  <Polyline
                    key={`poly-${vehicle.vehicleId}`}
                    positions={[
                      [vehicle.lat, vehicle.lng],
                      destinationCoords as [number, number],
                    ]}
                    color="blue"
                    weight={2}
                    opacity={0.7}
                  />
                )}
              </Fragment>
            );
          })}
        </MapContainer>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-xl shadow p-4 mt-4">
        <p className="font-medium mb-3">Legend</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-600">🔵 Hub/Terminal</p>
          </div>
          <div>
            <p className="text-gray-600">📍 Vehicle Location</p>
          </div>
          <div>
            <p className="text-gray-600">━ Route to Destination</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
