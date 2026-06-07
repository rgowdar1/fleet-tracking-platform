import { useAppSelector } from "../../hooks/redux";

export default function AllocationTable() {
  const allocations = useAppSelector((state) => state.allocations);

  return (
    <div className="bg-white mt-6 rounded-xl shadow">
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-4 text-left">Driver</th>

            <th className="p-4 text-left">Vehicle</th>

            <th className="p-4 text-left">Date</th>
          </tr>
        </thead>

        <tbody>
          {allocations.map((allocation) => (
            <tr key={allocation.id}>
              <td className="p-4">{allocation.driverId}</td>

              <td className="p-4">{allocation.vehicleId}</td>

              <td className="p-4">{allocation.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
