import AppLayout from "../../components/layout/appLayout";
import PageHeader from "../../components/ui/pageHeader";
import InventoryTable from "../../components/tables/inventoryTable";

import { useAppSelector } from "../../hooks/redux";

export default function Inventory() {
  const hubs = useAppSelector((state) => state.hubs);

  return (
    <AppLayout>
      <PageHeader title="Inventory Dashboard" />

      <InventoryTable hubs={hubs} />
    </AppLayout>
  );
}