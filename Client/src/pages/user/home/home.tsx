
const HeroSearch = () => {
  return (
    <div className="relative w-full h-[360px] sm:h-[400px] lg:h-[450px]  overflow-hidden">
      {/* Background Image */}
      <img
        src="/banner/main.png"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full  object-cover"
      />

{/* ========================================= */}
      {/* 2. MOBILE BACKGROUND (Visible Only Mobile)*/}
      {/* ========================================= */}
      {/* This div only shows on mobile (md:hidden) */}
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

      {/* Content */}
  <div className="absolute inset-0 z-20 flex flex-col items-center  sm:justify-start mt-0 md:mt-26 sm:mt-36 px-2 text-center text-white pt-4 sm:pt-0">
  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
    <span className="text-orange-500">Delicious Food</span>{" "}
    <span className="text-gray-600">Effortlessly!</span>
  </h1>

  <p className="mt-4 text-lg sm:text-xl text-black">
    Discover amazing dishes or list your own in just a few clicks!
  </p>

  {/* Search Bar */}
  <div
  
    className="mt-4 sm:mt-2 w-full border border-gray-200 max-w-4xl mx-auto bg-white py-4 px-2 sm:p-6 rounded-3xl shadow-lg"
  >
    {/* Search Bar After Location Accept */}
<div className="relative w-full">
  {/* Input */}
  <input
    type="text"
    id="searchbar"
    placeholder="Enter your Address"
    className="w-full px-4 pr-32 py-3 text-black text-base border border-gray-300 rounded-xl 
               focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 
               placeholder-gray-400 transition"
  />

  {/* Fixed button on the right */}
  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
    <button
      id="locateBtn"
      className="flex items-center gap-2 text-black font-semibold cursor-pointer px-3 py-1 rounded-lg
                 hover:bg-gray-100 transition"
    >
      <i className="ri-focus-3-line text-lg"></i>
      <span>Locate Me</span>
    </button>
  </div>
</div>



    {/* Quick Filters Section */}
  <div  className=" w-full max-w-4xl mx-auto flex justify-between items-center mt-3 gap-2">
                    <p className="text-gray-700 text-base  hidden lg:flex">Search for restaurants, dishes or sellers</p>
                    <button  id="findfoodbtn"
                        className="bg-orange-500 w-full sm:w-56 md:w-64 lg:w-72 text-white px-4 py-2 rounded-lg 
          transition font-semibold cursor-pointer
          flex items-center justify-center gap-2">
                        Find Food
                    </button>


                </div>


  </div>
</div>

    </div>
  );
};

export default HeroSearch;
