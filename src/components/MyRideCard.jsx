import { formatDate } from "../utils/utils";
import OutsiderBadge from './OutsiderBadge';

function MyRideCard({
  ride,
  requests,
  onViewDetails,
  handleUpdateRequest,
  handleDeleteRide,
  user
}) {

  const isFull = Number(ride.seats) <= 0;

  // filter requests for this specific ride
  const rideRequests = requests.filter((req) => req.rideId === ride.id);

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

      {/* top gradient */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-blue-300/60 to-transparent dark:from-blue-600/30 z-0"></div>

      {/* HEADER: ride title + seats badge */}
      <div className="flex justify-between items-start mb-4 relative z-10">

        <div>
          <h3 className="text-[20px] font-bold text-gray-900 dark:text-white ">
            {ride.from} → {ride.to}
          </h3>
        </div>

        {/* seats badge */}
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
          isFull
            ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
            : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
        }`}>
          {isFull ? "Full" : `${ride.seats} seats left`}
        </span>

      </div>

      {/* ROUTE SECTION - horizontal */}
      {/* <div className="flex items-start gap-3 mb-4">

        <div className="flex flex-col items-center">
          <div className="w-2.5 h-2.5 rounded-full border-2 border-blue-600 bg-white dark:bg-gray-800 mt-1"></div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 font-bold mt-1">From</p>
          <p className="text-[13px] font-semibold text-gray-800 dark:text-gray-200">{ride.from}</p>
        </div>

        <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-600 via-gray-200 to-gray-300 dark:via-gray-700 dark:to-gray-600 mt-1"></div>

        <div className="flex flex-col items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 mt-1"></div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 font-bold mt-1">To</p>
          <p className="text-[13px] font-semibold text-gray-800 dark:text-gray-200">{ride.to}</p>
        </div>

      </div> */}

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

        <button
            onClick={onViewDetails}
            className="flex-1 py-3 px-4 rounded-xl text-sm font-bold
            bg-blue-600 hover:bg-blue-700 text-white
            shadow-md shadow-blue-200 dark:shadow-none
            transition-all"
        >
            View Details
        </button>

        <button
            onClick={() => handleDeleteRide(ride.id)}
            className="flex-1 py-3 px-4 rounded-xl text-sm font-bold
            bg-red-100 hover:bg-red-200 text-red-600
            dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400
            border border-red-200 dark:border-red-800
            transition-all"
        >
            Delete Ride
        </button>

        </div>


      {/* REQUESTER LIST */}
      {rideRequests.length > 0 && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">

          <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 font-bold mb-3">
            Requests ({rideRequests.length})
          </p>

          <div className="flex flex-col gap-2">
            {rideRequests.map((req) => (
              <div
                key={req.id}
                className="flex items-center justify-between
                  bg-gray-50 dark:bg-gray-800
                  px-4 py-3 rounded-xl
                  border border-gray-200 dark:border-gray-700"
              >
                {/* rider email */}
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-[55%]">
                  {req.riderEmail}
                </p>
                <OutsiderBadge email={req.riderEmail} />
                {/* action area */}
                {req.status === "pending" ? (
                  <div className="flex gap-2">

                    {/* Accept */}
                    <button
                      onClick={() => handleUpdateRequest(req.id, "accepted", ride)}
                      disabled={isFull}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base transition-all ${
                        isFull
                          ? "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                          : "bg-green-100 hover:bg-green-200 text-green-600 dark:bg-green-900/30 dark:hover:bg-green-900/50 dark:text-green-400"
                      }`}
                    >
                      ✓
                    </button>

                    {/* Reject */}
                    <button
                      onClick={() => handleUpdateRequest(req.id, "rejected", ride)}
                      className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base
                        bg-red-100 hover:bg-red-200 text-red-600
                        dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-400
                        transition-all"
                    >
                      ✕
                    </button>

                  </div>
                ) : (
                  // status badge if not pending
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    req.status === "accepted"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                  }`}>
                    {req.status}
                  </span>
                )}

              </div>
            ))}
          </div>
        </div>
      )}

      
    </div>
  );
}

export default MyRideCard;