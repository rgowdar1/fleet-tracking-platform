import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../hooks/redux";
import { driverSchema, type DriverFormData } from "../../utils/schemas";
import { addDriver } from "../../features/drivers/driverSlice";
import { toast } from "sonner";

export default function DriverForm() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DriverFormData>({
    resolver: zodResolver(driverSchema),
  });

  const onSubmit = (data: DriverFormData) => {
    try {
      dispatch(
        addDriver({
          id: crypto.randomUUID(),
          ...data,
        }),
      );
      toast.success("Driver added successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to add driver");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-xl shadow space-y-4"
    >
      <div>
        <label className="block text-sm font-medium mb-2">Driver Name</label>
        <input
          {...register("name")}
          placeholder="e.g., John Smith"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">License Number</label>
        <input
          {...register("license")}
          placeholder="e.g., KA-DL-123456"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.license && (
          <p className="text-red-500 text-sm mt-1">{errors.license.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Phone Number</label>
        <input
          {...register("phone")}
          placeholder="e.g., +91-9999999999"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition"
      >
        Add Driver
      </button>
    </form>
  );
}
