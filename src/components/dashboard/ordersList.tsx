import type { Order } from "../../types/order";

type Props = {
  todayOrders: Order[];
};

export default function OrdersList({ todayOrders }: Props) {
  return (
    <div className="bg-white rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-3">Today's Deliveries</h3>

      {todayOrders.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 flex items-start gap-3">
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
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition"
            >
              <div className="grid md:grid-cols-3 gap-4 mb-2">
                <div>
                  <p className="text-gray-600 text-sm">Destination</p>
                  <p className="text-lg font-bold">{order.destinationId}</p>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
