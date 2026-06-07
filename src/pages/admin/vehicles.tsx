import { useMemo, useState } from "react";
import AppLayout from "../../components/layout/appLayout";
import PageHeader from "../../components/ui/pageHeader";
import SearchInput from "../../components/ui/searchInput";
import VehicleForm from "../../components/forms/vehicleForm";

import { useAppSelector } from "../../hooks/redux";

export default function Vehicles() {
  const vehicles = useAppSelector(
    (state) => state.vehicles
  );

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter(
      (vehicle) =>
        vehicle.registration.toLowerCase().includes(search.toLowerCase()) ||
        vehicle.type.toLowerCase().includes(search.toLowerCase())
    );
  }, [vehicles, search]);

  return (
    <AppLayout>
      <PageHeader
        title="Vehicles"
        description="Manage fleet vehicles"
      />

      <div className="mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          {showForm ? "Hide Form" : "Add New Vehicle"}
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <VehicleForm />
        </div>
      )}

      <div className="mb-4">
        <SearchInput value={search} onChange={setSearch} />
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 text-left">
                Registration
              </th>

              <th className="p-4 text-left">
                Capacity
              </th>

              <th className="p-4 text-left">
                Type
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredVehicles.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  No vehicles found
                </td>
              </tr>
            ) : (
              filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">
                    {vehicle.registration}
                  </td>

                  <td className="p-4">
                    {vehicle.capacity} L
                  </td>

                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                      {vehicle.type}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}