import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shared/ui";
  import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
interface User {
  id: number;
  username: string;
  phone: string;
  status: "Online" | "Offline";
  city: string;
  gender: string;
  email: string;
  avatar?: string;
}



const DataTable = ({ data  }: { data: User[] }) => {
  

  return (
    <div className="p-6">
      {/* Top controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        {/* Search */}
     


    <div className="flex w-full max-w-sm items-center gap-2">
      <Input type="email" placeholder="Type to search users..." />
      <Button type="submit" variant="outline">
Search      </Button>
    </div>


        {/* Status Filter */}
       <Select>
  <SelectTrigger className="w-full max-w-sm">
    <SelectValue placeholder="Status" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="All">All</SelectItem>
    <SelectItem value="Online">Online</SelectItem>
    <SelectItem value="Offline">Offline</SelectItem>
  </SelectContent>
</Select>
      </div>

      {/* Table */}
   <div className="overflow-x-auto">
  <table className="w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th className="px-4 py-3">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
          />
        </th>
        <th className="px-6 py-3">Name</th>
        <th className="px-6 py-3">Phone</th>
        <th className="px-6 py-3">Status</th>
        <th className="px-6 py-3">City</th>
        <th className="px-6 py-3">Gender</th>
        <th className="px-6 py-3">Actions</th>
      </tr>
    </thead>

    <tbody>
      {data.length > 0 ? (
        data.map((user) => (
          <tr
            key={user.id}
            className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-all duration-200"
          >
            <td className="px-4 py-3">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
              />
            </td>

            {/* Profile + Name + Email */}
            <td className="px-6 py-3">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar || "https://i.pravatar.cc/40"}
                  alt={user.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col leading-tight">
                  <p className="text-sm font-semibold text-gray-900">
                    {user.username}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
            </td>

            <td className="px-6 py-3">{user.phone || "Required"}</td>

            {/* Status with Badge */}
            <td className="px-6 py-3 flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  user.status === "Online" ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
              <span className="text-sm">{user.status}</span>
            </td>

            <td className="px-6 py-3">{user.city || "Required"}</td>
            <td className="px-6 py-3">{user.gender || "Required"}</td>

            {/* Actions */}
            <td className="px-6 py-3 flex space-x-2">
              <button className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 text-xs font-semibold transition">
                Edit
              </button>
              <button className="px-3 py-1.5 bg-red-100 text-red-800 rounded hover:bg-red-200 text-xs font-semibold transition">
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={7} className="text-center py-4 text-gray-500">
            No data found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>


      {/* Pagination */}
      <div className="flex justify-end mt-4 space-x-2">
        <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50">
          Previous
        </button>
        <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100">1</button>
        <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100">2</button>
        <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100">3</button>
        <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100">
          Next
        </button>
      </div>
    </div>
  );
};

export default  DataTable ;
