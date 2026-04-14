function SearchBox({
  user,
  searchFrom,
  setSearchFrom,
  searchTo,
  setSearchTo,
  setActiveTab
}) {
  
    return (
        <div className="mb-4 relative">

            {/* 🔒 Overlay for logged out users */}
            {!user && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-[1.5px] z-10 flex items-center justify-center rounded-xl">
                <div className="text-center">
                <p className="text-lg font-semibold">Login to search rides</p>
                <button
                    onClick={() => setActiveTab("profile")}
                    className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
                >
                    Go to Login
                </button>
                </div>
            </div>
            )}

            {/* 🔍 Search Container */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700">

            <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">
                Find a Ride
            </h2>

            {/* Inputs */}
            <div className="flex flex-col sm:flex-row gap-2">

                <input
                type="text"
                placeholder="From (e.g. Chandigarh)"
                value={searchFrom}
                onChange={(e) => setSearchFrom(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!user}
                />

                <input
                type="text"
                placeholder="To (e.g. Patiala)"
                value={searchTo}
                onChange={(e) => setSearchTo(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!user}
                />

            </div>

            </div>
        </div>
        );

}

export default SearchBox;