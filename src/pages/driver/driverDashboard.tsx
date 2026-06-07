import { useState, useMemo } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { startShift, endShift } from "../../features/shifts/shiftSlice";
import { updateLocation } from "../../features/fleet/fleetSlice";
import { completeOrder } from "../../features/orders/orderSlice";
import { useAppSelector } from "../../hooks/redux";
import {
  Play,
  Square,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

const CURRENT_DRIVER_ID = "driver-1";
const CURRENT_VEHICLE_ID = "vehicle-1";

export default function DriverDashboard() {
  const dispatch = useAppDispatch();
  const [failureReason, setFailureReason] = useState("");
  const [selectedOrderForFailure, setSelectedOrderForFailure] = useState<
    string | null
  >(null);

  const shifts = useAppSelector((state) => state.shifts);
  const orders = useAppSelector((state) => state.orders);
  const allocations = useAppSelector((state) => state.allocations);
  const vehicles = useAppSelector((state) => state.vehicles);
  const hubs = useAppSelector((state) => state.hubs);

  // Find today's allocation
  const today = new Date().toISOString().split("T")[0];
  const todayAllocation = useMemo(
    () =>
      allocations.find(
        (a) =>
          a.driverId === CURRENT_DRIVER_ID &&
          a.date === today
      ),
    [allocations]
  );

  // Find today's shift
  const activeShift = useMemo(
    () =>
      shifts.find(
        (s) =>
          s.driverId === CURRENT_DRIVER_ID &&
          s.status === "active"
      ),
    [shifts]
  );

  // Get driver's orders for today
  const todayOrders = useMemo(
    () =>
      orders.filter(
        (o) =>
          o.assignedDriverId === CURRENT_DRIVER_ID &&
          o.deliveryDate === today
      ),
    [orders]
  );

  // Get vehicle info
  const assignedVehicle = useMemo(
    () =>
      vehicles.find((v) =>
        todayAllocation
          ? v.id === todayAllocation.vehicleId
          : v.id === CURRENT_VEHICLE_ID
      ),
    [vehicles, todayAllocation]
  );

  const handleStartShift = () => {
    if (!todayAllocation) {
      toast.error("No vehicle allocated for today");
      return;
    }

    dispatch(
      startShift({
        id: crypto.randomUUID(),
        driverId: CURRENT_DRIVER_ID,
        vehicleId: todayAllocation.vehicleId,
        startTime: new Date().toISOString(),
        status: "active",
      })
    );
    toast.success("Shift started!");
  };

  const handleGpsUpdate = () => {
    dispatch(
      updateLocation({
        vehicleId: assignedVehicle?.id || CURRENT_VEHICLE_ID,
        lat: 12.9716 + (Math.random() - 0.5) * 0.02,
        lng: 77.5946 + (Math.random() - 0.5) * 0.02,
      })
    );
    toast.success("GPS location updated!");
  };

  const handleCompleteOrder = (orderId: string) => {
    dispatch(completeOrder(orderId));
    toast.success("Order marked as completed!");
  };

  const handleFailOrder = (orderId: string) => {
    if (!failureReason.trim()) {
      toast.error("Please enter a failure reason");
      return;
    }
    dispatch(completeOrder(orderId));
    toast.success(`Order marked as failed: ${failureReason}`);
    setFailureReason("");
    setSelectedOrderForFailure(null);
  };

  const handleEndShift = () => {
    if (!activeShift) {
      toast.error("No active shift to end");
      return;
    }

    dispatch(endShift(activeShift.id));
    toast.success("Shift ended!");
  };

  const getHubName = (hubId: string) =>
    hubs.find((h) => h.id === hubId)?.name || "Unknown";

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Driver Dashboard</h1>

      {/* Shift Status Card */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 mb-8 shadow-lg">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-blue-100 text-sm mb-1">Today's Shift Status</p>
            <p className="text-2xl font-bold">
              {activeShift
                ? "Active - Shift in Progress"
                : todayAllocation
                  ? "Ready to Start"
                  : "No Allocation"}
            </p>
          </div>
          <div>
            {assignedVehicle && (
              <div>
                <p className="text-blue-100 text-sm mb-1">Assigned Vehicle</p>
                <p className="text-2xl font-bold">{assignedVehicle.registration}</p>
                <p className="text-blue-100 text-sm">
                  Capacity: {assignedVehicle.capacity}L
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <button
          onClick={handleStartShift}
          disabled={!todayAllocation || !!activeShift}
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          <Play className="w-5 h-5" />
          Start Shift
        </button>

        <button
          onClick={handleGpsUpdate}
          disabled={!activeShift}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          <MapPin className="w-5 h-5" />
          Send GPS Update
        </button>

        <button
          onClick={handleEndShift}
          disabled={!activeShift}
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          <Square className="w-5 h-5" />
          End Shift
        </button>
      </div>

      {/* Today's Deliveries */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Today's Deliveries</h2>

        {todayOrders.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-yellow-900 font-medium">No Deliveries Today</p>
              <p className="text-yellow-700 text-sm">
                You don't have any orders assigned for today
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {todayOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition"
              >
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-gray-600 text-sm">Destination</p>
                    <p className="text-lg font-bold">
                      {getHubName(order.destinationId)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Product & Quantity</p>
                    <p className="text-lg font-bold capitalize">
                      {order.product} - {order.quantity}L
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Status</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : order.status === "failed"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {order.status !== "completed" && order.status !== "failed" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCompleteOrder(order.id)}
                      disabled={!activeShift}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Complete
                    </button>

                    <button
                      onClick={() =>
                        setSelectedOrderForFailure(
                          selectedOrderForFailure === order.id ? null : order.id
                        )
                      }
                      disabled={!activeShift}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                      <XCircle className="w-4 h-4" />
                      Mark Failed
                    </button>
                  </div>
                )}

                {selectedOrderForFailure === order.id && (
                  <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-sm font-medium text-red-900 mb-2">
                      Enter failure reason:
                    </p>
                    <input
                      type="text"
                      value={failureReason}
                      onChange={(e) => setFailureReason(e.target.value)}
                      placeholder="e.g., Destination unreachable, customer refused..."
                      className="w-full border border-red-300 rounded p-2 mb-2 text-sm"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleFailOrder(order.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition"
                      >
                        Confirm Failure
                      </button>
                      <button
                        onClick={() => setSelectedOrderForFailure(null)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded text-sm font-medium transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
