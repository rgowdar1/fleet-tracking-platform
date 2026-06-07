import { NavLink } from "react-router-dom";

const menuItems = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    label: "Hubs",
    path: "/admin/hubs",
  },
  {
    label: "Drivers",
    path: "/admin/drivers",
  },
  {
    label: "Vehicles",
    path: "/admin/vehicles",
  },
  {
    label: "Orders",
    path: "/admin/orders",
  },
  {
    label: "Allocations",
    path: "/admin/allocations",
  },
  {
    label: "Inventory",
    path: "/admin/inventory",
  },
  {
    label: "Fleet Map",
    path: "/admin/map",
  },
];

type Props = {
  isOpen?: boolean;
  onClose?: () => void;
};

export default function AdminSidebar({ isOpen, onClose }: Props) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-64 bg-slate-900 text-white min-h-screen">
        <div className="p-6">
          <h2 className="text-xl font-bold">Fleet Panda</h2>
        </div>

        <nav className="flex flex-col gap-2 px-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `p-3 rounded-lg ${isActive ? "bg-blue-600" : "hover:bg-slate-800"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile overlay sidebar */}
      <div
        className={`fixed inset-0 z-[1000] md:hidden transform transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => onClose && onClose()}
        />

        <aside className="relative w-64 bg-slate-900 text-white min-h-screen">
          <div className="p-6 flex items-center justify-between">
            <h2 className="text-xl font-bold">Fleet Panda</h2>
            <button
              onClick={() => onClose && onClose()}
              className="p-2 rounded-md hover:bg-slate-800"
              aria-label="Close sidebar"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-2 px-4">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => onClose && onClose()}
                className={({ isActive }) =>
                  `p-3 rounded-lg ${isActive ? "bg-blue-600" : "hover:bg-slate-800"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
      </div>
    </>
  );
}
