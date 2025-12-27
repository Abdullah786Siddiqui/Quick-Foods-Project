import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/shared/ui";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
interface User {
  _id: string;
  username: string;
  email: string;
  phone?: string;
  status: "All" | "active" | "inactive" | "blocked";
  city?: string;
  gender?: string;
  avatar?: string;

}

interface DataTableProps {
  data: User[];
  isPending: boolean;
  isError: boolean;
  currentPage: number;
  headers: string[];
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

const STATUS_LABELS: Record<User["status"], string> = {
  active: "Online",
  inactive: "Offline",
  blocked: "Blocked",
  All: "All",
};

const DataTable: React.FC<DataTableProps> = ({ data, isPending, isError, currentPage, setCurrentPage, totalPages, headers }) => {
  return (
    <div className="px-6">


      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 border border-gray-200 rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-4 py-3">
                <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
              </th>
              {headers.map((header, i) => (
                <th key={i} className="px-6 py-3">{header}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isPending ? (
              // 3 loading rows dikhaye (aap number change kar sakte ho)
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="bg-white border-b border-gray-200">
                  <td className="px-4 py-3">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="flex flex-col gap-1">
                        <div className="w-24 h-3 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-32 h-2 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-200 animate-pulse"></div>
                      <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
                  </td>
                  <td className="px-6 py-3 flex gap-2">
                    <div className="w-12 h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-12 h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-12 h-6 bg-gray-200 rounded animate-pulse"></div>

                  </td>
                </tr>
              ))
            ) : isError ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-red-500">
                  Error loading data.
                </td>
              </tr>
            ) : data && data.length > 0 ? (
              data.map((user, index) => (
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
                      <span className={`h-2.5 w-2.5 rounded-full ${user.status === "active" ? "bg-green-500" : "bg-red-500"}`}></span>
                      <span className="text-sm">{STATUS_LABELS[user.status]}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3">{user.city || "Required"}</td>
                  <td className="px-6 py-3">{user.gender || "Required"}</td>
                  <td className="px-6 py-3">
                    <div className="flex space-x-2 items-center h-full">
                      <button className="px-3 py-1.5 cursor-pointer bg-blue-100 text-blue-800 rounded hover:bg-blue-200 text-xs font-semibold transition">
                        Edit
                      </button>
                      <button className="px-3 py-1.5 cursor-pointer bg-red-100 text-red-800 rounded hover:bg-red-200 text-xs font-semibold transition">
                        Delete
                      </button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="cursor-pointer" size="sm">
                            More
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>User Information</DialogTitle>

                          </DialogHeader>

                          <div className="flex space-x-6 mt-4">
                            {/* Left: Profile Image */}
                            <div>
                              <img
                                src={user.avatar}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover border"
                              />
                            </div>

                            {/* Right: User Inputs */}
                            <div className="flex-1 space-y-3">
                              <div>
                                <label className="text-xs font-semibold text-gray-600">Name</label>
                                <Input value={user.username} readOnly />
                              </div>
                              <div>
                                <label className="text-xs font-semibold text-gray-600">Email</label>
                                <Input value={user.email} readOnly />
                              </div>
                              <div>
                                <label className="text-xs font-semibold text-gray-600">Phone</label>
                                <Input value={user.phone} readOnly />
                              </div>
                              <div>
                                <label className="text-xs font-semibold text-gray-600">Gender</label>
                                <Input value={user.gender} readOnly />
                              </div>
                            </div>
                          </div>

                          {/* Footer Buttons */}
                          <div className="flex justify-end mt-6 space-x-3">
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button variant="default">Update</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

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
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 cursor-pointer disabled:opacity-50">
          Previous
        </button>
        <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100">{currentPage}</button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 cursor-pointer disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
