import { Link } from "react-router-dom";

type Props = {
  onOpenSidebar?: () => void;
};

export default function DriverHeader({ onOpenSidebar }: Props) {
  return (
    <header className="h-16 bg-white border-b px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={() => onOpenSidebar?.()}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100"
          aria-label="Open sidebar"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <h1 className="font-semibold text-lg">
          Driver Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/admin/dashboard"
          className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
        >
          Admin View
        </Link>

        <span className="text-sm text-slate-600">
          Driver
        </span>
      </div>
    </header>
  );
}