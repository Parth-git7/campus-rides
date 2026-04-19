function SearchBox({
  searchFrom,
  setSearchFrom,
  searchTo,
  setSearchTo,
}) {

  return (
    <div className="
      relative overflow-hidden
      bg-white dark:bg-gray-800/50
      rounded-3xl
      border-2 border-gray-100 dark:border-gray-700/50
      shadow-md
      mt-4
    ">

      {/* TOP GRADIENT — matches card vibe */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-blue-300/60 to-transparent dark:from-blue-600/30"></div>

      <div className="p-5 relative z-10">

        {/* HEADING */}
        <p className="text-[15px] uppercase tracking-widest text-gray-400 dark:text-gray-500 font-bold mb-4">
          Find a Ride
        </p>

        {/* FROM INPUT */}
        <div className="mb-3">
          <label className="text-[12px] uppercase tracking-widest text-gray-400 font-bold mb-1 block">
            From
          </label>
          <input
            type="text"
            placeholder="e.g. Chandigarh"
            value={searchFrom}
            onChange={(e) => setSearchFrom(e.target.value)}
            className="
              w-full px-4 py-3 rounded-xl
              bg-gray-50 dark:bg-gray-900/50
              border border-gray-200 dark:border-gray-700
              text-sm text-gray-800 dark:text-gray-200
              placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500
              transition-all
            "
          />
        </div>

        {/* DIVIDER WITH ARROW
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
          <span className="text-blue-500 font-bold text-sm">↓</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
        </div> */}

        {/* TO INPUT */}
        <div>
          <label className="text-[12px] uppercase tracking-widest text-gray-400 font-bold mb-1 block">
            To
          </label>
          <input
            type="text"
            placeholder="e.g. Patiala"
            value={searchTo}
            onChange={(e) => setSearchTo(e.target.value)}
            className="
              w-full px-4 py-3 rounded-xl
              bg-gray-50 dark:bg-gray-900/50
              border border-gray-200 dark:border-gray-700
              text-sm text-gray-800 dark:text-gray-200
              placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-blue-500
              transition-all
            "
          />
        </div>

      </div>
    </div>
  );
}

export default SearchBox;