import { useMemo } from "react";
import { useAppSelector } from "../../hooks/redux";
import { Clock, CheckCircle } from "lucide-react";

const CURRENT_DRIVER_ID = "driver-1";

export default function ShiftHistory() {
  const shifts = useAppSelector((state) => state.shifts);
  const orders = useAppSelector((state) => state.orders);
  const vehicles = useAppSelector((state) => state.vehicles);
  const hubs = useAppSelector((state) => state.hubs);

  // Get completed shifts for current driver
  const completedShifts = useMemo(
    () =>
      shifts.filter(
        (s) =>
          s.driverId === CURRENT_DRIVER_ID &&
          s.status === "completed"
      ),
    [shifts]
  );

  const getVehicleInfo = (vehicleId: string) =>
    vehicles.find((v) => v.id === vehicleId)?.registration || "Unknown";

  const getHubName = (hubId: string) =>
    hubs.find((h) => h.id === hubId)?.name || "Unknown";

  const getShiftOrders = () => {
    return orders.filter((o) => o.status === "completed" && o.assignedDriverId === CURRENT_DRIVER_ID);
  };

  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString();
  };

  const formatTime = (timeStr: string | undefined) => {
    if (!timeStr) return "N/A";
    return new Date(timeStr).toLocaleTimeString();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Shift History</h1>

      {completedShifts.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 text-lg">No completed shifts yet</p>
          <p className="text-gray-500">Your completed shifts will appear here</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {completedShifts.map((shift) => {
            const shiftOrders = getShiftOrders();
            const completedOrders = shiftOrders.filter(
              (o) => o.status === "completed"
            );

            return (
              <div
                key={shift.id}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition"
              >
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-gray-600 text-sm">Date</p>
                    <p className="text-lg font-bold">
                      {formatDate(shift.startTime)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Vehicle</p>
                    <p className="text-lg font-bold">
                      {getVehicleInfo(shift.vehicleId)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Duration</p>
                    <p className="text-lg font-bold">
                      {shift.startTime && shift.endTime
                        ? Math.round(
                            (new Date(shift.endTime).getTime() -
                              new Date(shift.startTime).getTime()) /
                              (1000 * 60)
                          ) + " mins"
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="font-medium mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Deliveries Completed ({completedOrders.length})
                  </p>

                  {completedOrders.length === 0 ? (
                    <p className="text-gray-500 text-sm">No orders completed</p>
                  ) : (
                    <div className="space-y-2">
                      {completedOrders.map((order) => (
                        <div
                          key={order.id}
                          className="text-sm bg-gray-50 rounded p-2 flex justify-between"
                        >
                          <span className="font-medium">
                            {getHubName(order.destinationId)}
                          </span>
                          <span className="text-gray-600">
                            {order.product} - {order.quantity}L
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t text-sm text-gray-600">
                  <p>
                    Started: {formatTime(shift.startTime)} | Ended:{" "}
                    {formatTime(shift.endTime)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}