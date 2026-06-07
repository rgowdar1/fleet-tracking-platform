import { useMemo, useState } from "react";

import AppLayout from "../../components/layout/appLayout";
import PageHeader from "../../components/ui/pageHeader";
import SearchInput from "../../components/ui/searchInput";
import DriverForm from "../../components/forms/driverForm";

import { useAppSelector } from "../../hooks/redux";

export default function Drivers() {
  const drivers = useAppSelector(
    (state) => state.drivers
  );

  const [search, setSearch] =
    useState("");

  const [showForm, setShowForm] = useState(false);

  const filteredDrivers =
    useMemo(() => {
      return drivers.filter((driver) =>
        driver.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }, [drivers, search]);

  return (
    <AppLayout>
      <PageHeader
        title="Drivers"
        description="Manage fleet drivers"
      />

      <div className="mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          {showForm ? "Hide Form" : "Add New Driver"}
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <DriverForm />
        </div>
      )}

      <SearchInput
        value={search}
        onChange={setSearch}
      />

      <div className="bg-white rounded-xl shadow mt-5">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr className="border-b">
              <th className="text-left p-4">
                Name
              </th>

              <th className="text-left p-4">
                License
              </th>

              <th className="text-left p-4">
                Phone
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredDrivers.map(
              (driver) => (
                <tr
                  key={driver.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4">
                    {driver.name}
                  </td>

                  <td className="p-4">
                    {driver.license}
                  </td>

                  <td className="p-4">
                    {driver.phone}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}