import { Outlet } from "react-router-dom";


const AdminAuthLayout = () => {
  return (
    <>
      {/* Centered content for login/signup */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Outlet />
      </div>
    </>
  );
};

export default AdminAuthLayout;
