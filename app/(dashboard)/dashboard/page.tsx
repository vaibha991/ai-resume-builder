import Sidebar from "@/components/Sidebar";

export default function DashboardPage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold">Welcome to your Dashboard</h2>
        <p className="text-gray-600 mt-2">Manage your resumes here.</p>
      </main>
    </div>
  );
}