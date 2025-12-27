import usePageTitle from '@/hooks/usePageTitle';
import DataTable from '@/components/data-table';
import { useQuery } from '@tanstack/react-query';
import api from '@/Api/api';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Input } from '@/components/shared/ui';
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
}
type StatusFilter = "All" | "active" | "inactive" | "blocked";

const Users = () => {
  usePageTitle("User");

  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [limit] = useState(5);
  const { data, isPending, isError } = useQuery({
    queryKey: ['users', currentPage, statusFilter],
    queryFn: async () => {
      const response = await api.get(`/admin/users?page=${currentPage}&limit=${limit}`);
console.log("Api call gaye");

      // Filter users array only
      const filteredUsers = statusFilter === "All"
        ? response.data.users
        : response.data.users.filter((user : UserData)=> user.status === statusFilter);

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
    <>

      <div className="flex flex-1 flex-col gap-4 ">

        {/* Top controls */}
        <div className="flex flex-col md:flex-row justify-between items-center  gap-4 px-6">
          {/* Search */}
          <div className="flex w-full max-w-sm items-center gap-2">
            <Input type="email" placeholder="Type to search users..." />
            <Button type="submit" variant="outline">
              Search      </Button>
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

        {/* <SectionCards /> */}
        <DataTable
          data={data?.users || []}
          headers={headers}
          isPending={isPending}
          isError={isError}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={data?.pagination?.totalPages || 1} // total pages backend se
        />
      </div>
    </>
  );
};

export default Users;
