import AppLayout from "../../components/layout/appLayout";
import VehicleAllocationForm from "../../components/forms/vehicleAllocationForm";
import AllocationTable from "../../components/tables/allocationTable";

export default function VehicleAllocation() {
  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-6">
        Vehicle Allocation
      </h1>

      <VehicleAllocationForm />
      <AllocationTable />
    </AppLayout>
  );
}