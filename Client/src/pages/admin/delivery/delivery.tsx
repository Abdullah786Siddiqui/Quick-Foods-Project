// import  DataTable  from '@/components/data-table'
import api from '@/Api/api';
import DataTable from '@/components/data-table';
import { SectionCards } from '@/components/section-cards'
import { usePageTitle } from "@/components/shared/hooks"
import { useQuery } from '@tanstack/react-query';
import { AlertTriangle, Bike, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Dialog, DialogContent, Input } from '@/components/shared/ui';
// import { useForm, type SubmitHandler } from "react-hook-form";





export interface DeliveryRiderLocation {
  _id: string;
  delivery_rider_id: string; // Rider ka ObjectId
  city_id?: {
    _id: string;
    name: string;
  } | null;
  province_id?: {
    _id: string;
    name: string;
  } | null;
  address?: string | null;
  locality?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface DeliveryRider {
  _id: string;
  name: string;
  email: string;
  cnic: string;
  phone_number: string;
  dob?: string | null;
  vehical: "bike" | "cycle";
  status: "inactive" | "active" | "blocked";
  rating: number;
  gender?: "male" | "female" | "other" | null;
  total_deliveries: number;
  profile_image?: string | null;
  location?: DeliveryRiderLocation | null; // virtual populated field
  createdAt: string;
  updatedAt: string;
}
type StatusFilter = "All" | "active" | "inactive" | "blocked";
const Delivery = () => {
  usePageTitle("Delivery");

  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [limit] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  // const [selectedDeliveryRider, setSelectedDeliveryRider] = useState<DeliveryRider | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  // const [isEditing, setIsEditing] = useState(false);
  // const [loading, setloading] = useState(false)

    // Debouncing: searchQuery ki value 500ms delay ke baad update hoti hai
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedSearch(searchQuery);
        setCurrentPage(1); // optional: search change hone pe page reset
      }, 500);
  
      return () => clearTimeout(handler); // cleanup on unmount or next change
    }, [searchQuery]);


  const { data, isPending, isError } = useQuery({
    queryKey: ['deliveryriders', currentPage, statusFilter, debouncedSearch],
    queryFn: async () => {
      const response = await api.get(`/admin/deliveryRiders?page=${currentPage}&limit=${limit}&search=${debouncedSearch}`);
      const filteredDeliveryRider = statusFilter === "All"
        ? response.data.deliveryRiders
        : response.data.deliveryRiders.filter((deliveryRiders: DeliveryRider) => deliveryRiders.status === statusFilter);
      return {
        deliveryRiders: filteredDeliveryRider,
        pagination: response.data.pagination,
        stats: response.data.stats
      };
    },
    gcTime: 3000000
  });



  const DeliveryImpData = [
    {
      title: "Total Delivery Partners",
      value: data?.stats?.totalDeliveryRider,
      Icon: Bike,
      detail: "+120 this month",
      detailColor: "text-fuchsia-500",
      bgColor: "bg-fuchsia-100",
    },
    {
      title: "Active Delivery Partner",
      value: data?.stats?.activeDeliveryRider,
      Icon: CheckCircle,
      detail: "34% of total",
      detailColor: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      title: "InActive Delivery Partner",
      value: data?.stats?.inactiveDeliveryRider,
      Icon: AlertTriangle,
      detail: "128 need attention",
      detailColor: "text-yellow-500",
      bgColor: "bg-yellow-100",
    },
    // You can easily add more cards here
  ];
  const headers = ["Name", "Phone", "Status", "Vehicle", "Gender", "Action"];
    // const {
    //   register,
    //   handleSubmit,
    //   reset,
    //   formState: { errors, dirtyFields }
    // } = useForm<DeliveryRider>();

    // const onSubmit: SubmitHandler<DeliveryRider> = async (data) => {
    // }
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 ">
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
          <SectionCards cardData={DeliveryImpData} />
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
        {/* <DataTable /> */}
        <DataTable
          data={data?.deliveryRiders || []}
          headers={headers}
          isPending={isPending}
          isError={isError}
          renderRow={(deliveryRiders: DeliveryRider, index) => (
            <tr key={deliveryRiders._id ?? deliveryRiders.email ?? index} className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-all duration-200">
              {/* <td className="px-4 py-3">
              <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
            </td> */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={deliveryRiders.profile_image || `https://github.com/${deliveryRiders.name}.png`}
                    alt={deliveryRiders.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex flex-col leading-tight">
                    <p className="text-sm font-semibold text-gray-900">{deliveryRiders.name}</p>
                    <p className="text-xs text-gray-500">{deliveryRiders.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-3">{deliveryRiders.phone_number || "Required"}</td>
              <td className="px-6 py-3">{deliveryRiders.vehical || 34}</td>
              <td className="px-6 py-3">{deliveryRiders.gender || 34}</td>


              <td className="px-6 py-3">
                <div className="flex items-center gap-2 h-full">
                  <span className={`h-2.5 w-2.5 rounded-full ${deliveryRiders.status === "active" ? "bg-green-500" : deliveryRiders.status === "inactive" ? "bg-red-500" : "bg-gray-500"}`}></span>
                  <span className="text-sm">{deliveryRiders.status === "active" ? "Online" : deliveryRiders.status === "inactive" ? "Offline" : "Blocked"}</span>
                </div>
              </td>
              {/* <td className="px-6 py-3">{deliveryRiders.location. || "Required"}</td> */}
              {/* <td className="px-6 py-3">{deliveryRiders.gender || "Required"}</td> */}
              <td className="px-6 py-3 flex space-x-2 items-center h-full">
                <button
                  onClick={() => {
                    // setSelectedDeliveryRider(user);  // set the clicked user
                    setOpenDialog(true)
                    // setloading(false)


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
        >


          <DialogContent
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] sm:max-w-md max-h-[90vh] p-0 rounded-2xl border-none shadow-2xl bg-white flex flex-col overflow-hidden"
        >
          <p>HI I AM DELIVERY MODAL</p>
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

      </div>
    </>
  )
}

export default Delivery