import { setUserLocation } from "@/store/slices/locationSlice";
import { LocateFixed, OctagonX } from "lucide-react";
import {  useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const UserLocation = () => {

  const [location, setLocation] = useState({
    short: "",
    full: null,
  })

  const [loading, setLoading] = useState(false);
  const [findloading, setfindloading] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch()



  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`,
            {
              headers: {
                "Accept": "application/json",
                "User-Agent": "QuickFoods/1.0 (jonkkarnal@gmail.com)",
              },
            }
          );


          const data = await res.json();
          const address = data.address || {};

          const mainAddress =
            address.suburb ||
            address.neighbourhood ||
            address.city_district ||
            address.district ||
            address.city ||
            "";



          setLocation({
            short: mainAddress || "Address not found",
            full: address,
          })
          dispatch(setUserLocation({
            short: mainAddress || "Address not found",
            full: address,
          }));


        } catch (error) {
          toast.error("Failed to fetch address");
          console.error(error);
        } finally {
          setLoading(false);
        }
      },
      () => {
        toast.error("Location permission denied");
        setLoading(false);
      }
    );
  };

  const clearLocation = () => {
    setLocation({ short: "", full: null });
    dispatch(setUserLocation({ short: "", full: null }));
  };

  const handleFindFood = () => {
    setfindloading(true)

    if (!location.short.trim()) {
      toast.error("Please select your location");
      setfindloading(false);
      return;
    }

    dispatch(setUserLocation({
      short: location.short,
      full: location.full,
    }));


    try {
      localStorage.setItem(
        "userLocation",
        JSON.stringify({
          short: location.short,
          full: location.full,
        })
      );

    } catch {
      toast.error("Storage unavailable");
      return;
    } finally {
      setfindloading(false)


    }

    navigate("/");
  };

  return (
    <>

    
    <div className="relative w-full h-[360px] sm:h-[400px] lg:h-[450px] overflow-hidden">
      <img
        src="/banner/main.png"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 md:hidden w-full h-full bg-orange-50 overflow-hidden">
        {/* Decorative Circle 1 (Top Right) */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-orange-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
        {/* Decorative Circle 2 (Top Left) */}
        <div className="absolute top-0 -left-4 w-48 h-48 bg-gray-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob animation-delay-2000"></div>
        {/* Decorative Circle 3 (Bottom Center) */}
        <div className="absolute -bottom-8 left-20 w-48 h-48 bg-orange-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>

        {/* Optional: Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(#f97316 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>
      </div>

      <div className="absolute inset-0 z-20 flex flex-col items-center sm:justify-start mt-0 md:mt-26 sm:mt-36 px-2 text-center text-white pt-4 sm:pt-0">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
          <span className="text-orange-500">Delicious Food</span>{" "}
          <span className="text-gray-600">Effortlessly!</span>
        </h1>

        <p className="mt-4 text-lg sm:text-xl text-black">
          Discover amazing dishes or list your own in just a few clicks!
        </p>

        <div className="mt-4 sm:mt-2 w-full border border-gray-200 max-w-4xl mx-auto bg-white py-4 px-2 sm:p-6 rounded-3xl shadow-lg">
          <div className="relative w-full">
            <input
              type="text"
              value={location.short}
              onChange={(e) => setLocation({
                short: e.target.value,
                full: null,
              })}
              placeholder="Enter your Address"
              className="w-full px-4 pr-32 py-3 text-black text-base border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 
                         placeholder-gray-400 transition"
            />

            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
              {location.short ? (
                <button onClick={clearLocation} type="button" aria-label="Clear location">
                  <OctagonX className="w-5 h-5 text-gray-600 hover:text-red-500 cursor-pointer" />
                </button>
              ) : (
                <button
                  onClick={handleLocateMe}
                  disabled={loading}
                  type="button"
                  className={`flex items-center cursor-pointer gap-2 px-3 py-1 rounded-lg border border-gray-100 bg-white text-black
              ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
                >
                  <LocateFixed className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
                  <span>{loading ? "Locating..." : "Locate Me"}</span>
                </button>

              )}
            </div>


          </div>

          <div className="w-full max-w-4xl mx-auto flex justify-between items-center mt-3 gap-2">
            <p className="text-gray-700 text-base hidden lg:flex">
              Search for restaurants, dishes or sellers
            </p>

            <button onClick={handleFindFood}
              disabled={findloading} className="bg-orange-500 w-full sm:w-56 md:w-64 lg:w-72 text-white px-4 py-2 rounded-lg font-semibold cursor-pointer"> {findloading ? "Find Food..." : "Find Food"} </button>

          </div>
        </div>
      </div>
    </div>

 
</>
  );
};

export default UserLocation;
