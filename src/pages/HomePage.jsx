import { useNavigate } from "react-router-dom";
import SearchBox from "../components/SearchBox";
import RideCard from "../components/RideCard";

function HomePage({
  user,
  rides,
  filteredRides,
  loading,
  searchFrom, setSearchFrom,
  searchTo, setSearchTo,
  requests,
  handleRequestRide,
}) {

  const navigate = useNavigate();

  return (
    <div className="p-4">

      {/* Search Box */}
      <SearchBox
        searchFrom={searchFrom}
        setSearchFrom={setSearchFrom}
        searchTo={searchTo}
        setSearchTo={setSearchTo}
      />

      <div className="mt-6 space-y-5">
        <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>

        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Available Rides
          </h2>
          {!loading && (
            <span className="text-sm text-gray-500">
              Results ({filteredRides.length})
            </span>
          )}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>

        {loading ? (
          <p>Loading rides...</p>
        ) : filteredRides.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-6">
            No rides available right now. Try a different location.
          </p>
        ) : (
          filteredRides
            .slice()
            .sort((a, b) => {
              const dateA = new Date(`${a.date} ${a.time}`);
              const dateB = new Date(`${b.date} ${b.time}`);
              return dateB - dateA; // latest first
            })
            .map((ride) => {

              const alreadyRequested = user
                ? requests.find(
                    (req) =>
                      req.rideId === ride.id &&
                      req.riderEmail === user.email
                  )
                : false;

              return (
                <RideCard
                  key={ride.id}
                  ride={ride}
                  user={user}
                  alreadyRequested={alreadyRequested}
                  handleRequestRide={handleRequestRide}
                  // navigate to ride detail page on view details
                  onViewDetails={() => navigate(`/ride/${ride.id}`)}
                />
              );
            })
        )}
      </div>
    </div>
  );
}

export default HomePage;