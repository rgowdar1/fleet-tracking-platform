import { useMemo, useState } from "react";
import AppLayout from "../../components/layout/appLayout";
import PageHeader from "../../components/ui/pageHeader";
import SearchInput from "../../components/ui/searchInput";
import HubForm from "../../components/forms/hubForm";

import { useAppSelector } from "../../hooks/redux";

export default function Hubs() {
  const hubs = useAppSelector((state) => state.hubs);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const filteredHubs = useMemo(() => {
    return hubs.filter(
      (hub) =>
        hub.name.toLowerCase().includes(search.toLowerCase()) ||
        hub.address.toLowerCase().includes(search.toLowerCase())
    );
  }, [hubs, search]);

  return (
    <AppLayout>
      <PageHeader
        title="Hubs"
        description="Manage hubs and terminals"
      />

      <div className="mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          {showForm ? "Hide Form" : "Add New Hub"}
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <HubForm />
        </div>
      )}

      <div className="mb-4">
        <SearchInput value={search} onChange={setSearch} placeholder="Search hubs by name or address..." />
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Address</th>
              <th className="p-4 text-left">Diesel</th>
              <th className="p-4 text-left">Petrol</th>
            </tr>
          </thead>

          <tbody>
            {filteredHubs.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No hubs found
                </td>
              </tr>
            ) : (
              filteredHubs.map((hub) => (
                <tr key={hub.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{hub.name}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 capitalize">
                      {hub.type}
                    </span>
                  </td>
                  <td className="p-4">{hub.address}</td>
                  <td className="p-4">{hub.inventory.diesel} L</td>
                  <td className="p-4">{hub.inventory.petrol} L</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}