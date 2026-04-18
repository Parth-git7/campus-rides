import React from 'react';
import { formatDate } from '../utils/utils';
function RideCard({
  ride,
  user,
  alreadyRequested,
  selectedRide,
  setSelectedRide,
  handleRequestRide,
  setActiveTab
}) {
  const isOwner = ride.userEmail === user?.email;
  const isFull = Number(ride.seats) <= 0;
  const isSelected = selectedRide?.id === ride.id;

  

  return (
    <div className={`
      relative overflow-hidden
      bg-white dark:bg-gray-800/50 
      
      p-6 rounded-3xl 
      border-2 transition-all duration-300
      ${isSelected 
        ? 'border-blue-500 shadow-lg ring-1 ring-blue-500/20' 
        : 'border-gray-100 dark:border-gray-700/50 shadow-md hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-900/30'}
    `}>
      <div className="pointer-events-none absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-blue-300/60 to-transparent dark:from-blue-600/30"></div>
      {/* HEADER: USER & VEHICLE */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center font-bold text-white shadow-inner">
              {ride.userName ? ride.userName[0].toUpperCase() : "U"}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
          </div>
          
          <div>
            <h3 className="text-[15px] font-bold text-gray-900 dark:text-white leading-tight">
              {ride.userName}
            </h3>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 mt-1 uppercase tracking-wider">
              {ride.vehicleName || "-"}
            </span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            <span className="text-sm font-normal text-gray-500 mr-1">₹</span>
            {ride.fare}
          </p>
        </div>
      </div>

      {/* ROUTE SECTION */}
      <div className="flex gap-4 mb-4 relative">
        <div className="flex flex-col items-center py-1">
          <div className="w-2.5 h-2.5 rounded-full border-2 border-blue-600 bg-white dark:bg-gray-800 "></div>
          <div className="w-0.5 flex-1 bg-gradient-to-b from-blue-600 via-gray-200 dark:via-gray-700 to-gray-300 dark:to-gray-600 my-1"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 "></div>
        </div>

        <div className="flex flex-col justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 font-bold">Pickup</p>
            <p className="text-[15px] font-semibold text-gray-800 dark:text-gray-200">{ride.from}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-widest text-gray-400 dark:text-gray-500 font-bold">Drop-off</p>
            <p className="text-[15px] font-semibold text-gray-800 dark:text-gray-200">{ride.to}</p>
          </div>
        </div>
      </div>

      {/* TRIP META INFO */}
      <div className="grid grid-cols-3 gap-3 py-3 px-4 bg-gray-100 dark:bg-gray-800 rounded-xl mb-5">

        {/* DATE */}
        <div className="flex flex-col items-center border-r border-gray-300 dark:border-gray-600 pr-2">
          <span className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold tracking-wide">
            Date
          </span>
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {formatDate(ride.date)}
          </span>
        </div>

        {/* TIME */}
        <div className="flex flex-col items-center border-r border-gray-300 dark:border-gray-600 pr-2">
          <span className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold tracking-wide">
            Time
          </span>
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {ride.time}
          </span>
        </div>

        {/* SEATS */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-gray-600 dark:text-gray-400 uppercase font-semibold tracking-wide">
            Seats
          </span>
          <span
            className={`text-sm font-bold ${
              isFull ? "text-red-500" : "text-green-600"
            }`}
          >
            {isFull ? "Full" : `${ride.seats} left`}
          </span>
        </div>

      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3">
        <button 
          onClick={() => setSelectedRide(isSelected ? null : ride)}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all
            ${isSelected 
              ? 'bg-gray-100 dark:bg-black dark:bg-gray-700 text-gray-900 dark:text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200 dark:shadow-none'}`}
        >
          {isSelected ? 'Close Details' : 'View Details'}
        </button>

        <button 
          onClick={() => !user ? setActiveTab("profile") : handleRequestRide(ride)}
          disabled={isFull || isOwner || alreadyRequested}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all
            ${(isFull || isOwner || alreadyRequested)
              ? "bg-gray-100 dark:bg-black dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed border border-gray-200 dark:border-gray-700"
              : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-100 dark:shadow-none"
            }`}
        >
          {isOwner ? "Owner" : alreadyRequested ? "Requested" : isFull ? "Sold Out" : "Book Seat"}
        </button>
      </div>
    </div>
  );
}

export default RideCard;