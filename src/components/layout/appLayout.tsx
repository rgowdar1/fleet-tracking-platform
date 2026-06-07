interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
  return (
    <div className="flex">
      <div className="flex-1">
        <main className="p-6 bg-slate-100 min-h-screen">{children}</main>
      </div>
    </div>
  );
}
