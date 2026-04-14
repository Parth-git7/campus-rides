  {/* TOP ROW */}
  <div className="flex justify-between items-center">
    <div className="flex gap-3">

      {/* LEFT: DOT LINE */}
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 bg-black dark:bg-white rounded-full"></div>
        <div className="w-[2px] h-6 bg-gray-400"></div>
        <div className="w-3 h-3 border-2 border-gray-500 rounded-full"></div>
      </div>

      {/* RIGHT: TEXT */}
      <div>
        <p className="font-semibold text-gray-900 dark:text-white">
          {ride.from}
        </p>
        <p className="text-gray-500 text-sm mt-2">
          {ride.to}
        </p>
      </div>

    </div>

    <p className="text-green-600 font-bold text-lg">
      ₹{ride.fare}
    </p>
  </div>

  {/* SUB INFO */}
  <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-300">
    <p>🕒 {ride.time}</p>
    <p>💺 {ride.seats} seats</p>
  </div>

  {/* DRIVER */}
  <p className="text-xs text-gray-400 mt-2">
    Posted by: {ride.userEmail}
  </p>

  {/* ACTION BUTTONS */}
  <div className="flex gap-2 mt-4">

    <button 
      onClick={() => {
        if (selectedRide?.id === ride.id) {
          setSelectedRide(null);
        } else {
          setSelectedRide(ride);
        }
      }}
      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-1.5 rounded-lg text-sm"
    >
      View
    </button>

    <button 
      onClick={() => {
        if (!user) {
          toast("Login required 🚗", { icon: "🔒" });
          setActiveTab("profile");
        } else {
          handleRequestRide(ride);
        }
      }}

      disabled={
        Number(ride.seats) <= 0 ||
        ride.userEmail === user?.email ||
        alreadyRequested
      }

      className={`flex-1 py-1.5 rounded-lg text-sm ${
        Number(ride.seats) <= 0 ||
        ride.userEmail === user?.email ||
        alreadyRequested
          ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
          : "bg-green-600 text-white hover:bg-green-700"
      }`}
    >
      {
        ride.userEmail === user?.email
          ? "Your Ride"
          : alreadyRequested
          ? "Requested"
          : Number(ride.seats) <= 0
          ? "Full"
          : "Request"
      }
    </button>

  </div>
</div>