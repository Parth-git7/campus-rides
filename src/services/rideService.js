// src/services/rideService.js

// This file will contain all ride-related logic
import { db } from "../firebase";
import { doc, collection, addDoc , updateDoc, deleteDoc, runTransaction, getDocs} from "firebase/firestore";

export const testService = () => {
//   alert("Service working"); // 🔥 force visible output
  console.log("Service layer working ✅");
};


// Post a ride
    export const postRide = async ({
      from,
      to,
      date,
      time,
      fare,
      seats,
      vehicleNumber,
      vehicleType,
      vehicleName,
      userEmail,
      userName,
      userBranch
    }) => {
 
    // validations
    if (!from || !to || !date || !time || !fare || !seats || !vehicleType || !vehicleName || !vehicleNumber) {
        throw new Error("All fields are required");
    }

    const cleanFrom = from.trim().toLowerCase();
    const cleanTo = to.trim().toLowerCase();

    if (cleanFrom === cleanTo) {
    throw new Error("From and To cannot be same");
    }



    if (Number(seats) <= 0) {
        throw new Error("Seats must be greater than 0");
    }

    if (Number(fare) < 0) {
        throw new Error("Fare cannot be negative");
    }

    // firestore call
    const docRef = await addDoc(collection(db, "rides"), {
        from,
        to,
        date,
        time,
        fare,
        seats,
        vehicleNumber,
        vehicleName,
        vehicleType,
        userEmail,
        userName,     
        userBranch    
    });

    return docRef;
    };


    // Request a ride
    export const requestRide = async ({ ride, userEmail, existingRequests }) => {

    // prevent requesting own ride
    if (ride.userEmail === userEmail) {
        throw new Error("You cannot request your own ride");
    }

    // prevent full ride
    if (Number(ride.seats) <= 0) {
        throw new Error("Ride is full");
    }

    // prevent duplicate request
    const alreadyRequested = existingRequests.find(
        (req) =>
        req.rideId === ride.id &&
        req.riderEmail === userEmail
    );

    if (alreadyRequested) {
        throw new Error("You already requested this ride");
    }

    // firestore
    const docRef = await addDoc(collection(db, "rideRequests"), {
        rideId: ride.id,
        riderEmail: userEmail,
        status: "pending"
    });

    return docRef;
    };




    /// handleUpdateRequest///////////////////////////

    // update request (accept/reject)
    export const updateRequest = async ({ requestId, newStatus, rideData }) => {

      const requestRef = doc(db, "rideRequests", requestId);

      // ONLY handle seat logic for accept
      if (newStatus === "accepted") {

        const rideRef = doc(db, "rides", rideData.id);

        // run transaction FIRST
        await runTransaction(db, async (transaction) => {

          const rideDoc = await transaction.get(rideRef);

          if (!rideDoc.exists()) {
            throw new Error("Ride does not exist");
          }

          const currentSeats = rideDoc.data().seats;

          if (Number(currentSeats) <= 0) {
            throw new Error("Ride is full");
          }

          // reduce seat
          transaction.update(rideRef, {
            seats: Number(currentSeats) - 1
          });

          // ONLY AFTER SUCCESS → update request
          transaction.update(requestRef, {
            status: "accepted"
          });

        });

      } else {
        // reject case → simple update
        await updateDoc(requestRef, {
          status: "rejected"
        });
      }
    };

    export const cancelRequest = async (requestId) => {
      await deleteDoc(doc(db, "rideRequests", requestId));
    };

    // delete ride
    export const deleteRide = async (rideId) => {
      await deleteDoc(doc(db, "rides", rideId));
    };

    // fetch rides created by user
    export const getMyRides = async (userEmail) => {

      const querySnapshot = await getDocs(collection(db, "rides"));

      const myRides = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter(ride => ride.userEmail === userEmail);

      return myRides;
    };