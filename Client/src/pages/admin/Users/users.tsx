import usePageTitle from '@/hooks/usePageTitle';
import DataTable from '@/components/data-table';
import { useQuery } from '@tanstack/react-query';
import api from '@/Api/api';
import { useState ,useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Input } from '@/components/shared/ui';

interface UserData {
  _id: string;
  username: string;
  email: string;
  status: "All" | "active" | "inactive" | "blocked";
  phone?: string;
  city?: string;
  gender?: string;
  avatar?: string;
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
    queryKey: ['users', currentPage, statusFilter ,debouncedSearch],
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
              <button className="px-3 py-1.5 cursor-pointer bg-blue-100 text-blue-800 rounded hover:bg-blue-200 text-xs font-semibold transition">
                Edit
              </button>
              <button className="px-3 py-1.5 cursor-pointer bg-red-100 text-red-800 rounded hover:bg-red-200 text-xs font-semibold transition">
                Delete
              </button>
              {/* Dialog ya More button agar chahiye to yahan include kar sakte ho */}
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
