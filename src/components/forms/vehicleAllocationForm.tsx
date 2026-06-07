import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../hooks/redux";
import { allocationSchema, type AllocationFormData } from "../../utils/schemas";
import { useAppSelector } from "../../hooks/redux";
import { addAllocation } from "../../features/allocations/allocationSlice";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

export default function VehicleAllocationForm() {
  const dispatch = useAppDispatch();

  const drivers = useAppSelector((state) => state.drivers);
  const vehicles = useAppSelector((state) => state.vehicles);
  const allocations = useAppSelector((state) => state.allocations);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<AllocationFormData>({
    resolver: zodResolver(allocationSchema),
  });

  const vehicleId = watch("vehicleId");
  const date = watch("date");

  const isVehicleAllocated =
    vehicleId &&
    date &&
    allocations.some(
      (allocation) =>
        allocation.vehicleId === vehicleId && allocation.date === date,
    );

  const onSubmit = (data: AllocationFormData) => {
    if (isVehicleAllocated) {
      toast.error("Vehicle already allocated on this date");
      return;
    }

    try {
      dispatch(
        addAllocation({
          id: crypto.randomUUID(),
          ...data,
        }),
      );
      toast.success("Vehicle allocated successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to allocate vehicle");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-xl shadow space-y-4"
    >
      <div>
        <label className="block text-sm font-medium mb-2">Select Driver</label>
        <select
          {...register("driverId")}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Driver</option>
          {drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.name}
            </option>
          ))}
        </select>
        {errors.driverId && (
          <p className="text-red-500 text-sm mt-1">{errors.driverId.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Select Vehicle</label>
        <select
          {...register("vehicleId")}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Vehicle</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.registration} ({vehicle.capacity}L)
            </option>
          ))}
        </select>
        {errors.vehicleId && (
          <p className="text-red-500 text-sm mt-1">
            {errors.vehicleId.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Allocation Date
        </label>
        <input
          {...register("date")}
          type="date"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.date && (
          <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
        )}
      </div>

      {isVehicleAllocated && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">
            This vehicle is already allocated on the selected date
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isVehicleAllocated}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg font-medium transition"
      >
        Allocate Vehicle
      </button>
    </form>
  );
}
