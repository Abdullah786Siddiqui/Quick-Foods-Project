// import { useState } from "react";
// import toast from "react-hot-toast";
import {  MapPin, Navigation } from "lucide-react";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  // const navigate = useNavigate();
  // const token = localStorage.getItem("user_token");
  // const User = localStorage.getItem("user_auth");
  // const username = token && User ? JSON.parse(User).user.name : 'Guest';
  // const [loggingOut, setLoggingOut] = useState(false);
  // const isAuthenticated = !!token;

  // const handleLogout = () => {
  //   setLoggingOut(true); // disable button
  //   localStorage.removeItem('user_token');
  //   localStorage.removeItem('user_auth');
  //   toast.success('Logged out successfully!', {
  //     style: { background: 'white', color: 'red' },
  //   });
  //   setTimeout(() => {
  //     navigate('/');
  //   }, 1000);
  // }

  return (
    <>


      <div className="min-h-screen flex flex-col">
        {/* Header */}
         <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto ">
        <div className="flex h-16 items-center justify-between gap-4 md:h-20 px-4 sm:px-6">
          {/* Left Section: Logo (Desktop) / User Icon (Mobile) */}
          <div className="flex items-center gap-3 flex-shrink-0 md:flex-1 md:justify-start">
            {/* User Icon - Visible on Mobile Only */}
            <button
              className="md:hidden rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
              aria-label="User profile"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>

            {/* Logo Section - Visible on Desktop Only */}
            <div className="hidden md:flex items-center gap-3">
              <img src="/logo/logo.png" alt="Quickfood" className="h-10 md:h-11 w-auto" />
            </div>
          </div>

          {/* Center Section: Logo (Mobile) */}
          <div className="flex md:hidden items-center">
            <img src="/logo/logo.png" alt="Quickfood" className="h-10 w-auto" />
          </div>

          {/* Center Section: Location (Hidden on Mobile) */}
         

<div className="hidden md:flex flex-1 max-w-2xl mx-auto">
  <div className="flex w-full items-center gap-3 rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-orange-50/50 px-4 py-2.5 shadow-sm transition-all hover:border-orange-300 hover:shadow-md dark:border-orange-900/40 dark:from-orange-950/20 dark:to-orange-950/10">
    
    {/* Location Icon */}
    <MapPin className="h-5 w-5 text-orange-500 flex-shrink-0" />

    {/* Location Text */}
    <div className="flex-1 min-w-0">
      <div className="text-xs font-medium text-orange-600 dark:text-orange-400">Delivering to</div>
      <div className="text-sm font-semibold text-slate-900 truncate dark:text-white">San Francisco, CA</div>
    </div>

    {/* Modal Trigger Icon */}
    <Navigation className="h-5 w-5 text-orange-500 cursor-pointer hover:text-orange-600" />
  </div>
</div>


          {/* Right Section: Actions */}
          <div className="flex items-center gap-2 md:gap-4 flex-shrink-0 md:flex-1 md:justify-end">
            {/* Mobile Location Button (Visible only on Mobile) */}
            {/* <button className="md:hidden flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs font-medium text-slate-900 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800">
              <svg className="h-4 w-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="hidden sm:inline">SF</span>
            </button> */}

            {/* Favorites Icon (Desktop Only) */}
            <button
              className="hidden md:block relative rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
              aria-label="Favorites"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>

            {/* Cart Icon with Badge */}
            <button
              className="relative rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
              aria-label="Shopping cart"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                2
              </span>
            </button>

            {/* Profile Icon (Desktop Only) */}
            <button
              className="hidden md:block rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
              aria-label="User profile"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Location Bar (Visible only on Mobile, below navbar) */}
     

<div className="md:hidden border-t border-slate-200 bg-slate-50 px-2 py-2 dark:border-slate-800 dark:bg-slate-900">
  <div className="flex items-center gap-3 rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-orange-50/50 px-4 py-2 shadow-sm transition-all hover:border-orange-300 hover:shadow-md dark:border-orange-900/40 dark:from-orange-950/20 dark:to-orange-950/10">
    
    {/* Location Icon */}
    <MapPin className="h-5 w-5 text-orange-500 flex-shrink-0" />

    {/* Location Text */}
    <div className="flex-1 min-w-0">
      <div className="text-xs font-medium text-orange-600 dark:text-orange-400">Delivering to</div>
      <div className="text-sm font-semibold text-slate-900 truncate dark:text-white">San Francisco, CA</div>
    </div>

    {/* Modal Trigger Icon */}
    <Navigation className="h-5 w-5 text-orange-500 cursor-pointer hover:text-orange-600" />

    {/* Optional Dropdown Icon */}
    {/* <ChevronDown className="h-4 w-4 text-slate-400 dark:text-slate-500" /> */}
  </div>
</div>

      </div>
    </nav>


        {/* Content Area */}
        <main className="flex-1 bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default UserLayout;
