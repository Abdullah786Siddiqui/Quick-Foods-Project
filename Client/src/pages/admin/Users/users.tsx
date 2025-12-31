import usePageTitle from '@/hooks/usePageTitle';
import DataTable from '@/components/data-table';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Mail, MapPin, Edit2, Package, CheckCircle, AlertTriangle } from "lucide-react";
import api from '@/Api/api';
import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Input } from '@/components/shared/ui';
import { Dialog, DialogContent } from '@/components/shared/ui';
import { Button } from '@/components/ui/button';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from 'react-hot-toast';
import { SectionCards } from '@/components/section-cards';

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
type FormInputs = {
  phone: string;
  gender: string;
  email: string;

  address: string;
  city: string;
  province: string;
  country: string;
};

type StatusFilter = "All" | "active" | "inactive" | "blocked";

const Users = () => {
  usePageTitle("User");

  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [limit] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setloading] = useState(false)




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
        pagination: response.data.pagination,
        stats: response.data.stats
      };
    },


    gcTime: 3000000
  });

  const headers = ["Name", "Phone", "Age", "Status", "City", "Gender", "Actions"];







  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields }
  } = useForm<FormInputs>();




  useEffect(() => {
    if (selectedUser) {
      reset({
        phone: selectedUser.phone || "",
        gender: selectedUser.gender || "",
        email: selectedUser.email || "",

        address: selectedUser.location?.address || "",
        city: selectedUser.location?.city || "",
        province: selectedUser.location?.province || "",

      });
    }
  }, [selectedUser, reset]);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const changedData: Partial<FormInputs> = {};

    // 1. Collect only fields that have actually been modified
    Object.keys(dirtyFields).forEach((key) => {
      changedData[key as keyof FormInputs] = data[key as keyof FormInputs];
    });



    // 3. Separate location fields and construct final payload
    const locationKeys = ["address", "city", "province"];
    const locationData: any = {};
    const userData: any = {};

    Object.entries(changedData).forEach(([key, value]) => {
      if (locationKeys.includes(key)) {
        locationData[key] = value;
      } else {
        userData[key] = value;
      }
    });

    // Construct final data object
    const finalData: any = { ...userData };

    // Only add location object if at least one location field changed
    if (Object.keys(locationData).length > 0) {
      finalData.location = locationData;
    }

    // 2. Check if there are any changes at all
    if (Object.keys(changedData).length === 0) {
      toast.error("Nothing to update");

      setOpenDialog(false);
      setIsEditing(false);// Showing error or info toast
      return; // Stop execution here
    }

    // 4. Trigger the mutation
    updateUserMutation.mutate(finalData);
  };

  const updateUserMutation = useMutation({
    mutationFn: async (updatedData: Partial<FormInputs>) => {
      setloading(true)


      if (!selectedUser?._id) throw new Error("No user selected");
      const response = await api.patch(`/admin/user/update/${selectedUser._id}`, updatedData);
      return response.data;
    },
    onSuccess: () => {
      setloading(false);
      setIsEditing(false);
      setOpenDialog(false);
      toast.success("User Updated Successfully");
      setSelectedUser(null);
      // Update users cache for current page/status/search
      queryClient.invalidateQueries({ queryKey: ['users'] });

    },
    onError: (err: any) => {
      setloading(false);
      console.error("Update failed:", err);
    }
  });

  const handleCancle = () => {
    setloading(false);
    setIsEditing(false);
    setOpenDialog(false);
    setSelectedUser(null);

  }

  const UserImpData = [
    {
      title: "Total Users",
      value: data?.stats?.totalUsers,
      Icon: Package,
      detail: "+120 this month",
      detailColor: "text-fuchsia-500",
      bgColor: "bg-fuchsia-100",
    },
    {
      title: "Active Users",
      value: data?.stats?.activeUsers,
      Icon: CheckCircle,
      detail: "34% of total",
      detailColor: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      title: "InActive Users",
      value: data?.stats?.inactiveUsers,
      Icon: AlertTriangle,
      detail: "128 need attention",
      detailColor: "text-yellow-500",
      bgColor: "bg-yellow-100",
    },
    // You can easily add more cards here
  ];

  return (
    <div className="flex flex-1 flex-col gap-4 mb-4">
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
        <SectionCards cardData={UserImpData} />
      )}


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
            {/* <td className="px-4 py-3">
              <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
            </td> */}
            <td className="px-4 py-3">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar || `https://github.com/${user.username}.png`}
                  alt={user.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col leading-tight">
                  <p className="text-sm font-semibold text-gray-900">{user.username}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
            </td>
            <td className="px-6 py-3">{user.phone || "Required"}</td>
            <td className="px-6 py-3">{user.age || 34}</td>

            <td className="px-6 py-3">
              <div className="flex items-center gap-2 h-full">
                <span className={`h-2.5 w-2.5 rounded-full ${user.status === "active" ? "bg-green-500" : user.status === "inactive" ? "bg-red-500" : "bg-gray-500"}`}></span>
                <span className="text-sm">{user.status === "active" ? "Online" : user.status === "inactive" ? "Offline" : "Blocked"}</span>
              </div>
            </td>
            <td className="px-6 py-3">{user.city || "Required"}</td>
            <td className="px-6 py-3">{user.gender || "Required"}</td>
            <td className="px-6 py-3 flex space-x-2 items-center h-full">
               <button
                onClick={() => {
                  setSelectedUser(user);  // set the clicked user
                  setOpenDialog(true)
                  setloading(false)


                }}
                className="px-3 py-1.5 cursor-pointer bg-gray-200 text-white-800 rounded hover:bg-gray-300 text-xs font-semibold transition"
              >
                More
              </button>


              {/* Delete Button */}
              <button
                className="px-3 py-1.5 cursor-pointer bg-red-100 text-red-800 rounded hover:bg-red-200 text-xs font-semibold transition"
              >
                Delete
              </button>



             





            </td>

          </tr>
        )}
      />
      <Dialog
        open={openDialog}
        onOpenChange={(open) => {
          setOpenDialog(open);
          if (!open) {
            setSelectedUser(null);
            setIsEditing(false);
            setloading(false)

          }
        }}
      >


        <DialogContent
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] sm:max-w-md max-h-[90vh] p-0 rounded-2xl border-none shadow-2xl bg-white flex flex-col overflow-hidden"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col h-full min-h-0"
          >
            {selectedUser && (
              <>
                {/* HEADER */}
                <div className="flex-shrink-0 h-24 sm:h-28 bg-gradient-to-r from-blue-600 to-indigo-700" />

                {/* AVATAR */}
                <div className="px-6 flex-shrink-0">
                  <div className="flex items-end gap-4 -mt-10 mb-4">
                    <div className="relative">
                      <img
                        src={
                          selectedUser.avatar || `https://github.com/${selectedUser.username}.png` || `https://ui-avatars.com/api/?name=${selectedUser.username}&background=random`
                        }
                        alt={selectedUser.username}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 border-white shadow-md bg-gray-100 object-cover"
                      />

                      <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                    </div>
                    <div className="mb-1">
                      <h2 className="text-xl font-bold text-gray-900 leading-tight">
                        {selectedUser.username}
                      </h2>
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase rounded-md">
                        {selectedUser.status || "Member"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* SCROLLABLE CONTENT */}
                <div className="px-6 overflow-y-auto custom-scrollbar flex-grow space-y-6">
                  {isEditing && (
                    <p className="w-full text-center text-sm text-green-700 bg-green-100 rounded-md py-1 px-2 mb-2 font-medium">
                      You can now update your profile ✨
                    </p>
                  )}


                  {/* CONTACT */}
                  <section>
                    <DialogTitle className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2 sticky top-0 bg-white py-1">
                      <Mail className="w-3 h-3 text-blue-500" />
                      Contact Details
                    </DialogTitle>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                      {/* Phone */}
                      <div
                        className={`p-3 rounded-xl border transition-all
      ${isEditing
                            ? "bg-white border-blue-300 ring-1 ring-blue-100"
                            : "bg-gray-50 border-gray-200"
                          }
    `}
                      >
                        <p
                          className={`text-[10px] font-bold uppercase mb-1
        ${isEditing ? "text-blue-600" : "text-gray-400"}
      `}
                        >
                          Phone
                        </p>

                        <input
                          {...register("phone", {
                            required: "Phone is required",
                            minLength: { value: 10, message: "Minimum 10 digits" }
                          })}
                          readOnly={!isEditing}
                          placeholder={isEditing ? "Enter phone number" : ""}
                          className={`w-full bg-transparent outline-none text-sm transition-colors
        ${isEditing
                              ? "text-gray-900 placeholder:text-gray-400"
                              : "text-gray-500 cursor-not-allowed"
                            }
      `}
                        />

                        {errors.phone && (
                          <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
                        )}
                      </div>

                      {/* Gender */}
                      <div
                        className={`p-3 rounded-xl border transition-all
      ${isEditing
                            ? "bg-white border-blue-300 ring-1 ring-blue-100"
                            : "bg-gray-50 border-gray-200"
                          }
    `}
                      >
                        <p
                          className={`text-[10px] font-bold uppercase mb-1
        ${isEditing ? "text-blue-600" : "text-gray-400"}
      `}
                        >
                          Gender
                        </p>

                        <input
                          {...register("gender", { required: "Gender is required" })}
                          readOnly={!isEditing}
                          placeholder={isEditing ? "Enter gender" : ""}
                          className={`w-full bg-transparent outline-none text-sm transition-colors
        ${isEditing
                              ? "text-gray-900 placeholder:text-gray-400"
                              : "text-gray-500 cursor-not-allowed"
                            }
      `}
                        />

                        {errors.gender && (
                          <p className="text-xs text-red-500 mt-1">{errors.gender.message}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div
                        className={`sm:col-span-2 p-3 rounded-xl border transition-all
      ${isEditing
                            ? "bg-white border-blue-300 ring-1 ring-blue-100"
                            : "bg-gray-50 border-gray-200"
                          }
    `}
                      >
                        <p
                          className={`text-[10px] font-bold uppercase mb-1
        ${isEditing ? "text-blue-600" : "text-gray-400"}
      `}
                        >
                          Email
                        </p>

                        <input
                          {...register("email", {
                            required: "Email is required",
                            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                          })}
                          readOnly={!isEditing}
                          placeholder={isEditing ? "Enter email address" : ""}
                          className={`w-full bg-transparent outline-none text-sm transition-colors
        ${isEditing
                              ? "text-gray-900 placeholder:text-gray-400"
                              : "text-gray-500 cursor-not-allowed"
                            }
      `}
                        />

                        {errors.email && (
                          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                        )}
                      </div>

                    </div>

                  </section>

                  {/* LOCATION */}
                  <section>
                    <DialogTitle className="text-[11px] font-bold text-gray-800 uppercase tracking-widest mb-3 flex items-center gap-2 sticky top-0 bg-white py-1">
                      <MapPin className="w-3 h-3 text-gray-800" />
                      Location Info
                    </DialogTitle>

                    <div
                      className={`p-3 rounded-xl border transition-all
    ${isEditing
                          ? "bg-white border-blue-300 ring-1 ring-blue-100"
                          : "bg-gray-50 border-gray-200"
                        }
  `}
                    >
                      <p
                        className={`text-xs font-semibold mb-1
      ${isEditing ? "text-blue-600" : "text-gray-400"}
    `}
                      >
                        Address
                      </p>

                      <input
                        {...register("address", { required: "Address is required" })}
                        readOnly={!isEditing}
                        placeholder={isEditing ? "Enter address" : ""}
                        className={`w-full bg-transparent outline-none text-sm transition-colors
      ${isEditing
                            ? "text-gray-900 placeholder:text-gray-400"
                            : "text-gray-500 cursor-not-allowed"
                          }
    `}
                      />

                      {errors.address && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.address.message}
                        </p>
                      )}
                    </div>


                    <div className="flex gap-3 mt-3">
                      <div
                        className={`flex-1 p-3 rounded-xl border transition-all
    ${isEditing
                            ? "bg-white border-blue-300 ring-1 ring-blue-100"
                            : "bg-gray-50 border-gray-200"
                          }
  `}
                      >
                        <p
                          className={`text-xs font-semibold mb-1
      ${isEditing ? "text-blue-600" : "text-gray-400"}
    `}
                        >
                          City
                        </p>

                        <input
                          {...register("city", { required: "City is required" })}
                          readOnly={!isEditing}
                          placeholder={isEditing ? "Enter city" : ""}
                          className={`w-full bg-transparent outline-none text-sm transition-colors
      ${isEditing
                              ? "text-gray-900 placeholder:text-gray-400"
                              : "text-gray-500 cursor-not-allowed"
                            }
    `}
                        />

                        {errors.city && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.city.message}
                          </p>
                        )}
                      </div>


                      {/* Provinces */}

                      <div
                        className={`flex-1 p-3 rounded-xl border transition-all
    ${isEditing
                            ? "bg-white border-blue-300 ring-1 ring-blue-100"
                            : "bg-gray-50 border-gray-200"
                          }
  `}
                      >
                        <p
                          className={`text-xs font-semibold mb-1
      ${isEditing ? "text-blue-600" : "text-gray-400"}
    `}
                        >
                          Province
                        </p>

                        <input
                          {...register("province", { required: "Province is required" })}
                          readOnly={!isEditing}
                          className={`w-full bg-transparent outline-none text-sm transition-colors
      ${isEditing
                              ? "text-gray-900 placeholder:text-gray-400"
                              : "text-gray-500 cursor-not-allowed"
                            }
    `}
                          placeholder={isEditing ? "Enter province" : ""}
                        />

                        {errors.province && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.province.message}
                          </p>
                        )}
                      </div>

                    </div>
                  </section>
                </div>

                {/* FOOTER */}
                <div className="p-4 sm:px-6 flex-shrink-0 flex justify-end gap-3 border-t border-gray-100 bg-white">
                  <Button type='button' onClick={handleCancle}>Cancel</Button>

                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center justify-center cursor-pointer h-10 px-4 sm:px-5 text-xs font-semibold bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1"
                    >
                      <Edit2 className="w-4 h-4 mr-2" /> Edit Profile
                    </button>

                  ) : (
                    <Button type="submit" className="h-10 px-5  text-xs cursor-pointer font-bold bg-green-600 hover:bg-green-700">
                      {loading ? "Update Profile..." : "Update Profile"}
                    </Button>
                  )}
                </div>
              </>
            )}
          </form>
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



    </div >
  );
};

export default Users;
