import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Building2, MapPin, Clock, Mail, Phone, Calendar } from "lucide-react"

interface TimingData {
  _id: string
  restaurant_location_id: string
  week_day: string
  opening_time: string
  closing_time: string
}

interface LocationData {
  _id: string
  address: string
  locality: string
  branch_email: string
  branch_phone_number: string
  latitude: number
  longitude: number
  timings: TimingData[]
  is_main: boolean
}

interface RestaurantData {
  _id: string
  username: string
  email: string
  is_main: boolean
  status: string
  rating: number | null
  image: string | null
  locations: LocationData[]
}

interface RestaurantDetailPageProps {
  data: RestaurantData
}
const data = {
    _id: "6954e51a86d00447941c9f8c",
    username: "The Gourmet Kitchen",
    email: "admin@gourmetkitchen.com",
    is_main: true,
    image: "/restaurant-interior.jpg",
    rating: 4.8,
    status: "active",
    __v: 0,
    createdAt: "2025-12-31T08:55:54.997Z",
    updatedAt: "2025-12-31T08:55:54.997Z",
    locations: [
      {
        _id: "6954e51b86d00447941c9f91",
        restaurant_id: "6954e51a86d00447941c9f8c",
        city_id: "6954e51986d00447941c9f7c",
        province_id: "6954e51986d00447941c9f77",
        is_main: true,
        address: "456 Foodie Avenue, Premium Plaza, Downtown District",
        locality: "Gulberg III, Lahore",
        branch_email: "mainbranch@gourmetkitchen.com",
        branch_phone_number: "+92 42 3333 4444",
        latitude: 31.5497,
        longitude: 74.3436,
        __v: 0,
        createdAt: "2025-12-31T08:55:55.534Z",
        updatedAt: "2025-12-31T08:55:55.534Z",
        timings: [
          {
            _id: "6954e51b86d00447941c9f96",
            restaurant_location_id: "6954e51b86d00447941c9f91",
            week_day: "Monday to Sunday",
            opening_time: "10:00:00",
            closing_time: "22:30:00",
            __v: 0,
            createdAt: "2025-12-31T08:55:55.703Z",
            updatedAt: "2025-12-31T08:55:55.703Z",
          },
        ],
      },
    ],
  }

const RestaurantDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // agar id undefined ya null hai to redirect karo
        if (!id) {
            toast.error("Missing restaurant ID!");

            navigate('/admin/restaurant', { replace: true });
        }
    }, [id, navigate]);

    // id missing hone par kuch bhi render na karo
    if (!id) return null;

    const mainLocation = data.locations[0]
    const mainTiming = mainLocation?.timings[0]

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

    const operatingHours = mainTiming ? calculateOperatingHours(mainTiming.opening_time, mainTiming.closing_time) : 0

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6 md:space-y-8">
                <div className="space-y-2 md:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 md:gap-4">
                        <div className="p-2 md:p-3 rounded-lg bg-gray-200 w-fit hover:bg-gray-300 transition-colors">
                            <Building2 className="w-5 sm:w-6 h-5 sm:h-6 text-gray-700" />
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-balance">
                                {data.username}
                            </h1>
                            <p className="text-gray-500 text-xs sm:text-sm mt-0.5 md:mt-1">Restaurant Management Dashboard</p>
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

                            <div className="flex justify-center py-2 md:py-3">
                                <div className="relative">
                                    <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-xl sm:rounded-2xl border-2 border-gray-300 bg-gray-100 flex items-center justify-center overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                                        {data.image ? (
                                            <img
                                                src={data.image || "/placeholder.svg"}
                                                alt={data.username}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <Building2 className="w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 text-gray-400" />
                                        )}
                                    </div>
                                    {data.is_main && (
                                        <div className="absolute -bottom-2 -right-2 bg-gray-800 rounded-full p-1.5 md:p-2 border-2 border-white shadow-lg hover:bg-gray-700 transition-colors">
                                            <span className="text-white text-xs font-bold">✓</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
                                <div>
                                    <label className="text-xs font-semibold text-gray-600 block mb-1.5 sm:mb-2">RESTAURANT NAME</label>
                                    <div className="p-2.5 sm:p-3 md:p-4 rounded-lg bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors">
                                        <p className="text-gray-900 font-semibold text-xs sm:text-sm md:text-base break-words">
                                            {data.username}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-gray-600 block mb-1.5 sm:mb-2">EMAIL ADDRESS</label>
                                    <div className="p-2.5 sm:p-3 md:p-4 rounded-lg bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors flex items-center gap-2 min-h-10 sm:min-h-11">
                                        <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                        <p className="text-gray-700 text-xs sm:text-sm break-all">{data.email}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 sm:gap-2.5 md:gap-3">
                                    <div>
                                        <label className="text-xs font-semibold text-gray-600 block mb-1.5 sm:mb-2">STATUS</label>
                                        <div className="p-2.5 sm:p-3 md:p-4 rounded-lg bg-gray-100 border border-gray-200 hover:border-gray-300 transition-colors min-h-10 sm:min-h-11 flex items-center">
                                            <p className="text-gray-800 font-semibold capitalize text-xs sm:text-sm">{data.status}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-600 block mb-1.5 sm:mb-2">TYPE</label>
                                        <div className="p-2.5 sm:p-3 md:p-4 rounded-lg bg-gray-100 border border-gray-200 hover:border-gray-300 transition-colors min-h-10 sm:min-h-11 flex items-center">
                                            <p className="text-gray-800 font-semibold text-xs sm:text-sm">
                                                {data.is_main ? "Main" : "Branch"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {data.rating !== null && (
                                    <div>
                                        <label className="text-xs font-semibold text-gray-600 block mb-1.5 sm:mb-2">RATING</label>
                                        <div className="p-2.5 sm:p-3 md:p-4 rounded-lg bg-gray-100 border border-gray-200 hover:border-gray-300 transition-colors min-h-10 sm:min-h-11 flex items-center">
                                            <p className="text-gray-900 font-bold text-xs sm:text-sm md:text-base">{data.rating} ⭐</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: LOCATION DETAILS */}
                    {mainLocation && (
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
                                        <div className="p-2.5 sm:p-3 md:p-4 rounded-lg bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors">
                                            <p className="text-gray-900 font-medium leading-relaxed text-xs sm:text-sm md:text-base break-words">
                                                {mainLocation.address}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-semibold text-gray-600 block mb-1.5 sm:mb-2">LOCALITY / AREA</label>
                                        <div className="p-2.5 sm:p-3 md:p-4 rounded-lg bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors min-h-10 sm:min-h-11 flex items-center">
                                            <p className="text-gray-900 font-medium text-xs sm:text-sm md:text-base">
                                                {mainLocation.locality}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-1 md:pt-2">
                                        <label className="text-xs font-semibold text-gray-600 block mb-1.5 sm:mb-2 md:mb-3">
                                            COORDINATES
                                        </label>
                                        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 md:gap-3">
                                            <div className="p-2.5 sm:p-3 md:p-4 rounded-lg bg-gray-100 border border-gray-200 hover:border-gray-300 transition-colors">
                                                <p className="text-gray-600 text-xs font-semibold mb-1">Latitude</p>
                                                <p className="text-gray-900 font-mono text-xs sm:text-sm md:text-base font-bold break-all">
                                                    {mainLocation.latitude.toFixed(3)}
                                                </p>
                                            </div>
                                            <div className="p-2.5 sm:p-3 md:p-4 rounded-lg bg-gray-100 border border-gray-200 hover:border-gray-300 transition-colors">
                                                <p className="text-gray-600 text-xs font-semibold mb-1">Longitude</p>
                                                <p className="text-gray-900 font-mono text-xs sm:text-sm md:text-base font-bold break-all">
                                                    {mainLocation.longitude.toFixed(3)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-2 sm:pt-3 md:pt-4 border-t border-gray-200">
                                        <label className="text-xs font-semibold text-gray-600 block mb-2 sm:mb-2.5 md:mb-3">
                                            CONTACT INFORMATION
                                        </label>
                                        <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
                                            <div className="p-2.5 sm:p-3 md:p-4 rounded-lg bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors flex items-center gap-2 min-h-10 sm:min-h-11">
                                                <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                                <p className="text-gray-700 text-xs sm:text-sm break-all">{mainLocation.branch_email}</p>
                                            </div>
                                            <div className="p-2.5 sm:p-3 md:p-4 rounded-lg bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors flex items-center gap-2 min-h-10 sm:min-h-11">
                                                <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                                <p className="text-gray-700 text-xs sm:text-sm font-mono break-all">
                                                    {mainLocation.branch_phone_number}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECTION 3: OPERATING HOURS */}
                    {mainTiming && (
                        <div className="lg:col-span-1 rounded-xl sm:rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300">
                            <div className="p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5 md:space-y-6">
                                {/* Section Header */}
                                <div className="flex items-center gap-2 sm:gap-3 pb-3 sm:pb-4 md:pb-5 border-b border-gray-200">
                                    <div className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                                        <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-gray-700" />
                                    </div>
                                    <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Operating Hours</h2>
                                </div>

                                <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
                                    <div>
                                        <label className="text-xs font-semibold text-gray-600 block mb-1.5 sm:mb-2">DAYS OPEN</label>
                                        <div className="p-2.5 sm:p-3 md:p-4 rounded-lg bg-gray-100 border border-gray-200 hover:border-gray-300 transition-colors min-h-10 sm:min-h-11 flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-700 flex-shrink-0" />
                                            <p className="text-gray-900 font-semibold text-xs sm:text-sm md:text-base">
                                                {mainTiming.week_day}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 sm:gap-2.5 md:gap-3">
                                        <div>
                                            <label className="text-xs font-semibold text-gray-600 block mb-1.5 sm:mb-2">OPENING TIME</label>
                                            <div className="p-2.5 sm:p-3 md:p-5 rounded-lg bg-gray-100 border border-gray-200 hover:border-gray-300 transition-colors text-center min-h-28 sm:min-h-32 md:min-h-36 flex flex-col items-center justify-center">
                                                <p className="text-gray-700 text-xs font-semibold mb-1">Opens</p>
                                                <p className="text-gray-900 font-mono font-bold text-base sm:text-lg md:text-2xl lg:text-3xl">
                                                    {formatTime(mainTiming.opening_time).time}
                                                </p>
                                                <p className="text-gray-700 text-xs mt-1 font-semibold">
                                                    {formatTime(mainTiming.opening_time).period}
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs font-semibold text-gray-600 block mb-1.5 sm:mb-2">CLOSING TIME</label>
                                            <div className="p-2.5 sm:p-3 md:p-5 rounded-lg bg-gray-100 border border-gray-200 hover:border-gray-300 transition-colors text-center min-h-28 sm:min-h-32 md:min-h-36 flex flex-col items-center justify-center">
                                                <p className="text-gray-700 text-xs font-semibold mb-1">Closes</p>
                                                <p className="text-gray-900 font-mono font-bold text-base sm:text-lg md:text-2xl lg:text-3xl">
                                                    {formatTime(mainTiming.closing_time).time}
                                                </p>
                                                <p className="text-gray-700 text-xs mt-1 font-semibold">
                                                    {formatTime(mainTiming.closing_time).period}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-1 md:pt-2">
                                        <label className="text-xs font-semibold text-gray-600 block mb-1.5 sm:mb-2">
                                            TOTAL OPERATING HOURS
                                        </label>
                                        <div className="p-3 sm:p-4 md:p-6 rounded-lg bg-gray-100 border border-gray-200 hover:border-gray-300 transition-colors text-center min-h-20 sm:min-h-24 md:min-h-28 flex flex-col items-center justify-center">
                                            <p className="text-gray-700 text-xs font-semibold mb-1 md:mb-2">Hours Per Day</p>
                                            <p className="text-gray-900 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                                                {operatingHours}h
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Badge */}
                                <div className="pt-2 sm:pt-3 md:pt-4 border-t border-gray-200">
                                    <div className="flex items-center justify-center gap-2 p-2.5 sm:p-3 md:p-4 rounded-lg bg-gray-100 border border-gray-200 hover:border-gray-300 transition-colors">
                                        <div className="w-2 h-2 rounded-full bg-gray-700" />
                                        <span className="text-gray-700 font-semibold text-xs sm:text-sm">Currently Operating</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};

export default RestaurantDetail;
