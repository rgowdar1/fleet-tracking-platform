import type { Hub } from "../../types/hub";

type Props = {
  hubs: Hub[];
};

export default function InventoryTable({ hubs }: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4 text-left">Location</th>
            <th className="p-4 text-right">Diesel</th>
            <th className="p-4 text-right">Petrol</th>
            <th className="p-4 text-center">Status</th>
          </tr>
        </thead>

        <tbody>
          {hubs.map((hub) => {
            const lowStock =
              hub.inventory.diesel < 5000 || hub.inventory.petrol < 5000;

            return (
              <tr key={hub.id} className="border-t">
                <td className="p-4 text-left align-middle">{hub.name}</td>

                <td className="p-4 text-right align-middle">
                  {hub.inventory.diesel}
                </td>

                <td className="p-4 text-right align-middle">
                  {hub.inventory.petrol}
                </td>

                <td className="p-4 text-center align-middle">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-white text-sm ${
                      lowStock ? "bg-red-500" : "bg-green-500"
                    }`}
                  >
                    {lowStock ? "Low Stock" : "Healthy"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
