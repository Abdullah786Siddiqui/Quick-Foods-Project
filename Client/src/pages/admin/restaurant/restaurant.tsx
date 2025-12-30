// import DataTable from '@/components/data-table'
import api from '@/Api/api';
import DataTable from '@/components/data-table';
import { SectionCards } from '@/components/section-cards'
import usePageTitle from '@/hooks/usePageTitle';
import { useQuery } from '@tanstack/react-query';
import { AlertTriangle, CheckCircle, HomeIcon } from 'lucide-react';

const Restaurant = () => {
  usePageTitle("Restaurant");

  // TypeScript Interface

  interface RestaurantData {
    _id: string;
    username: string;
    image: string;
    email: string;
    status: "All" | "active" | "inactive" | "blocked";
    phone?: string;
    city?: string;
    locations:{
      timings :{
        week_day : string;
        closing_time : string;
        opening_time : string;


      }
    }
  }

  // Restaurent Api
  const { data, isPending, isError } = useQuery({
    queryKey: ['restaurant'],
    queryFn: async () => {
      const response = await api.get(`/admin/restaurants`);
      return {
        restaurants: response.data.restaurant,
        pagination: response.data.pagination,
        stats: response.data.stats
      };
    },
    gcTime: 3000000
  });


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
        {/* Data Table */}
        <DataTable
          data={data?.restaurants || []}
          headers={headers}
          isPending={isPending}
          isError={isError}
          renderRow={(restaurant: RestaurantData, index) => (
            <tr key={restaurant._id ?? restaurant.email ?? index} className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-all duration-200">
             
             
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={restaurant.image || `https://github.com/${restaurant.restaurantname}.png`}
                    alt={restaurant.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex flex-col leading-tight">
                    <p className="text-sm font-semibold text-gray-900">{restaurant.username}</p>
                    <p className="text-xs text-gray-500">{restaurant.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-3">{restaurant.phone || "Required"}</td>

              <td className="px-6 py-3">
                <div className="flex items-center gap-2 h-full">
                  <span className={`h-2.5 w-2.5 rounded-full ${restaurant.status === "active" ? "bg-green-500" : restaurant.status === "inactive" ? "bg-red-500" : "bg-gray-500"}`}></span>
                  <span className="text-sm">{restaurant.status === "active" ? "Online" : restaurant.status === "inactive" ? "Offline" : "Blocked"}</span>
                </div>
              </td>
              <td className="px-6 py-3">({restaurant.locations.timings.opening_time} , ({restaurant.locations.timings.closing_time}))</td>
              <td className="px-6 py-3">{restaurant.locations.timings.week_day || "Required"}</td>
              <td className="px-6 py-3 flex space-x-2 items-center h-full">


                {/* Delete Button */}
                <button
                  className="px-3 py-1.5 cursor-pointer bg-red-100 text-red-800 rounded hover:bg-red-200 text-xs font-semibold transition"
                >
                  Delete
                </button>



                <button
                  // onClick={() => {
                  //   setSelectedUser(user);  // set the clicked user
                  //   setOpenDialog(true)
                  //   setloading(false)


                  // }}
                  className="px-3 py-1.5 cursor-pointer bg-gray-200 text-white-800 rounded hover:bg-gray-300 text-xs font-semibold transition"
                >
                  More
                </button>





              </td>

            </tr>
          )}
        />
      </div>

    </>
  )
}

export default Restaurant