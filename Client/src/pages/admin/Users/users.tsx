import usePageTitle from '@/hooks/usePageTitle';
import DataTable from '@/components/data-table';
import { useQuery } from '@tanstack/react-query';
import { Mail, MapPin, User , Edit2 } from "lucide-react";
import api from '@/Api/api';
import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Input } from '@/components/shared/ui';
import { Dialog, DialogContent, DialogTrigger } from '@/components/shared/ui';
import { Button } from '@/components/ui/button';
interface UserData {
  _id: string;
  username: string;
  email: string;
  status: "All" | "active" | "inactive" | "blocked";
  phone?: string;
  city?: string;
  gender?: string;
  avatar?: string;
  age?: number; // Add this if you plan to calculate it or add it to backend
  location?: {
    address: string;
    city: string;
    province: string;
    country: string;
    latitude: number;
    longitude: number;
  };
}
type StatusFilter = "All" | "active" | "inactive" | "blocked";

const Users = () => {
  usePageTitle("User");

  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [limit] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);


  // Debouncing: searchQuery ki value 500ms delay ke baad update hoti hai
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1); // optional: search change hone pe page reset
    }, 500);

    return () => clearTimeout(handler); // cleanup on unmount or next change
  }, [searchQuery]);

  const { data, isPending, isError } = useQuery({
    queryKey: ['users', currentPage, statusFilter, debouncedSearch],
    queryFn: async () => {
      const response = await api.get(`/admin/users?page=${currentPage}&limit=${limit}&search=${debouncedSearch}`);


      const filteredUsers = statusFilter === "All"
        ? response.data.users
        : response.data.users.filter((user: UserData) => user.status === statusFilter);

      return {
        users: filteredUsers,
        pagination: response.data.pagination
      };
    },

    staleTime: 300000,
    gcTime: 300000
  });

  const headers = ["Name", "Phone", "Status", "City", "Gender", "Actions"];



  return (
    <div className="flex flex-1 flex-col gap-4">

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

      {/* Users Table */}
      <DataTable
        data={data?.users || []}
        headers={headers}
        isPending={isPending}
        isError={isError}
        renderRow={(user: UserData, index) => (
          <tr key={user._id ?? user.email ?? index} className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-all duration-200">
            <td className="px-4 py-3">
              <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center gap-3">
                <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex flex-col leading-tight">
                  <p className="text-sm font-semibold text-gray-900">{user.username}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
            </td>
            <td className="px-6 py-3">{user.phone || "Required"}</td>
            <td className="px-6 py-3">
              <div className="flex items-center gap-2 h-full">
                <span className={`h-2.5 w-2.5 rounded-full ${user.status === "active" ? "bg-green-500" : user.status === "inactive" ? "bg-red-500" : "bg-gray-500"}`}></span>
                <span className="text-sm">{user.status === "active" ? "Online" : user.status === "inactive" ? "Offline" : "Blocked"}</span>
              </div>
            </td>
            <td className="px-6 py-3">{user.city || "Required"}</td>
            <td className="px-6 py-3">{user.gender || "Required"}</td>
            <td className="px-6 py-3 flex space-x-2 items-center h-full">
              {/* Edit Button */}
              <button
                className="px-3 py-1.5 cursor-pointer bg-blue-100 text-blue-800 rounded hover:bg-blue-200 text-xs font-semibold transition"
              >
                Edit
              </button>

              {/* Delete Button */}
              <button
                className="px-3 py-1.5 cursor-pointer bg-red-100 text-red-800 rounded hover:bg-red-200 text-xs font-semibold transition"
              >
                Delete
              </button>


    <Dialog>
  <DialogTrigger asChild>
    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 text-xs font-semibold shadow-sm transition-all active:scale-95">
     More
    </button>
  </DialogTrigger>

  <DialogContent
    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] sm:max-w-md h-fit max-h-[90vh] p-0 rounded-2xl border-none shadow-2xl bg-white flex flex-col overflow-hidden"
  >
    {/* FIXED: Visual Header */}
    <div className="flex-shrink-0 h-24 sm:h-28 bg-gradient-to-r from-blue-600 to-indigo-700" />

    {/* FIXED: Avatar & Identity */}
    <div className="px-6 flex-shrink-0">
      <div className="flex items-end gap-4 -mt-10 mb-4">
        <div className="relative">
          <img
            src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}&background=random`}
            alt={user.username}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 border-white shadow-md bg-gray-100 object-cover"
          />
          <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
        <div className="mb-1">
          <h2 className="text-xl font-bold text-gray-900 leading-tight">{user.username}</h2>
          <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase rounded-md">
            {user.status || "Member"}
          </span>
        </div>
      </div>
    </div>

    {/* SCROLLABLE: Contact Details & Info */}
    <div className="px-6 overflow-y-auto custom-scrollbar flex-grow space-y-6">
      <section>
        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2 sticky top-0 bg-white py-1">
          <Mail className="w-3 h-3 text-blue-500" /> Contact Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
            <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Phone</p>
            <p className="text-sm font-semibold text-gray-800">{user.phone || "N/A"}</p>
          </div>
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
            <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Gender</p>
            <p className="text-sm font-semibold text-gray-800">{user.gender || "N/A"}</p>
          </div>
          <div className="sm:col-span-2 p-3 rounded-xl bg-gray-50 border border-gray-100">
            <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Email Address</p>
            <p className="text-sm font-semibold text-gray-800 truncate">{user.email}</p>
          </div>
        </div>
      </section>

    <section>
  <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2 sticky top-0 bg-white py-1">
    <MapPin className="w-3 h-3 text-indigo-500" /> Location Info
  </h3>

  {/* Address */}
  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 mb-2">
    <p className="text-sm text-gray-600 font-medium">Address:</p>
    <p className="text-sm text-gray-700">{user.location?.address || "N/A"}</p>
  </div>

  {/* City & Province in one row */}
  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 mb-2 flex justify-between gap-4">
    <div className="flex-1">
      <p className="text-sm text-gray-600 font-medium">City:</p>
      <p className="text-sm text-gray-700">{user.location?.city || "N/A"}</p>
    </div>
    <div className="flex-1">
      <p className="text-sm text-gray-600 font-medium">Province:</p>
      <p className="text-sm text-gray-700">{user.location?.province || "N/A"}</p>
    </div>
  </div>

  {/* Live Google Map Button */}
  {user.location?.latitude && user.location?.longitude && (
    <div className="p-4">
      <a
        href={`https://www.google.com/maps?q=${user.location.latitude},${user.location.longitude}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full block text-center px-4 py-2 bg-indigo-500 text-white rounded-lg text-xs font-semibold hover:bg-indigo-600 transition"
      >
        View on Google Maps
      </a>
    </div>
  )}
</section>


    </div>

    {/* FIXED: Action Footer */}
    <div className="p-4 sm:px-6 flex-shrink-0 flex justify-end gap-3 border-t border-gray-100 bg-white">
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-xs font-bold text-gray-500">Cancel</Button>
      </DialogTrigger>
      <Button className="text-xs font-bold h-10 px-6 bg-indigo-600 hover:bg-indigo-700">
        <Edit2 className="w-3 h-3 mr-2" /> Edit Profile
      </Button>
    </div>
  </DialogContent>
</Dialog>

            </td>

          </tr>
        )}
      />

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



    </div>
  );
};

export default Users;
