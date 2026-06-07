import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../hooks/redux";
import { hubSchema, type HubFormData } from "../../utils/schemas";
import { addHub } from "../../features/hubs/hubSlice";
import { toast } from "sonner";

export default function HubForm() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HubFormData>({
    resolver: zodResolver(hubSchema),
  });

  const onSubmit = (data: HubFormData) => {
    try {
      dispatch(
        addHub({
          id: crypto.randomUUID(),
          ...data,
        }),
      );
      toast.success("Hub added successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to add hub");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-xl shadow space-y-4"
    >
      <div>
        <label className="block text-sm font-medium mb-2">Hub Name</label>
        <input
          {...register("name")}
          placeholder="e.g., Downtown Distribution Hub"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Type</label>
        <select
          {...register("type")}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Type</option>
          <option value="hub">Hub</option>
          <option value="terminal">Terminal</option>
        </select>
        {errors.type && (
          <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Address</label>
        <input
          {...register("address")}
          placeholder="e.g., 123 Main St, City, State 12345"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Latitude</label>
          <input
            {...register("coordinates.lat", { valueAsNumber: true })}
            type="number"
            step="0.0001"
            placeholder="e.g., 12.9716"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.coordinates?.lat && (
            <p className="text-red-500 text-sm mt-1">
              {errors.coordinates.lat.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Longitude</label>
          <input
            {...register("coordinates.lng", { valueAsNumber: true })}
            type="number"
            step="0.0001"
            placeholder="e.g., 77.5946"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.coordinates?.lng && (
            <p className="text-red-500 text-sm mt-1">
              {errors.coordinates.lng.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Diesel (L)</label>
          <input
            {...register("inventory.diesel", { valueAsNumber: true })}
            type="number"
            min="0"
            placeholder="e.g., 15000"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.inventory?.diesel && (
            <p className="text-red-500 text-sm mt-1">
              {errors.inventory.diesel.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Petrol (L)</label>
          <input
            {...register("inventory.petrol", { valueAsNumber: true })}
            type="number"
            min="0"
            placeholder="e.g., 10000"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.inventory?.petrol && (
            <p className="text-red-500 text-sm mt-1">
              {errors.inventory.petrol.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition"
      >
        Add Hub
      </button>
    </form>
  );
}
