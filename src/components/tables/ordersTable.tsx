import { useAppSelector } from "../../hooks/redux";

export default function OrdersTable() {
  const orders = useAppSelector((state) => state.orders);

  return (
    <div className="bg-white mt-6 rounded-xl shadow">
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-4">Product</th>
            <th className="p-4">Quantity</th>
            <th className="p-4">Date</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="p-4">{order.product}</td>

              <td className="p-4">{order.quantity}</td>

              <td className="p-4">{order.deliveryDate}</td>

              <td className="p-4">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
