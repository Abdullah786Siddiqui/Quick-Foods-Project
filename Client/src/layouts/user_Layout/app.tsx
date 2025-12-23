// layouts/user_layout/UserLayoutUI.tsx
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">User Dashboard</h1>
        <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
          Logout
        </button>
      </header>

      {/* Content Area */}
      <main className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
