import type { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
}

export default function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-center gap-4">
        {icon && <div className="text-2xl">{icon}</div>}
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h2 className="text-3xl font-bold mt-2">{value}</h2>
        </div>
      </div>
    </div>
  );
}
