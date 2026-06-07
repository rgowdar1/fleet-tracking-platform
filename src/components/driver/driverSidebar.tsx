import { NavLink } from "react-router-dom";

const menuItems = [
  {
    label: "My Shift",
    path: "/driver/dashboard",
  },
  {
    label: "Live Map",
    path: "/driver/map",
  },
  {
    label: "Shift History",
    path: "/driver/history",
  },
];

type Props = {
  isOpen?: boolean;
  onClose?: () => void;
};

export default function DriverSidebar({ isOpen, onClose }: Props) {
  return (
    <>
      {/* Desktop */}
      <aside className="hidden md:block w-64 bg-green-900 text-white min-h-screen">
        <div className="p-6">
          <h2 className="text-xl font-bold">Driver Portal</h2>
        </div>

        <nav className="flex flex-col gap-2 px-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `p-3 rounded-lg ${isActive ? "bg-green-600" : "hover:bg-green-800"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transform transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => onClose && onClose()}
        />

        <aside className="relative w-64 bg-green-900 text-white min-h-screen">
          <div className="p-6 flex items-center justify-between">
            <h2 className="text-xl font-bold">Driver Portal</h2>
            <button
              onClick={() => onClose && onClose()}
              className="p-2 rounded-md hover:bg-green-800"
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
                  `p-3 rounded-lg ${isActive ? "bg-green-600" : "hover:bg-green-800"}`
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
