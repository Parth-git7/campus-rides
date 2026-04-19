import { useNavigate } from "react-router-dom";

function PostRidePage({
  user,
  from, setFrom,
  to, setTo,
  time, setTime,
  fare, setFare,
  seats, setSeats,
  date, setDate,
  vehicleType, setVehicleType,
  vehicleName, setVehicleName,
  vehicleNumber, setVehicleNumber,
  handlePostRide,
}) {

  const navigate = useNavigate();

  // if not logged in → redirect to profile/login
  if (!user) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4 font-semibold">
          You need to login to post a ride.
        </p>
        <button
          onClick={() => navigate("/profile")}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-lg mx-auto">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-blue-600 dark:text-blue-400 font-semibold"
      >
        ← Back
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-md border-2 border-gray-100 dark:border-gray-700 overflow-hidden">

        {/* TOP GRADIENT */}
        <div className="h-20 bg-gradient-to-br from-blue-400 to-blue-700 flex items-end pb-4 px-6">
          <h1 className="text-white text-xl font-black">Post a Ride</h1>
        </div>

        <div className="p-6 flex flex-col gap-3">

          {/* FROM */}
          <div>
            <label className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1 block">
              From
            </label>
            <input
              type="text"
              placeholder="e.g. Chandigarh"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* TO */}
          <div>
            <label className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1 block">
              To
            </label>
            <input
              type="text"
              placeholder="e.g. Patiala"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* DATE + TIME — side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1 block">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1 block">
                Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* VEHICLE TYPE */}
          <div>
            <label className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1 block">
              Vehicle Type
            </label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Vehicle</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="scooty">Scooty</option>
            </select>
          </div>

          {/* VEHICLE NAME */}
          <div>
            <label className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1 block">
              Vehicle Name
            </label>
            <input
              type="text"
              placeholder="e.g. Alto, Scorpio"
              value={vehicleName}
              onChange={(e) => setVehicleName(e.target.value)}
              className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* VEHICLE NUMBER */}
          <div>
            <label className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1 block">
              Vehicle Number
            </label>
            <input
              type="text"
              placeholder="e.g. PB01 AK 0992"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* FARE + SEATS — side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1 block">
                Fare (₹)
              </label>
              <input
                type="number"
                placeholder="e.g. 50"
                value={fare}
                onChange={(e) => setFare(e.target.value)}
                className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-widest text-gray-400 font-bold mb-1 block">
                Seats
              </label>
              <input
                type="number"
                placeholder="e.g. 3"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* SUBMIT */}
          <button
            onClick={() => handlePostRide(navigate)} 
            className="w-full py-3 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md mt-2 transition-all"
          >
            Post Ride
          </button>

        </div>
      </div>
    </div>
  );
}

export default PostRidePage;