import { useState } from "react";
import toast from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";


const UserLayout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("user_token");
  const User = localStorage.getItem("user_auth");
  const username = token && User ? JSON.parse(User).user.name : 'Guest';
  const [loggingOut, setLoggingOut] = useState(false);
  const isAuthenticated = !!token;

  const handleLogout = () => {
    setLoggingOut(true); // disable button
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_auth');
    toast.success('Logged out successfully!', {
      style: { background: 'white', color: 'red' },
    });
    setTimeout(() => {
      navigate('/');
    }, 1000);
  }

  return (
    <>


      <div className="min-h-screen flex flex-col">
        {/* Header */}
        {/* <header className="bg-blue-600 text-white p-4 flex flex-col sm:flex-row justify-between items-center shadow-md">
          <div className="flex items-center space-x-4 mb-2 sm:mb-0">
            <h1 className="text-2xl font-bold">User Dashboard</h1>
            <span className="bg-blue-500 px-3 py-1 rounded-full text-sm font-medium shadow-inner">
              {username}
            </span>
          </div>


          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className={`px-4 py-2 rounded shadow-md transition-colors duration-300
            ${loggingOut ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}
          `}
            >
              {loggingOut ? 'Logging out...' : 'Logout'}
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-green-500 rounded shadow-md hover:bg-green-600 transition-colors duration-300"
            >
              Login
            </button>
          )}







        </header> */}


        {/* Content Area */}
        <main className="flex-1 bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default UserLayout;
