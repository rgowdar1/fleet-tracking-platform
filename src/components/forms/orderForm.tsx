import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../hooks/redux";
import { orderSchema, type OrderFormData } from "../../utils/schemas";
import { useAppSelector } from "../../hooks/redux";
import { addOrder } from "../../features/orders/orderSlice";
import { toast } from "sonner";

export default function OrderForm() {
  const dispatch = useAppDispatch();

  const hubs = useAppSelector((state) => state.hubs);
  const drivers = useAppSelector((state) => state.drivers);
  const vehicles = useAppSelector((state) => state.vehicles);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      product: "diesel",
    },
  });

  const onSubmit = (data: OrderFormData) => {
    try {
      dispatch(
        addOrder({
          id: crypto.randomUUID(),
          ...data,
          status: data.assignedDriverId ? "assigned" : "pending",
        }),
      );
      toast.success("Order created successfully!");
      reset({ product: "diesel" });
    } catch (error) {
      toast.error("Failed to create order");
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
          Destination Hub
        </label>
        <select
          {...register("destinationId")}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Destination</option>
          {hubs.map((hub) => (
            <option key={hub.id} value={hub.id}>
              {hub.name}
            </option>
          ))}
        </select>
        {errors.destinationId && (
          <p className="text-red-500 text-sm mt-1">
            {errors.destinationId.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Product</label>
        <select
          {...register("product")}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="diesel">Diesel</option>
          <option value="petrol">Petrol</option>
        </select>
        {errors.product && (
          <p className="text-red-500 text-sm mt-1">{errors.product.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Quantity (L)</label>
        <input
          {...register("quantity", { valueAsNumber: true })}
          type="number"
          min="100"
          step="100"
          placeholder="e.g., 5000"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.quantity && (
          <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Delivery Date</label>
        <input
          {...register("deliveryDate")}
          type="date"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.deliveryDate && (
          <p className="text-red-500 text-sm mt-1">
            {errors.deliveryDate.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Assign Driver (Optional)
        </label>
        <select
          {...register("assignedDriverId")}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Driver</option>
          {drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.name}
            </option>
          ))}
        </select>
        {errors.assignedDriverId && (
          <p className="text-red-500 text-sm mt-1">
            {errors.assignedDriverId.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Assign Vehicle (Optional)
        </label>
        <select
          {...register("assignedVehicleId")}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Vehicle</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.registration}
            </option>
          ))}
        </select>
        {errors.assignedVehicleId && (
          <p className="text-red-500 text-sm mt-1">
            {errors.assignedVehicleId.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition"
      >
        Create Order
      </button>
    </form>
  );
}
