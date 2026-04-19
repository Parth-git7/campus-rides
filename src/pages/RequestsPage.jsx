import { useNavigate } from "react-router-dom";
import RequestCard from "../components/RequestCard";

function RequestsPage({
  user,
  myRequests,
  rides,
  handleCancelRequest,
}) {

  const navigate = useNavigate();

  // not logged in state
  if (!user) {
    return (
      <div className="p-6 text-center mt-10">
        <p className="text-gray-600 dark:text-gray-400 font-semibold mb-4">
          Login to see your requests.
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
        My Requests
      </h2>

      {myRequests.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-6">
          No requests yet.
        </p>
      ) : (
        myRequests.map((req) => {
          const ride = rides.find((r) => r.id === req.rideId);
          if (!ride) return null;

          return (
            <RequestCard
              key={req.id}
              req={req}
              ride={ride}
              onViewDetails={() => navigate(`/ride/${ride.id}`)}
              handleCancelRequest={handleCancelRequest}
            />
          );
        })
      )}
    </div>
  );
}

export default RequestsPage;