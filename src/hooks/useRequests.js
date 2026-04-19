import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import {
  requestRide,
  updateRequest,
  cancelRequest,
} from "../services/rideService";
import toast from "react-hot-toast";

const useRequests = (user, rides) => {
  // --- Requests Data ---
  const [requests, setRequests] = useState([]);

  // --- Fetch all requests in real-time ---
  const fetchRequests = () => {
    return onSnapshot(collection(db, "rideRequests"), (snapshot) => {
      const reqs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRequests(reqs);
    });
  };

  // --- Request a ride ---
  const handleRequestRide = async (ride) => {
    try {
      await requestRide({
        ride,
        userEmail: user?.email,
        existingRequests: requests,
      });

      toast.success("Request sent");

    } catch (error) {
      toast.error(error.message);
    }
  };

  // --- Accept or Reject a request ---
  const handleUpdateRequest = async (requestId, newStatus, rideData) => {
    try {
      await updateRequest({ requestId, newStatus, rideData });

      toast.success(
        newStatus === "accepted" ? "Request accepted" : "Request rejected"
      );

    } catch (error) {
      toast.error(error.message);
    }
  };

  // --- Cancel a request ---
  const handleCancelRequest = async (requestId) => {
    try {
      const confirmCancel = window.confirm("Cancel this request?");
      if (!confirmCancel) return;

      await cancelRequest(requestId);

      // remove from UI instantly without waiting for snapshot
      setRequests((prev) => prev.filter((req) => req.id !== requestId));

      toast.success("Request cancelled");

    } catch (error) {
      console.log(error.message);
    }
  };

  // --- Requests made by current user, newest first ---
  const myRequests = requests
    .filter((req) => req.riderEmail === user?.email)
    .slice()
    .reverse();

  // --- Real-time listener ---
  useEffect(() => {
    if (!user) return; // don't listen if not logged in

    const unsubscribeRequests = fetchRequests();

    return () => unsubscribeRequests(); // cleanup
  }, [user]);

  return {
    requests,
    myRequests,
    handleRequestRide,
    handleUpdateRequest,
    handleCancelRequest,
  };
};

export default useRequests;