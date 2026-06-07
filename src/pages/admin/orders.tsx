import { useMemo, useState } from "react";
import AppLayout from "../../components/layout/appLayout";
import OrderForm from "../../components/forms/orderForm";
import { useAppSelector } from "../../hooks/redux";

export default function Orders() {
  const orders = useAppSelector((state) => state.orders);
  const hubs = useAppSelector((state) => state.hubs);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredOrders = useMemo(() => {
    if (statusFilter === "all") return orders;
    return orders.filter((order) => order.status === statusFilter);
  }, [orders, statusFilter]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      assigned: "bg-blue-100 text-blue-800",
      "in-progress": "bg-purple-100 text-purple-800",
      completed: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getHubName = (hubId: string) => {
    return hubs.find((h) => h.id === hubId)?.name || "Unknown";
  };

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-6">Orders Management</h1>

      <OrderForm />

      <div className="mt-8">
        <div className="flex gap-2 mb-4 flex-wrap">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              statusFilter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            All
          </button>
          {["pending", "assigned", "in-progress", "completed", "failed"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition capitalize ${
                  statusFilter === status
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {status}
              </button>
            )
          )}
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left p-4">Destination</th>
                <th className="text-left p-4">Product</th>
                <th className="text-left p-4">Quantity</th>
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{getHubName(order.destinationId)}</td>
                    <td className="p-4 capitalize">{order.product}</td>
                    <td className="p-4">{order.quantity} L</td>
                    <td className="p-4">{order.deliveryDate}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
