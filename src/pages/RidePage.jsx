import { useParams, useNavigate } from "react-router-dom";
import { formatDate } from "../utils/utils";
import OutsiderBadge from '../components/OutsiderBadge';

function RidePage({ user, rides, requests, handleRequestRide }) {

  // get rideId from URL e.g. /ride/abc123 → rideId = "abc123"
  const { rideId } = useParams();
  const navigate = useNavigate();

  // find the ride from already loaded rides array
  const ride = rides.find((r) => r.id === rideId);

  // rides might still be loading
  if (!ride) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading ride details...
      </div>
    );
  }

  const isFull = Number(ride.seats) <= 0;
  const isOwner = ride.userEmail === user?.email;

  const alreadyRequested = user
    ? requests.find(
        (req) => req.rideId === ride.id && req.riderEmail === user.email
      )
    : false;

  return (
    <div className="p-4 max-w-lg mx-auto">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-blue-600 dark:text-blue-400 font-semibold"
      >
        ← Back
      </button>

      {/* BLUR OVERLAY FOR LOGGED OUT USERS */}
      <div className="relative">

        {!user && (
          <div className="absolute inset-0 z-10 rounded-3xl overflow-hidden">
            
            {/* blur layer */}
            <div className="absolute inset-0 backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 rounded-3xl"></div>
            
            {/* login prompt on top of blur */}
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl">
              <div className="bg-white dark:bg-gray-800 px-6 py-5 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 text-center mx-4">
                <p className="text-gray-800 dark:text-white font-bold text-base mb-1">
                  Login to view ride details
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs mb-4">
                  Sign in to see driver info and book a seat
                </p>
                <button
                  onClick={() => navigate("/profile")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-sm font-bold transition-all"
                >
                  Go to Login
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ACTUAL RIDE CONTENT — always rendered, blurred if not logged in */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md border-2 border-gray-100 dark:border-gray-700 overflow-hidden">

          {/* TOP GRADIENT */}
          <div className="h-20 bg-gradient-to-br from-blue-400 to-blue-700 relative">
            <div className="absolute bottom-4 left-6">
              <h1 className="text-white text-xl font-black">
                {ride.from} → {ride.to}
              </h1>
            </div>
          </div>

          <div className="p-6">

            {/* DRIVER INFO */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center font-bold text-white text-lg shadow overflow-hidden">
                {ride.userPhoto ? (
                    <img
                    src={ride.userPhoto}
                    alt="driver"
                    className="w-full h-full object-cover"
                    />
                ) : (
                    ride.userName ? ride.userName[0].toUpperCase() : "U"
                )}
                </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">
                  {ride.userName || "Unknown"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {ride.userBranch || "—"}
                </p>
                
              </div>
              <OutsiderBadge email={ride.userEmail} />
            </div>

            <div className="border-t border-gray-100 dark:border-gray-700 mb-5"></div>

            {/* TRIP META */}
            <div className="grid grid-cols-3 gap-3 py-3 px-4 bg-gray-100 dark:bg-gray-800 rounded-xl mb-5">

              <div className="flex flex-col items-center border-r border-gray-300 dark:border-gray-600">
                <span className="text-[10px] text-gray-500 uppercase font-semibold tracking-wide">Date</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {formatDate(ride.date)}
                </span>
              </div>

              <div className="flex flex-col items-center border-r border-gray-300 dark:border-gray-600">
                <span className="text-[10px] text-gray-500 uppercase font-semibold tracking-wide">Time</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {ride.time}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-[10px] text-gray-500 uppercase font-semibold tracking-wide">Fare</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  ₹{ride.fare}
                </span>
              </div>

            </div>

            {/* RIDE DETAILS */}
            <div className="flex flex-col gap-3 mb-6">

              <div className="flex justify-between bg-gray-50 dark:bg-gray-900/50 px-4 py-3 rounded-xl">
                <span className="text-[11px] uppercase tracking-widest text-gray-400 font-bold">Seats Left</span>
                <span className={`text-sm font-semibold ${isFull ? "text-red-500" : "text-green-600"}`}>
                  {isFull ? "Full" : ride.seats}
                </span>
              </div>

              <div className="flex justify-between bg-gray-50 dark:bg-gray-900/50 px-4 py-3 rounded-xl">
                <span className="text-[11px] uppercase tracking-widest text-gray-400 font-bold">Vehicle</span>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {ride.vehicleType} — {ride.vehicleName}
                </span>
              </div>

              <div className="flex justify-between bg-gray-50 dark:bg-gray-900/50 px-4 py-3 rounded-xl">
                <span className="text-[11px] uppercase tracking-widest text-gray-400 font-bold">Vehicle No</span>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {ride.vehicleNumber}
                </span>
              </div>

              <div className="flex justify-between bg-gray-50 dark:bg-gray-900/50 px-4 py-3 rounded-xl">
                <span className="text-[11px] uppercase tracking-widest text-gray-400 font-bold">Email</span>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {ride.userEmail}
                </span>
              </div>

            </div>

            {/* BOOK SEAT BUTTON */}
            <button
              onClick={() =>
                !user ? navigate("/profile") : handleRequestRide(ride)
              }
              disabled={isFull || isOwner || alreadyRequested}
              className={`w-full py-3 rounded-xl text-sm font-bold transition-all
                ${(isFull || isOwner || alreadyRequested)
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed border border-gray-200 dark:border-gray-700"
                  : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-md"
                }`}
            >
              {isOwner
                ? "This is your ride"
                : alreadyRequested
                ? "Already Requested"
                : isFull
                ? "Ride is Full"
                : "Book Seat"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default RidePage;