import type { AppDispatch, RootState } from "@/store/store";
import { MapPin, Navigation } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/shared/ui'
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { checkAuth } from "@/store/slices/authSlice";
const UserLayout = () => {

  const { short, full } = useSelector((state: RootState) => state.location);
  const [userDrawerMobile, setuserDrawerMobile] = useState(false)
  const [userSheetDesktop, setuserSheetDesktop] = useState(false)
  const [cartSheet, setcartSheet] = useState(false)
  const { isAuthenticated, role } = useSelector((state: RootState) => state.auth);



 const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(checkAuth()); // ✅ calls your thunk
  }, [dispatch]);









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
                  onClick={() => setuserDrawerMobile(true)}
                  className="md:hidden rounded-lg cursor-pointer p-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
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
                    <div className="text-sm font-semibold text-slate-900 truncate dark:text-white">{[short, full?.city].filter(Boolean).join(", ") || "Islamabad, DHA Phase 2"}
                    </div>
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
  onClick={() => setcartSheet(true)}
  disabled={!isAuthenticated || role !== 'user'} 
  className={`relative rounded-lg p-2 text-slate-600 transition-colors 
    ${!isAuthenticated || role !== 'user'
      ? "cursor-not-allowed opacity-50 dark:text-slate-700 dark:hover:bg-slate-900"
      : "hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
    }`}
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
    {!isAuthenticated || role !== 'user' ? 0 : 4}
  </span>
</button>



                {/* Profile Icon (Desktop Only) */}
                <button
                  onClick={() => setuserSheetDesktop(true)}

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
                  <div className="text-sm font-semibold text-slate-900 truncate dark:text-white">{[short, full?.city].filter(Boolean).join(", ") || "Islamabad, DHA Phase 2"}</div>
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
        <main  >
          <Outlet />
        </main>
      </div>

      {/* // User Account */}
      <Drawer open={userDrawerMobile} onOpenChange={setuserDrawerMobile}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>


      {/* User Sheet on desktop */}
      <Sheet open={userSheetDesktop} onOpenChange={setuserSheetDesktop}>
        <SheetContent >
          <SheetHeader>
            <SheetTitle>User are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>


      {/* Cart Sheet on both */}
      <Sheet open={cartSheet} onOpenChange={setcartSheet}>
        <SheetContent
          side="right"
          className="
      w-full
      sm:w-[340px]
      md:w-[380px]
      lg:w-[420px]
      p-3 sm:p-4
    "
        >
          {/* Header */}
          <SheetHeader className="border-b pb-2">
            <SheetTitle className="text-lg sm:text-xl font-bold text-gray-900">
              Your Cart
            </SheetTitle>
          </SheetHeader>

          {/* Cart Items */}
          <div
            className="
        mt-2 space-y-3
        overflow-y-auto
        max-h-[calc(100vh-80px)]
      "
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="bg-white p-2 sm:p-3 rounded-lg border border-gray-200">
              {/* Restaurant Info */}
              <div className="flex justify-between items-start gap-2">
                <div className="flex items-start gap-2">
                  <img
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover"
                    src="storage/category/pizza.jpg"
                    alt="Restaurant"
                    onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/50x50/38a169/ffffff?text=R")
                    }
                  />

                  <div>
                    <h4 className="font-semibold text-sm sm:text-base text-gray-800 leading-tight">
                      Saas Bahu Ka Chatkhara
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                      <span>40–60 min</span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full" />
                      <span className="text-orange-600 font-medium">Free</span>
                    </div>
                  </div>
                </div>

                <button className="text-gray-400 hover:text-red-500 transition p-1.5">
                  <i className="ri-delete-bin-6-line text-lg"></i>
                </button>
              </div>

              <hr className="my-2 border-gray-100" />

              {/* Item & Quantity */}
              <div className="flex items-center gap-2">
                <img
                  className="w-12 h-12 rounded-lg object-cover shadow-sm"
                  src="storage/menu/burger.jpg"
                  alt="Item"
                  onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/80x80/f97316/ffffff?text=I")
                  }
                />

                <button className="w-10 h-10 sm:w-11 sm:h-11 border border-gray-300 rounded-lg text-xl text-gray-500 bg-gray-50 hover:bg-gray-100 transition">
                  +
                </button>
              </div>

              {/* Price */}
              <div className="mt-2 flex justify-between items-center">
                <span className="text-orange-600 text-xs font-semibold">
                  🏷️ Save Rs.55
                </span>

                <div className="text-right">
                  <span className="text-gray-400 line-through text-xs mr-1">
                    Rs.550
                  </span>
                  <span className="text-orange-600 font-bold text-base">
                    Rs.495
                  </span>
                </div>
              </div>

              {/* Checkout */}
              <button className="w-full mt-3 py-2 rounded-lg border border-gray-800 text-sm font-semibold text-gray-800 hover:bg-gray-800 hover:text-white transition">
                Go to checkout
              </button>
            </div>
          </div>
 <div
            className="
        mt-2 space-y-3
        overflow-y-auto
        max-h-[calc(100vh-80px)]
      "
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="bg-white p-2 sm:p-3 rounded-lg border border-gray-200">
              {/* Restaurant Info */}
              <div className="flex justify-between items-start gap-2">
                <div className="flex items-start gap-2">
                  <img
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover"
                    src="storage/category/pizza.jpg"
                    alt="Restaurant"
                    onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/50x50/38a169/ffffff?text=R")
                    }
                  />

                  <div>
                    <h4 className="font-semibold text-sm sm:text-base text-gray-800 leading-tight">
                      Saas Bahu Ka Chatkhara
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                      <span>40–60 min</span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full" />
                      <span className="text-orange-600 font-medium">Free</span>
                    </div>
                  </div>
                </div>

                <button className="text-gray-400 hover:text-red-500 transition p-1.5">
                  <i className="ri-delete-bin-6-line text-lg"></i>
                </button>
              </div>

              <hr className="my-2 border-gray-100" />

              {/* Item & Quantity */}
              <div className="flex items-center gap-2">
                <img
                  className="w-12 h-12 rounded-lg object-cover shadow-sm"
                  src="storage/menu/burger.jpg"
                  alt="Item"
                  onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/80x80/f97316/ffffff?text=I")
                  }
                />

                <button className="w-10 h-10 sm:w-11 sm:h-11 border border-gray-300 rounded-lg text-xl text-gray-500 bg-gray-50 hover:bg-gray-100 transition">
                  +
                </button>
              </div>

              {/* Price */}
              <div className="mt-2 flex justify-between items-center">
                <span className="text-orange-600 text-xs font-semibold">
                  🏷️ Save Rs.55
                </span>

                <div className="text-right">
                  <span className="text-gray-400 line-through text-xs mr-1">
                    Rs.550
                  </span>
                  <span className="text-orange-600 font-bold text-base">
                    Rs.495
                  </span>
                </div>
              </div>

              {/* Checkout */}
              <button className="w-full mt-3 py-2 rounded-lg border border-gray-800 text-sm font-semibold text-gray-800 hover:bg-gray-800 hover:text-white transition">
                Go to checkout
              </button>
            </div>
          </div>
         

          
        </SheetContent>
      </Sheet>






    </>
  );
};

export default UserLayout;
