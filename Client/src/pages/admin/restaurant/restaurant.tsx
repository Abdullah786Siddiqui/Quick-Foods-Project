// import DataTable from '@/components/data-table'
import api from '@/Api/api';
import DataTable from '@/components/data-table';
import { SectionCards } from '@/components/section-cards'
import usePageTitle from '@/hooks/usePageTitle';
import { useQuery } from '@tanstack/react-query';
import { X, MapPin, Phone, Building2, Pencil, Trash2 } from "lucide-react";
import { AlertTriangle, CheckCircle, HomeIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Dialog, DialogContent, Input } from '@/components/shared/ui';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Restaurant = () => {
  usePageTitle("Restaurant");


  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [limit] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);



  // Debouncing: searchQuery 
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // TypeScript Interface

  interface Timing {
    week_day: string;
    opening_time: string;
    closing_time: string;
  }
  type StatusFilter = "All" | "active" | "inactive" | "blocked";

  interface Location {
    is_main: boolean;
    timings: Timing[];
  }

  interface RestaurantData {
    _id: string;
    username: string;
    branch_email: string;
    branch_phone_number: string;
    image: string | null;
    email: string;
    status: "active" | "inactive" | "blocked";
    phone?: string;
    city?: string;
    locations: Location[];
  }


  // Restaurent Api
  const { data, isPending, isError } = useQuery({
    queryKey: ['restaurant', currentPage, statusFilter, debouncedSearch],
    queryFn: async () => {
      const response = await api.get(`/admin/restaurants?page=${currentPage}&limit=${limit}&search=${debouncedSearch}`);
      const filteredRestaurant = statusFilter === "All"
        ? response.data.restaurant
        : response.data.restaurant.filter((restaurant: RestaurantData) => restaurant.status === statusFilter);
      return {
        restaurants: filteredRestaurant,
        pagination: response.data.pagination,
        stats: response.data.stats
      };
    },
    gcTime: 3000000
  });

  const handleBranches = async (id: string) => {
    // Remove the colon in the URL
    const response = await api.get(
      `/admin/restaurants/branches/${id}?page=${currentPage}&limit=${limit}&search=${debouncedSearch}`
    );
    return response.data; // adjust according to your branch API
  };


  // // Restaurent Branches Api
  const {
    data: branchData,
    isPending: isBranchLoading,
    isError: isBranchError,
  } = useQuery({
    queryKey: ['branches', selectedRestaurantId],
    queryFn: () => handleBranches(selectedRestaurantId!), // call the function
    enabled: !!selectedRestaurantId, // only fetch if a restaurant is selected
  });

  console.log(branchData);


  // Stats Data
  const ResImpdata = [
    {
      title: "Total Restaurant",
      value: data?.stats.totalRestaurant,
      Icon: HomeIcon,
      detail: "+120 this month",
      detailColor: "text-fuchsia-500",
      bgColor: "bg-fuchsia-100",
    },
    {
      title: "Active Restaurant",
      value: data?.stats.activeRestaurant,
      Icon: CheckCircle,
      detail: "34% of total",
      detailColor: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      title: "InActive Restaurant",
      value: data?.stats.inactiveRestaurant,
      Icon: AlertTriangle,
      detail: "128 need attention",
      detailColor: "text-yellow-500",
      bgColor: "bg-yellow-100",
    },
    // You can easily add more cards here
  ];

  //Table Headers
  const headers = ["Name", "Phone", "Status", "Timing", "Days", "Actions"];



  return (
    <>
      <div className="flex flex-1 flex-col gap-4 ">
        {/* Stats */}
        <div className="mb-4">
          {isPending ? (
            <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="p-4 rounded-xl bg-gray-100">
                    {/* Header Skeleton */}
                    <div className="flex justify-between items-center mb-2">
                      <div className="h-4 w-24 bg-gray-300 rounded"></div>
                      <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
                    </div>
                    {/* Content Skeleton */}
                    <div className="h-10 w-16 bg-gray-300 rounded mb-1"></div>
                    <div className="h-3 w-32 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <SectionCards cardData={ResImpdata} />

          )}

        </div>

        {/* Top controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-6">
          {/* Search */}
          <div className="flex w-full max-w-sm items-center gap-2">
            <Input
              type="text"
              placeholder="Type to search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

          </div>

          {/* Status Filter */}
          <Select onValueChange={(val) => setStatusFilter(val as StatusFilter)} defaultValue="All">
            <SelectTrigger className="w-full max-w-sm cursor-pointer">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="active">Online</SelectItem>
              <SelectItem value="inactive">Offline</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Data Table */}
        <DataTable
          data={data?.restaurants || []}
          headers={headers}
          isPending={isPending}
          isError={isError}
          renderRow={(restaurant: RestaurantData, index) => (
            <tr key={restaurant._id ?? restaurant.email ?? index} className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-all duration-200">

              {/* Name + Email */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={restaurant.image || `https://github.com/${restaurant.username}.png`}
                    alt={restaurant.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex flex-col leading-tight truncate">
                    <p className="text-sm font-semibold text-gray-900 truncate">{restaurant.username}</p>
                    <p className="text-xs text-gray-500 truncate">{restaurant.email}</p>
                  </div>
                </div>
              </td>

              {/* Phone */}
              <td className="px-6 py-3 text-sm truncate">{restaurant.phone || "Required"}</td>

              {/* Status */}
              <td className="px-6 py-3">
                <div className="flex items-center gap-2 h-full text-sm">
                  <span className={`h-2.5 w-2.5 rounded-full ${restaurant.status === "active" ? "bg-green-500" : restaurant.status === "inactive" ? "bg-red-500" : "bg-gray-500"}`}></span>
                  <span className="truncate">{restaurant.status === "active" ? "Online" : restaurant.status === "inactive" ? "Offline" : "Blocked"}</span>
                </div>
              </td>

              {/* Timing (hide on very small screens) */}
              <td className="px-6 py-3 whitespace-nowrap text-sm">
                {restaurant.locations?.[0]?.timings?.[0]
                  ? `${restaurant.locations[0].timings[0].opening_time} - ${restaurant.locations[0].timings[0].closing_time}`
                  : "N/A"}
              </td>

              {/* Weekday (hide on very small screens) */}
              <td className="px-6 py-3 whitespace-nowrap text-sm">
                {restaurant.locations?.[0]?.timings?.[0]?.week_day || "Required"}
              </td>

              {/* Actions */}
              <td className="px-4 py-3 flex gap-2 items-center mt-2 flex-nowrap ">
                <Link
                  to={`/admin/restaurant/detail/${restaurant._id}`}
                  className="px-2 py-1 cursor-pointer bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs font-semibold transition truncate"
                >
                  Details
                </Link>

                <button
                  onClick={() => {
                    setOpenDialog(true);
                    setSelectedRestaurantId(restaurant._id);
                  }}
                  className="px-2 py-1 cursor-pointer bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 text-xs font-semibold transition truncate"
                >
                  Branches
                </button>

                <button
                  className="px-2 py-1 cursor-pointer bg-red-100 text-red-800 rounded hover:bg-red-200 text-xs font-semibold transition truncate"
                >
                  Delete
                </button>
              </td>
            </tr>
          )}
        />

      </div>


      <Dialog
        open={openDialog}
        onOpenChange={(open) => {
          setOpenDialog(open);

        }}
      >

        <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] sm:max-w-5xl max-h-[90vh] p-0 rounded-2xl sm:rounded-3xl border-none shadow-2xl bg-white flex flex-col overflow-hidden">

          {/* Header: Adjusted padding and text sizing for mobile */}
          <div className="flex justify-between items-center px-5 sm:px-8 py-4 sm:py-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
              <div className="p-2 sm:p-2.5 bg-blue-500 rounded-lg shrink-0">
                <Building2 size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div className="truncate">
                <h2 className="text-base sm:text-xl font-bold tracking-tight truncate">Restaurant Branches</h2>
                <p className="text-[10px] sm:text-xs text-slate-400 truncate">Manage your location network</p>
              </div>
            </div>
            {/* <button onClick={() => {
              setOpenDialog(false)
            }} className="p-2 cursor-pointer hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white">
              <X size={20} />
            </button> */}
          </div>

          {/* Table Wrapper: Added scrollable container for responsiveness */}
          <div className="flex-1 overflow-y-auto custom-scroll p-3 sm:p-6 bg-slate-50/50">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto"> {/* Critical for mobile table view */}
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 sm:px-6 py-4 text-left text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Branch Name</th>
                      <th className="px-4 sm:px-6 py-4 text-left text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Phone</th>
                      <th className="hidden md:table-cell px-4 sm:px-6 py-4 text-left text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                      <th className="px-4 sm:px-6 py-4 text-left text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Days</th>
                      <th className="px-4 sm:px-6 py-4 text-center text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
<tbody className="divide-y divide-slate-100">
  {isBranchLoading ? (
    Array.from({ length: 3 }).map((_, i) => (
      <tr key={i}>
        <td colSpan={5} className="py-4">
          <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
        </td>
      </tr>
    ))
  ) : isBranchError ? (
    <tr>
      <td colSpan={5} className="text-center py-4 text-red-500">
        Failed to load branches
      </td>
    </tr>
  ) : !branchData?.restaurants?.length ? (
    /* ❌ No restaurants */
    <tr>
      <td colSpan={5} className="text-center py-6 text-gray-500">
        No branches available
      </td>
    </tr>
  ) : (
    branchData.restaurants.flatMap(
      (restaurant: RestaurantData) =>
        restaurant.locations?.length
          ? restaurant.locations.map((location, locIndex) => (
              <tr
                key={location._id ?? locIndex}
                className="hover:bg-blue-50/30 transition-colors"
              >
                {/* Restaurant */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        restaurant.image ||
                        `https://github.com/${restaurant.username}.png`
                      }
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="truncate">
                      <p className="text-sm font-semibold truncate">
                        {restaurant.username}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {location.branch_email || "Email not added"}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Phone */}
                <td className="px-4 py-3 text-sm">
                  {location.branch_phone_number || "N/A"}
                </td>

                {/* Status */}
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`inline-flex items-center gap-2 ${
                      restaurant.status === "active"
                        ? "text-green-600"
                        : restaurant.status === "inactive"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        restaurant.status === "active"
                          ? "bg-green-500"
                          : restaurant.status === "inactive"
                          ? "bg-red-500"
                          : "bg-gray-500"
                      }`}
                    />
                    {restaurant.status}
                  </span>
                </td>

                {/* Days */}
                <td className="px-4 py-3 text-sm">
                  {location.timings?.length
                    ? location.timings[0].week_day
                    : "Timing not added"}
                </td>

                {/* Actions */}
                <td className="px-4 py-3 flex justify-center gap-2">
                  <button className="p-2 hover:text-blue-600">
                    <Pencil size={16} />
                  </button>
                  <button className="p-2 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))
          : [
              /* ⚠ restaurant hai lekin locations nahi */
              <tr key={restaurant._id}>
                <td
                  colSpan={5}
                  className="text-center py-4 text-gray-400 italic"
                >
                  No branch locations added for {restaurant.username}
                </td>
              </tr>,
            ]
    )
  )}
</tbody>


                 




                </table>
              </div>
            </div>
          </div>

          {/* Footer: Responsive stacking */}
          <div className="px-5 sm:px-8 py-4 border-t bg-white flex flex-row justify-between items-center">
            <span className="text-xs sm:text-sm text-slate-600">
              <span className="hidden sm:inline">Showing</span> <span className="text-slate-900 font-bold">2</span> of <span className="text-slate-900 font-bold">10</span>
            </span>
            <button onClick={() => {
              setOpenDialog(false)
            }} className="px-4 sm:px-6 py-2 cursor-pointer text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-all border border-slate-200">
              Close
            </button>
          </div>
        </DialogContent>







      </Dialog>

      {/* Pagination */}
      <div className="flex justify-end mt-4 space-x-2 px-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 cursor-pointer disabled:opacity-50"
        >
          Previous
        </button>
        <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100">{currentPage}</button>
        <button
          disabled={currentPage === data?.pagination?.totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 cursor-pointer disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </>
  )
}

export default Restaurant