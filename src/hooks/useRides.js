import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import {
  postRide,
  deleteRide,
  subscribeMyRides,
} from "../services/rideService";
import { getUserPhotos } from "../services/userService";
import toast from "react-hot-toast";

const useRides = (user, userProfile) => {
  // --- Rides Data ---
  const [rides, setRides] = useState([]);
  const [myRides, setMyRides] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Post Ride Form State ---
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [fare, setFare] = useState("");
  const [seats, setSeats] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");

  // --- Fetch all rides in real-time ---
    const fetchRides = () => {
    setLoading(true);

    return onSnapshot(collection(db, "rides"), async (snapshot) => {
        const ridesArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        }));

        // get all unique poster emails
        const emails = ridesArray.map((r) => r.userEmail);
        
        // fetch their photos
        const photoMap = await getUserPhotos(emails);

        // attach photo to each ride
        const enrichedRides = ridesArray.map((ride) => ({
        ...ride,
        userPhoto: photoMap[ride.userEmail] || null,
        }));

        setRides(enrichedRides);
        setLoading(false);
    });
    };

  // --- Clear post ride form ---
  const clearForm = () => {
    setFrom("");
    setTo("");
    setDate("");
    setTime("");
    setFare("");
    setSeats("");
    setVehicleType("");
    setVehicleName("");
    setVehicleNumber("");
  };

  // --- Post a new ride ---
  const handlePostRide = async (navigate) => {
    try {
      if (!user) return;

      if (
        !from || !to || !date || !time ||
        !fare || !seats || !vehicleType ||
        !vehicleNumber || !vehicleName
      ) {
        toast.error("Please fill all fields");
        return;
      }

      await postRide({
        from, to, date, time, fare, seats,
        vehicleType, vehicleNumber, vehicleName,
        userEmail: user.email,
        userName: userProfile?.name,
        userBranch: userProfile?.branch,
      });

      toast.success("Ride posted ✅");
      clearForm();
      navigate("/"); // redirect to home after posting

    } catch (error) {
      toast.error(error.message);
    }
  };

  // --- Delete a ride ---
  const handleDeleteRide = async (rideId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this ride?"
      );
      if (!confirmDelete) return;

      await deleteRide(rideId);
      toast.success("Ride Deleted");

    } catch (error) {
      console.log(error.message);
    }
  };

  // --- Real-time listeners ---
  useEffect(() => {
    // listen to all rides
    const unsubscribeRides = fetchRides();

    // listen to user's own rides
    let unsubscribeMyRides = null;
    if (user) {
      unsubscribeMyRides = subscribeMyRides(user.email, (myRidesArray) => {
        setMyRides(myRidesArray);
      });
    }

    return () => {
      unsubscribeRides();
      if (unsubscribeMyRides) unsubscribeMyRides();
    };
  }, [user]); // re-run when user logs in or out

  return {
    // data
    rides, myRides, loading,
    // form state
    from, setFrom,
    to, setTo,
    date, setDate,
    time, setTime,
    fare, setFare,
    seats, setSeats,
    vehicleType, setVehicleType,
    vehicleName, setVehicleName,
    vehicleNumber, setVehicleNumber,
    // handlers
    handlePostRide,
    handleDeleteRide,
  };
};

export default useRides;