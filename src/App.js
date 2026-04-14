import { useState } from "react";  // user memory
import { signInWithEmailAndPassword } from "firebase/auth";  // type of authentication
import { auth } from "./firebase"; // firebase authentication
import { createUserWithEmailAndPassword } from "firebase/auth"; // for user creation
import { signOut } from "firebase/auth"; // for log out 
import { db } from "./firebase";  // firestore database
import { collection, addDoc, updateDoc, doc , onSnapshot, getDocs, runTransaction} from "firebase/firestore"; // getting data from firestore
import { deleteDoc } from "firebase/firestore";
import { useEffect } from "react"; // accessing database without posting
import { onAuthStateChanged } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

// import { testService } from "./services/rideService";// testing only
import { postRide } from "./services/rideService";
import { requestRide } from "./services/rideService";
import { updateRequest } from "./services/rideService";
import { cancelRequest } from "./services/rideService";
import { deleteRide } from "./services/rideService";
import { getMyRides } from "./services/rideService";

import RideCard from "./components/RideCard"; //  import component ridecard
import RideModal from "./components/RideModal"; // import modal component ride card
import Navbar from "./components/Navbar"; // import navbar component
import PostRideModal from "./components/PostRideModal"; // import post ride modal
import SearchBox from "./components/SearchBox" ; // import search box 
import AuthForm from "./components/AuthForm"; // import auth component

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);  //remember user
  const [isSignup, setIsSignup] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showForm, setShowForm] = useState(false); // controls visibility of form
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [time, setTime] = useState("");
  const [fare, setFare] = useState("");
  const [seats, setSeats] = useState("");
  const [rides, setRides] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [myRides, setMyRides] = useState([]); // driver dashboard
  const [requests, setRequests] = useState([]); //
  const [activeTab, setActiveTab] = useState("home");
  const [darkMode, setDarkMode] = useState(false);
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [loading, setLoading] = useState(true); // 

  // logging in function for user to login
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Login success:", userCredential.user);
        toast.success("You are ready to go") ;
        setUser(userCredential.user);      })
      .catch((error) => {
        console.log(error.message);
        toast.error("Login failed");
      });
  };


  // sign up function - creating new users 
  const handleSignup = () => {
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Signup success:", userCredential.user);
        toast.success("Account created ✅");
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("Sign-Up failed ❌");
      });
  };


  // Log out function 
  const handleLogout = () => {
      signOut(auth)
        .then(() => {
          setUser(null);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
//
// modified toast
  //       toast.success("Ride posted ✅", {
  //         style: {
  //           borderRadius: "10px",
  //           background: "#333",
  //           color: "#fff",
  //         },
  
      const handlePostRide = async () => {
      try {
        if (!user) return;

        await postRide({
          from,
          to,
          time,
          fare,
          seats,
          userEmail: user.email
        });

        toast.success("Ride posted ✅");

        fetchRides();

        // clear form
        setFrom("");
        setTo("");
        setTime("");
        setFare("");
        setSeats("");
        setShowForm(false);

      } catch (error) {
        toast.error(error.message);
      }
    };

    const fetchRides = () => {
      setLoading(true); // start loading when listener attaches
      //  listen to real-time updates from Firestore
      return onSnapshot(collection(db, "rides"), (snapshot) => {

        const ridesArray = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setRides(ridesArray); // auto update UI
        setLoading(false); // data received → stop loading

      });

    };
 


    const handleRequestRide = async (ride) => {
      try {
        await requestRide({
          ride,
          userEmail: user?.email,
          existingRequests: requests
        });

        toast.success("Request sent");

      } catch (error) {
        toast.error(error.message);
      }
    };
      const myRequests = requests
        .filter((req) => req.riderEmail === user?.email)
        .slice() //  copy array (important)
        .reverse(); //  newest first

      const fetchMyRides = async () => {
        const myRidesArray = await getMyRides(user?.email);
        setMyRides(myRidesArray);
      };


      const fetchRequests = () => {
        //  listen to rideRequests collection in real-time
        return onSnapshot(collection(db, "rideRequests"), (snapshot) => {

          const reqs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          setRequests(reqs); //  auto update UI
        });

      };

      const handleUpdateRequest = async (requestId, newStatus, rideData) => {
        try {

          await updateRequest({
            requestId,
            newStatus,
            rideData
          });

          toast.success(
            newStatus === "accepted"
              ? "Request accepted"
              : "Request rejected"
          );

          fetchRequests();
          fetchRides();
          fetchMyRides();

        } catch (error) {
          toast.error(error.message);
        }
      };
      

      const handleDeleteRide = async (rideId) => {
        try {
          const confirmDelete = window.confirm(
            "Are you sure you want to delete this ride?"
          );

          if (!confirmDelete) return;

          await deleteRide(rideId);

          toast.success("Ride Deleted");

          fetchRides();
          fetchMyRides();

        } catch (error) {
          console.log(error.message);
        }
      };


    
    const handleCancelRequest = async (requestId) => {
      try {
        const confirmCancel = window.confirm("Cancel this request?");
        if (!confirmCancel) return;

        await cancelRequest(requestId);

        // update UI instantly
        setRequests((prev) =>
          prev.filter((req) => req.id !== requestId)
        );

        toast.success("Request cancelled");

      } catch (error) {
        console.log(error.message);
      }
    };

    const filteredRides = rides.filter((ride) => {

      const matchFrom = searchFrom
        ? ride.from.toLowerCase().includes(searchFrom.toLowerCase())
        : true;

      const matchTo = searchTo
        ? ride.to.toLowerCase().includes(searchTo.toLowerCase())
        : true;

      return matchFrom && matchTo;

    });

      
      useEffect(() => {
        const unsubscribeRides = fetchRides(); //  rides listener
        let unsubscribeRequests = null;

        if (user) {
          fetchMyRides(); // still normal fetch

          unsubscribeRequests = fetchRequests(); //  requests listener
        }

        return () => {
          unsubscribeRides(); //  cleanup rides

          if (unsubscribeRequests) {
            unsubscribeRequests(); // cleanup requests
          }
        };

      }, [user]);

      useEffect(() => {
        
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });

        return () => unsubscribe();
      }, []);

      useEffect(() => {   // to close form on switching tab
        
        setShowForm(false);
      }, [activeTab]);

//       useEffect(() => { /////////// testing only /////////
//   testService(); //  runs once on load
// }, []);

  return (
      
      <div className="pb-24">
      <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-black-900 text-black dark:text-white">
      {/* <div className="flex items-center justify-center min-h-screen bg-gray-100"> */}
      <div className="bg-gray-100" min-h-screen >

          <Toaster position="top-center" reverseOrder={false} />
          <div className="text-center">
            <div className="text-center">
            {activeTab === "home" && (
              <div className="p-4">
                
                {/* Search Box for finding rides  */}
                <SearchBox
                  user={user} // login state

                  searchFrom={searchFrom} // input state
                  setSearchFrom={setSearchFrom}

                  searchTo={searchTo}
                  setSearchTo={setSearchTo}

                  setActiveTab={setActiveTab} // redirect to login
                />

                {/* RIDES LIST */}
                <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700">
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

                  {loading ? (
                      <p>Loading rides...</p>
                    ) : filteredRides.length === 0 ? (
                      <p>No rides found</p>
                    ) : (
                      filteredRides
                        .slice()
                        .reverse()
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
                              selectedRide={selectedRide}
                              setSelectedRide={setSelectedRide}
                              handleRequestRide={handleRequestRide}
                              setActiveTab={setActiveTab}
                            />
                          );
                        })
                    )}
                </div>
              </div>
            )}

            {/* pop up modal for view details  */}
            <RideModal
              selectedRide={selectedRide} // current selected ride
              setSelectedRide={setSelectedRide} // close modal
              user={user} // auth check
              setActiveTab={setActiveTab} // redirect to login
            />

            {/* /// bottom navbar */}
            <Navbar
              activeTab={activeTab} // current tab
              setActiveTab={setActiveTab} // change tab
              setShowForm={setShowForm} // open post ride form
            />

            {/* Posting a new ride form / modal  */}
            <PostRideModal
              showForm={showForm} // controls visibility
              setShowForm={setShowForm} // close modal

              setFrom={setFrom} // form state
              setTo={setTo}
              setTime={setTime}
              setFare={setFare}
              setSeats={setSeats}

              handlePostRide={handlePostRide} // submit logic
            />
              
              {activeTab === "requests" && (
                <div className="mt-6">

                  {myRequests.length === 0 ? (
                    <p>No requests yet</p>
                  ) : (
                  myRequests.map((req) => {

                    // find the ride for this request
                    const ride = rides.find((r) => r.id === req.rideId);

                    if (!ride) return null;

                    return (
                      <div key={req.id} className="bg-white p-4 rounded shadow mb-2">

                        <p><b>{ride.from}</b> → {ride.to}</p>
                        <p>Time: {ride.time}</p>

                        <p>
                          Status:
                          {req.status === "pending" && " Requested"}
                          {req.status === "accepted" && " Accepted"}
                          {req.status === "rejected" && " Rejected"}
                        </p>

                        {req.status === "pending" && (
                          <button 
                            onClick={() => handleCancelRequest(req.id)}
                            className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
                          >
                            Cancel Request
                          </button>
                        )}

                      </div>
                    );
                  })
                )}
                
              </div>
              )}

              {activeTab === "myrides" && (

              <div className="mt-8">
              <h2 className="text-xl font-bold mb-2">My Rides</h2>

              {myRides.slice().reverse().map((ride) => {
                const rideRequests = requests.filter(
                  (req) => req.rideId === ride.id
                );
                

                return (
                  <div key={ride.id} className="bg-white p-4 rounded shadow mb-2">
                    <p><b>{ride.from}</b> → {ride.to}</p>
                    <p>Time: {ride.time}</p>
                    <p>Seats: {ride.seats}</p>

                    {rideRequests.length > 0 && (
                        <>
                          <p className="mt-2 font-semibold">Requests:</p>

                          {rideRequests.map((req) => (
                            <div key={req.id} className="border p-2 mt-1 rounded">
                              <p>{req.riderEmail}</p>
                              <p>Status: {req.status}</p>

                              {req.status === "pending" && (
                                <div className="mt-2">
                                  <button 
                                    onClick={() => handleUpdateRequest(req.id, "accepted", ride)}

                                    // ❌ disable if no seats
                                    disabled={Number(ride.seats) <= 0}

                                    className={`px-2 py-1 rounded mr-2 ${
                                      Number(ride.seats) <= 0
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-green-600 text-white"
                                    }`}
                                  >
                                    {Number(ride.seats) <= 0 ? "Full" : "Accept"}
                                  </button>

                                  <button 
                                    onClick={() => handleUpdateRequest(req.id, "rejected", ride)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                  >
                                    Reject
                                  </button>
                                </div>
                              )}
                            </div>
                          ))}
                        </>
                      )}
                    {ride.userEmail === user?.email && (
                          <button 
                            onClick={() => handleDeleteRide(ride.id)}
                            className="mt-2 bg-red-900 text-white px-3 py-1 rounded"
                          >
                            Delete Ride
                          </button>
                        )}
                  </div>
                );
              })}

            </div>
              )}
          </div>

          {activeTab === "profile" && (
            <div className="p-4">
              <AuthForm
                user={user}

                email={email}
                setEmail={setEmail}

                password={password}
                setPassword={setPassword}

                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}

                isSignup={isSignup}
                setIsSignup={setIsSignup}

                handleLogin={handleLogin}
                handleSignup={handleSignup}
                handleLogout={handleLogout}
              />
            </div>
          )}
                    <button 
                      onClick={() => setDarkMode(!darkMode)}
                      className="absolute top-4 right-4 bg-gray-300 dark:bg-gray-700 px-3 py-1 rounded"
                    >
                      {darkMode ? "Light" : "Dark"}
                    </button>

          </div>

      </div>
      </div>
      </div>
      </div>
    );
}

export default App;