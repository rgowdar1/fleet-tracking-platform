import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { useAppSelector } from "../../hooks/redux";
import { AlertCircle } from "lucide-react";

const CURRENT_DRIVER_ID = "driver-1";

export default function DriverMap() {
  const fleet = useAppSelector((state) => state.fleet);
  const orders = useAppSelector((state) => state.orders);
  const hubs = useAppSelector((state) => state.hubs);
  const shifts = useAppSelector((state) => state.shifts);

  // Get active shift for current driver
  const activeShift = useMemo(
    () =>
      shifts.find(
        (s) =>
          s.driverId === CURRENT_DRIVER_ID &&
          s.status === "active"
      ),
    [shifts]
  );

  // Get current vehicle location
  const currentLocation = useMemo(
    () =>
      fleet.find(
        (f) =>
          f.driverId === CURRENT_DRIVER_ID &&
          (activeShift
            ? f.vehicleId === activeShift.vehicleId
            : f.vehicleId === "vehicle-1")
      ),
    [fleet, activeShift]
  );

  // Get active orders
  const activeOrders = useMemo(
    () =>
      orders.filter(
        (o) =>
          o.assignedDriverId === CURRENT_DRIVER_ID &&
          (o.status === "assigned" || o.status === "in-progress")
      ),
    [orders]
  );

  // Get destination coordinates
  const destinations = useMemo(
    () =>
      activeOrders.map((order) => {
        const hub = hubs.find((h) => h.id === order.destinationId);
        return {
          orderId: order.id,
          name: hub?.name || "Unknown",
          lat: hub?.coordinates.lat || 12.9716,
          lng: hub?.coordinates.lng || 77.5946,
          product: order.product,
          quantity: order.quantity,
        };
      }),
    [activeOrders, hubs]
  );

  if (!currentLocation) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No active shift</p>
          <p className="text-gray-500">Start a shift to view your map</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="bg-white border-b p-4 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Driver Map</h1>
          <p className="text-gray-600">
            Active Deliveries: {activeOrders.length}
          </p>
        </div>
      </div>

      <div className="flex-1">
        <MapContainer
          center={[currentLocation.lat, currentLocation.lng]}
          zoom={11}
          className="h-full w-full"
        >
          <TileLayer
            attribution="OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Current vehicle location */}
          <Marker position={[currentLocation.lat, currentLocation.lng]}>
            <Popup>
              <div className="text-sm">
                <p className="font-bold">Your Current Location</p>
                <p className="text-gray-600">Status: {currentLocation.status}</p>
                <p className="text-gray-600 text-xs">
                  Lat: {currentLocation.lat.toFixed(4)}, Lng:{" "}
                  {currentLocation.lng.toFixed(4)}
                </p>
              </div>
            </Popup>
          </Marker>

          {/* Destination markers */}
          {destinations.map((dest) => (
            <div key={dest.orderId}>
              <Marker position={[dest.lat, dest.lng]}>
                <Popup>
                  <div className="text-sm">
                    <p className="font-bold">{dest.name}</p>
                    <p className="text-gray-600">
                      {dest.product.toUpperCase()} - {dest.quantity}L
                    </p>
                  </div>
                </Popup>
              </Marker>

              {/* Route line to destination */}
              <Polyline
                positions={[
                  [currentLocation.lat, currentLocation.lng],
                  [dest.lat, dest.lng],
                ]}
                color="blue"
                weight={2}
                opacity={0.6}
                dashArray="5, 5"
              />
            </div>
          ))}

          {/* Show all hubs in background */}
          {hubs.map((hub) => (
            <Marker
              key={hub.id}
              position={[hub.coordinates.lat, hub.coordinates.lng]}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-bold">{hub.name}</p>
                  <p className="text-gray-600">{hub.address}</p>
                  <p className="text-gray-600 text-xs">
                    Diesel: {hub.inventory.diesel}L | Petrol:{" "}
                    {hub.inventory.petrol}L
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Info panel */}
      <div className="bg-white border-t p-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          {destinations.length === 0 ? (
            <p className="text-gray-600">No active deliveries</p>
          ) : (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Destinations:
              </p>
              <div className="flex flex-wrap gap-2">
                {destinations.map((dest) => (
                  <div
                    key={dest.orderId}
                    className="bg-blue-50 border border-blue-200 rounded px-3 py-1 text-sm"
                  >
                    <p className="font-medium">{dest.name}</p>
                    <p className="text-gray-600 text-xs">
                      {dest.product} - {dest.quantity}L
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}