import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../hooks/redux";
import { vehicleSchema, type VehicleFormData } from "../../utils/schemas";
import { addVehicle } from "../../features/vehicles/vehicleSlice";
import { toast } from "sonner";

export default function VehicleForm() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
  });

  const onSubmit = (data: VehicleFormData) => {
    try {
      dispatch(
        addVehicle({
          id: crypto.randomUUID(),
          ...data,
        }),
      );
      toast.success("Vehicle added successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to add vehicle");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-xl shadow space-y-4"
    >
      <div>
        <label className="block text-sm font-medium mb-2">
          Registration Number
        </label>
        <input
          {...register("registration")}
          placeholder="e.g., KA07AB1234"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.registration && (
          <p className="text-red-500 text-sm mt-1">
            {errors.registration.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Capacity (L)</label>
        <input
          {...register("capacity", { valueAsNumber: true })}
          type="number"
          min="1000"
          step="100"
          placeholder="e.g., 8000"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.capacity && (
          <p className="text-red-500 text-sm mt-1">{errors.capacity.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Type</label>
        <select
          {...register("type")}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Type</option>
          <option value="Tanker">Tanker</option>
          <option value="Truck">Truck</option>
        </select>
        {errors.type && (
          <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition"
      >
        Add Vehicle
      </button>
    </form>
  );
}
