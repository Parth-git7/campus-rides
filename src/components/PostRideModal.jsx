function PostRideModal({
  showForm,
  setShowForm,
  setFrom,
  setTo,
  setTime,
  setFare,
  setSeats,
  setDate,
  setVehicleType,
  setVehicleName,
  setVehicleNumber,
  handlePostRide
}) {

  if (!showForm) return null; // ✔ don't render if not needed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow relative w-80">

        {/* ❌ Close button */}
        <button 
          onClick={() => setShowForm(false)}
          className="absolute top-2 right-2 text-gray-600 dark:text-gray-300"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Post Ride
        </h2>
        
        <input 
          type="text"
          placeholder="From"
          className="w-full p-2 border rounded mb-2"
          onChange={(e) => setFrom(e.target.value)}
        />

        <input 
          type="text"
          placeholder="To"
          className="w-full p-2 border rounded mb-2"
          onChange={(e) => setTo(e.target.value)}
        />

        <input 
          type="date"
          className="w-full p-2 border rounded mb-2"
          onChange={(e) => setDate(e.target.value)}
        />

        <input 
          type="time"
          className="w-full p-2 border rounded mb-2"
          onChange={(e) => setTime(e.target.value)}
        />

        <select
          className="w-full p-2 border rounded mb-2"
          onChange={(e) => setVehicleType(e.target.value)}
        >
          <option value="">Select Vehicle</option>
          <option value="car">Car</option>
          <option value="bike">Bike</option>
          <option value="scooty">Scooty</option>
        </select>

        <input 
          type="text"
          placeholder="Vehicle Name (e.g. Alto, Scorpio)"
          className="w-full p-2 border rounded mb-2"
          onChange={(e) => setVehicleName(e.target.value)}
        />

        <input 
          type="text"
          placeholder="Vehicle Number (e.g. PB01 AK 0992)"
          className="w-full p-2 border rounded mb-2"
          onChange={(e) => setVehicleNumber(e.target.value)}
        />

        <input   
          type="number"
          placeholder="Fare"
          className="w-full p-2 border rounded mb-2"
          onChange={(e) => setFare(e.target.value)}
        />

        <input
          type="number"
          placeholder="Seats available"
          className="w-full p-2 border rounded mb-2"
          onChange={(e) => setSeats(e.target.value)}
        />

        <button 
          onClick={handlePostRide} // ✔ submit ride
          className="w-full bg-green-600 text-white p-2 rounded mt-2"
        >
          Submit Ride
        </button>

      </div>
    </div>
  );
}

export default PostRideModal;