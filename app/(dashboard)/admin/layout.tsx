import { DashboardNav } from "@/components/dashboard-nav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNav />
      <main className="flex-1 container py-6 px-4 md:px-8">{children}</main>
    </div>
  );
}
