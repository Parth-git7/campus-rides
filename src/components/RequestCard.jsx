import { formatDate } from '../utils/utils';

function RequestCard({
  req,
  ride,
  setSelectedRide,
  handleCancelRequest
}) {

  // color coding for status tag
  const statusStyle = {
    pending:  { bg: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400", label: "Pending" },
    accepted: { bg: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",   label: "Accepted" },
    rejected: { bg: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",           label: "Rejected" },
  };

  const status = statusStyle[req.status] || statusStyle.pending;

  return (
    <div className="
      relative overflow-hidden
      bg-white dark:bg-gray-800/50
      p-6 rounded-3xl
      border-2 border-gray-100 dark:border-gray-700/50
      shadow-md hover:shadow-lg
      transition-all duration-300
      mb-4
    ">

      {/* top gradient like RideCard */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-blue-300/60 to-transparent dark:from-blue-600/30"></div>

     
      {/* HEADER: driver info + fare — same as RideCard */}
        <div className="flex justify-between items-start mb-4">

        <div className="flex items-center gap-3">

            {/* Avatar */}
            <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center font-bold text-white shadow-inner">
                {ride.userName ? ride.userName[0].toUpperCase() : "U"}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
            </div>

            {/* Name + vehicle */}
            <div>
            <h3 className="text-[15px] font-bold text-gray-900 dark:text-white leading-tight">
                {ride.userName}
            </h3>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 mt-1 uppercase tracking-wider">
                {ride.vehicleName || "-"}
            </span>
            </div>

        </div>

        {/* STATUS TAG — top right */}
        
        <span className={`px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider ${status.bg}` }>
            {status.label}
        </span>

        </div>

        
      {/* ROUTE SECTION - horizontal */}
        <div className="flex items-center gap-3 mb-4">

        {/* Pickup */}
        <div className="flex flex-col items-center">
            <div className="w-2.5 h-2.5 rounded-full border-2 border-blue-600 bg-white dark:bg-gray-800"></div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 font-bold mt-1">From</p>
            <p className="text-[13px] font-semibold text-gray-800 dark:text-gray-200">{ride.from}</p>
        </div>

        
        {/* Gradient line — matches RideCard vertical gradient, now horizontal */}
        <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-600 via-gray-200 to-gray-300 dark:via-gray-700 dark:to-gray-600 mb-10"></div>

        {/* Destination */}
        <div className="flex flex-col items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 font-bold mt-1">To</p>
            <p className="text-[13px] font-semibold text-gray-800 dark:text-gray-200">{ride.to}</p>
        </div>

        </div>

        

      {/* TRIP META: date, time, fare */}
      <div className="grid grid-cols-3 gap-3 py-3 px-4 bg-gray-100 dark:bg-gray-800 rounded-xl mb-5">

        <div className="flex flex-col items-center border-r border-gray-300 dark:border-gray-600 pr-2">
          <span className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold tracking-wide">Date</span>
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{formatDate(ride.date)}</span>
        </div>

        <div className="flex flex-col items-center border-r border-gray-300 dark:border-gray-600 pr-2">
          <span className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold tracking-wide">Time</span>
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{ride.time}</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold tracking-wide">Fare</span>
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">₹{ride.fare}</span>
        </div>

      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3">

        {/* View Details — same as RideCard */}
        <button
          onClick={() => setSelectedRide(ride)}
          className="flex-1 py-3 px-4 rounded-xl text-sm font-bold
            bg-blue-600 hover:bg-blue-700 text-white
            shadow-md shadow-blue-200 dark:shadow-none transition-all"
        >
          View Details
        </button>

        {/* Cancel — only if pending */}
        {req.status === "pending" && (
          <button
            onClick={() => handleCancelRequest(req.id)}
            className="flex-1 py-3 px-4 rounded-xl text-sm font-bold
              bg-red-100 hover:bg-red-200 text-red-600
              dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400
              border border-red-200 dark:border-red-800
              transition-all"
          >
            Cancel
          </button>
        )}

      </div>
    </div>
  );
}

export default RequestCard;