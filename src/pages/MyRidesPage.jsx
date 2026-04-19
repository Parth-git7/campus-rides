import { useNavigate } from "react-router-dom";
import MyRideCard from "../components/MyRideCard";

function MyRidesPage({
  user,
  myRides,
  requests,
  handleUpdateRequest,
  handleDeleteRide,
}) {

  const navigate = useNavigate();

  // not logged in state
  if (!user) {
    return (
      <div className="p-6 text-center mt-10">
        <p className="text-gray-600 dark:text-gray-400 font-semibold mb-4">
          Login to see your rides.
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
    <div className="p-4 mt-2">
      <h2 className="text-xl font-bold text-left mb-4 text-gray-800 dark:text-gray-100">
        My Rides
      </h2>

      {myRides.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-6">
          You haven't posted any rides yet.
        </p>
      ) : (
        myRides
          .slice()
          .reverse()
          .map((ride) => (
            <MyRideCard
              key={ride.id}
              ride={ride}
              requests={requests}
              onViewDetails={() => navigate(`/ride/${ride.id}`)}
              handleUpdateRequest={handleUpdateRequest}
              handleDeleteRide={handleDeleteRide}
              user={user}
            />
          ))
      )}
    </div>
  );
}

export default MyRidesPage;