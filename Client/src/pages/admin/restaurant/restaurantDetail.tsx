import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Building2, MapPin, Clock, Mail, Phone, Calendar, Camera } from "lucide-react"
import api from '@/Api/api';
import { useQuery } from '@tanstack/react-query';

// interface TimingData {
//     _id: string
//     restaurant_location_id: string
//     week_day: string
//     opening_time: string
//     closing_time: string
// }

// interface LocationData {
//     _id: string
//     address: string
//     locality: string
//     branch_email: string
//     branch_phone_number: string
//     latitude: number
//     longitude: number
//     timings: TimingData[]
//     is_main: boolean
// }

// interface RestaurantData {
//     _id: string
//     username: string
//     email: string
//     is_main: boolean
//     status: string
//     rating: number | null
//     image: string | null
//     locations: LocationData[]
// }








const RestaurantDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // const [restaurant,setRestaurant] = useState({})

    useEffect(() => {
        // agar id undefined ya null hai to redirect karo
        if (!id) {
            toast.error("Missing restaurant ID!");

            navigate('/admin/restaurant', { replace: true });
        }
    }, [id, navigate]);


    const { data } = useQuery({
        queryKey: ["restaurantDetails", id],
        queryFn: async () => {
            const response = await api.get(`/admin/restaurants/details/${id}`)
            return response.data;
        }
    });

    console.log(data);







    const formatTime = (timeStr: string) => {
        const [hours, minutes] = timeStr.split(":")
        const hour = Number.parseInt(hours)
        const period = hour >= 12 ? "PM" : "AM"
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
        return { time: `${displayHour}:${minutes}`, period }
    }

    const calculateOperatingHours = (opening: string, closing: string) => {
        const [openHour] = opening.split(":")
        const [closeHour] = closing.split(":")
        return Math.abs(Number.parseInt(closeHour) - Number.parseInt(openHour))
    }

   
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6 md:space-y-8">
                <div className="space-y-2 md:space-y-4">
                   <div className="flex flex-row items-center gap-3 md:gap-5 w-full">
  {/* Icon */}
  <div className="flex-shrink-0 p-2 md:p-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors">
    <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700" />
  </div>

  {/* Text */}
  <div className="flex-1 min-w-0">
    <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 truncate">
      {data?.RestaurantDetails?.restaurant_id?.username}
    </h1>
    <p className="text-gray-500 text-xs sm:text-sm mt-0.5 md:mt-1 truncate">
      Restaurant Management Dashboard
    </p>
  </div>
</div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 sm:gap-5 md:gap-6 lg:gap-6">
                    {/* SECTION 1: RESTAURANT DETAILS */}
                    <div className="lg:col-span-1 rounded-xl sm:rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300">
                        <div className="p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5 md:space-y-6">
                            {/* Section Header */}
                            <div className="flex items-center gap-2 sm:gap-3 pb-3 sm:pb-4 md:pb-5 border-b border-gray-200">
                                <div className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                                    <Building2 className="w-4 sm:w-5 h-4 sm:h-5 text-gray-700" />
                                </div>
                                <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Restaurant Details</h2>
                            </div>

                            <div className="relative w-full overflow-hidden">

                                {/* Top Stripe / Banner */}
                                <div className="h-32 md:h-44 w-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900" />

                                {/* Profile Image – LEFT (Circle) */}
                                <div className="absolute left-6 md:left-8 top-20 md:top-28">
                                    <div className="relative">

                                        {/* Circle Image */}
                                        <div
                                            className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 
                       rounded-full border-4 border-white 
                       bg-gray-100 overflow-hidden 
                       flex items-center justify-center"
                                        >
                                            <Building2 className="w-12 h-12 md:w-16 md:h-16 text-gray-400" />
                                        </div>

                                        {/* Camera Icon (Edit Image) */}
                                        <button
                                            type="button"
                                            className="absolute bottom-1 right-1 bg-black/80 
                       hover:bg-black text-white 
                       rounded-full p-2 border border-white
                       shadow-md transition"
                                        >
                                            <Camera className="w-4 h-4" />
                                        </button>

                                    </div>
                                </div>

                                {/* Spacer only for overlap */}
                                <div className="h-20 md:h-28" />

                            </div>

                            <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-gray-600 block mb-1.5 sm:mb-2">RESTAURANT NAME</label>
                                    <input
                                        type="text"
                                        value={data?.RestaurantDetails?.restaurant_id?.username}
                                        readOnly
                                        placeholder=""
                                        className="w-full p-2.5 sm:p-3 md:p-4 rounded-lg bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors text-gray-900 font-semibold text-xs sm:text-sm md:text-base"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-gray-600 block mb-1.5 sm:mb-2">EMAIL ADDRESS</label>
                                    <div className="flex items-center gap-2 p-2.5 sm:p-3 md:p-4 rounded-lg bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors">
                                        <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                        <input
                                            type="email"
                                            value={data?.RestaurantDetails?.restaurant_id?.email}
                                            readOnly
                                            placeholder=""
                                            className="w-full text-gray-700 text-xs sm:text-sm bg-transparent outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 sm:gap-2.5 md:gap-3">
                                    <div>
                                        <label className="text-xs font-semibold text-gray-600 block mb-1.5 sm:mb-2">STATUS</label>
                                        <input
                                            type="text"
                                            value={data?.RestaurantDetails?.restaurant_id?.status}

                                            readOnly
                                            placeholder=""
                                            className="w-full p-2.5 sm:p-3 md:p-4 rounded-lg bg-gray-100 border border-gray-200 hover:border-gray-300 transition-colors text-gray-800 font-semibold text-xs sm:text-sm min-h-10 sm:min-h-11"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-600 block mb-1.5 sm:mb-2">TYPE</label>
                                        <input
                                            type="text"
                                            value="---"
                                            readOnly
                                            placeholder=""
                                            className="w-full p-2.5 sm:p-3 md:p-4 rounded-lg bg-gray-100 border border-gray-200 hover:border-gray-300 transition-colors text-gray-800 font-semibold text-xs sm:text-sm min-h-10 sm:min-h-11"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-gray-600 block mb-1.5 sm:mb-2">RATING</label>
                                    <input
                                        type="text"
                                        value={data?.RestaurantDetails?.restaurant_id?.rating}
                                        readOnly
                                        placeholder=""
                                        className="w-full p-2.5 sm:p-3 md:p-4 rounded-lg bg-gray-100 border border-gray-200 hover:border-gray-300 transition-colors text-gray-900 font-bold text-xs sm:text-sm md:text-base min-h-10 sm:min-h-11"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* SECTION 2: LOCATION DETAILS */}

                    <div className="lg:col-span-1 rounded-xl sm:rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300">
                        <div className="p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5 md:space-y-6">
                            {/* Section Header */}
                            <div className="flex items-center gap-2 sm:gap-3 pb-3 sm:pb-4 md:pb-5 border-b border-gray-200">
                                <div className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                                    <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-gray-700" />
                                </div>
                                <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Location Details</h2>
                            </div>

                            <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-gray-600 block mb-1.5 sm:mb-2">ADDRESS</label>
                                    <input
                                        type="text"
                                         value={data?.RestaurantDetails?.address || ""}
                                        readOnly
                                        placeholder=""
                                        className="w-full p-2.5 sm:p-3 md:p-4 rounded-lg bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors text-gray-900 font-medium leading-relaxed text-xs sm:text-sm md:text-base"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-gray-600 block mb-1.5 sm:mb-2">LOCALITY / AREA</label>
                                    <input
                                        type="text"
                                        value={data?.RestaurantDetails?.locality || ""}
                                        readOnly
                                        placeholder=""
                                        className="w-full p-2.5 sm:p-3 md:p-4 rounded-lg bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors text-gray-900 font-medium text-xs sm:text-sm md:text-base min-h-10 sm:min-h-11"
                                    />
                                </div>

                                <div className="pt-1 md:pt-2">
                                    <label className="text-xs font-semibold text-gray-600 block mb-1.5 sm:mb-2 md:mb-3">COORDINATES</label>
                                    <div className="grid grid-cols-2 gap-2 sm:gap-2.5 md:gap-3">
                                        <input
                                            type="text"
                                              value={data?.RestaurantDetails?.latitude?.toString() || ""}

                                            readOnly
                                            placeholder="Latitude"
                                            className="w-full p-2.5 sm:p-3 md:p-4 rounded-lg bg-gray-100 border border-gray-200 hover:border-gray-300 transition-colors text-gray-900 font-mono text-xs sm:text-sm md:text-base font-bold min-h-10 sm:min-h-11"
                                        />
                                        <input
                                            type="text"
                                            value={data?.RestaurantDetails?.longitude?.toString() || ""}
                                            readOnly
                                            placeholder="Longitude"
                                            className="w-full p-2.5 sm:p-3 md:p-4 rounded-lg bg-gray-100 border border-gray-200 hover:border-gray-300 transition-colors text-gray-900 font-mono text-xs sm:text-sm md:text-base font-bold min-h-10 sm:min-h-11"
                                        />
                                    </div>
                                </div>

                                <div className="pt-2 sm:pt-3 md:pt-4 border-t border-gray-200">
                                    <label className="text-xs font-semibold text-gray-600 block mb-2 sm:mb-2.5 md:mb-3">CONTACT INFORMATION</label>
                                    <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
                                        <div className="flex items-center gap-2 p-2.5 sm:p-3 md:p-4 rounded-lg bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors min-h-10 sm:min-h-11">
                                            <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                            <input
                                                type="email"
                                                  value={data?.RestaurantDetails?.branch_email || ""}
                                                readOnly
                                                placeholder=""
                                                className="w-full text-gray-700 text-xs sm:text-sm bg-transparent outline-none"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 p-2.5 sm:p-3 md:p-4 rounded-lg bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors min-h-10 sm:min-h-11">
                                            <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                            <input
                                                type="text"
                                                  value={data?.RestaurantDetails?.branch_phone_number || ""}
                                                readOnly
                                                placeholder=""
                                                className="w-full text-gray-700 text-xs sm:text-sm font-mono bg-transparent outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* SECTION 3: OPERATING HOURS */}

                  {/* SECTION 3: OPERATING HOURS */}
<div className="w-full rounded-xl sm:rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300">
  <div className="p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5 md:space-y-6">
    {/* Header */}
    <div className="flex items-center gap-2 sm:gap-3 pb-3 border-b border-gray-200">
      <div className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
        <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-gray-700" />
      </div>
      <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Operating Hours</h2>
    </div>

    <div className="space-y-3">
      {/* DAYS OPEN */}
      <div>
        <label className="text-xs sm:text-sm font-semibold text-gray-600 block mb-1">DAYS OPEN</label>
        <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-100 border border-gray-200">
          <Calendar className="w-4 sm:w-5 h-4 sm:h-5 text-gray-700 flex-shrink-0" />
          <span className="text-gray-900 text-xs sm:text-sm font-medium">
            {data?.RestaurantDetails?.timings?.[0]?.week_day || "Monday to Sunday"}
          </span>
        </div>
      </div>

      {/* OPENING & CLOSING TIME */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Opening */}
        <div>
          <label className="text-xs sm:text-sm font-semibold text-gray-600 block mb-1">OPENING TIME</label>
          <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-100 border border-gray-200">
            <span className="text-gray-700 text-[10px] sm:text-xs font-semibold mb-1">Opens</span>
            <span className="text-gray-900 font-mono font-bold text-xl sm:text-2xl">
              {formatTime(data?.RestaurantDetails?.timings?.[0]?.opening_time || "09:00").time}
            </span>
            <span className="text-gray-700 text-[10px] sm:text-xs mt-1 font-semibold">
              {formatTime(data?.RestaurantDetails?.timings?.[0]?.opening_time || "09:00").period}
            </span>
          </div>
        </div>

        {/* Closing */}
        <div>
          <label className="text-xs sm:text-sm font-semibold text-gray-600 block mb-1">CLOSING TIME</label>
          <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-100 border border-gray-200">
            <span className="text-gray-700 text-[10px] sm:text-xs font-semibold mb-1">Closes</span>
            <span className="text-gray-900 font-mono font-bold text-xl sm:text-2xl">
              {formatTime(data?.RestaurantDetails?.timings?.[0]?.closing_time || "22:00").time}
            </span>
            <span className="text-gray-700 text-[10px] sm:text-xs mt-1 font-semibold">
              {formatTime(data?.RestaurantDetails?.timings?.[0]?.closing_time || "22:00").period}
            </span>
          </div>
        </div>
      </div>

      {/* TOTAL HOURS */}
      <div>
        <label className="text-xs sm:text-sm font-semibold text-gray-600 block mb-1">TOTAL OPERATING HOURS</label>
        <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-100 border border-gray-200">
          <span className="text-gray-700 text-[10px] sm:text-xs font-semibold mb-1">Hours Per Day</span>
          <span className="text-gray-900 font-bold text-2xl sm:text-3xl">
            {calculateOperatingHours(
              data?.RestaurantDetails?.timings?.[0]?.opening_time || "09:00",
              data?.RestaurantDetails?.timings?.[0]?.closing_time || "22:00"
            )}h
          </span>
        </div>
      </div>
    </div>

    {/* Status */}
    <div className="pt-3 border-t border-gray-200">
      <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-gray-100 border border-gray-200">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-gray-700 text-xs sm:text-sm font-semibold">Currently Operating</span>
      </div>
    </div>
  </div>
</div>



                </div>
            </div>
        </div>
    )
};

export default RestaurantDetail;
