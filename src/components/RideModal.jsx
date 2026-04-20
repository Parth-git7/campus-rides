


//////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
//  File no longer needed 
/////////////////////////////////////////////////////////////












function RideModal({ selectedRide, setSelectedRide, user, setActiveTab }) {
import OutsiderBadge from './OutsiderBadge';

  if (!selectedRide) return null; // ✔ don't render if no ride selected

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[60]">

      <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl w-80 shadow-lg text-black dark:text-white">

        {/* ❌ Close button */}
        <button 
          onClick={() => setSelectedRide(null)}
          className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 z-20"
        >
          ✕
        </button>

        {/* 🔒 Overlay if not logged in */}
        {!user && (
          <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-[2.5px] z-10 flex flex-col items-center justify-center rounded-xl">
            <p className="font-semibold text-lg">Login to view details</p>

            <button
              onClick={() => {
                setSelectedRide(null);
                setActiveTab("profile"); // redirect to login
              }}
              className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
            >
              Go to Login
            </button>
          </div>
        )}

        {/* CONTENT */}
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Ride Details
        </h2>

        <p><b>From:</b> {selectedRide.from}</p>
        <p><b>To:</b> {selectedRide.to}</p>
        <p><b>Date:</b> {selectedRide.date}</p>
        <p><b>Time:</b> {selectedRide.time}</p>
        <p><b>Fare:</b> ₹{selectedRide.fare}</p>
        <p><b>Seats:</b> {selectedRide.seats}</p>
        
        <p><b>Vehicle:</b> {selectedRide.vehicleType}</p>
        <p><b>Vehicle No:</b> {selectedRide.vehicleNumber}</p>
        {/* email + outsider badge in same row */}
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <p className="text-gray-500 text-sm">
            Posted by: {selectedRide.userEmail}
          </p>
          <OutsiderBadge email={selectedRide.userEmail} />
        </div>

        <button 
          onClick={() => setSelectedRide(null)}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
        >
          Close
        </button>

      </div>
    </div>
  );
}

export default RideModal;