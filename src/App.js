import { useState } from "react";  // user memory
import { signInWithEmailAndPassword } from "firebase/auth";  // type of authentication
import { auth } from "./firebase"; // firebase authentication
import { createUserWithEmailAndPassword } from "firebase/auth"; // for user creation
import { signOut } from "firebase/auth"; // for log out 
import { db } from "./firebase";  // firestore database
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { deleteDoc } from "firebase/firestore";
import { useEffect } from "react"; // accessing database without posting
import { onAuthStateChanged } from "firebase/auth";

import toast, { Toaster } from "react-hot-toast";

import { postRide } from "./services/rideService";
import { requestRide } from "./services/rideService";
import { updateRequest } from "./services/rideService";
import { cancelRequest } from "./services/rideService";
import { deleteRide } from "./services/rideService";
// import { getMyRides } from "./services/rideService";
import { subscribeMyRides } from "./services/rideService";  // replace getMyRides
import { getUserProfile } from "./services/userService";

import RideCard from "./components/RideCard"; //  import component ridecard
import RideModal from "./components/RideModal"; // import modal component ride card
import Navbar from "./components/Navbar"; // import navbar component
import PostRideModal from "./components/PostRideModal"; // import post ride modal
import SearchBox from "./components/SearchBox" ; // import search box 
import AuthForm from "./components/AuthForm"; // import auth component
import RequestCard from "./components/RequestCard";
import MyRideCard from "./components/MyRideCard";

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [user, setUser] = useState(null);  //remember user
  const [isSignup, setIsSignup] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showForm, setShowForm] = useState(false); // controls visibility of form
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [time, setTime] = useState("");
  const [fare, setFare] = useState("");
  const [seats, setSeats] = useState("");
  const [date, setDate] = useState("");          // ride date
  const [vehicleType, setVehicleType] = useState(""); // car/bike/scooty
  const [vehicleName, setVehicleName] = useState("");
  const [rides, setRides] = useState([]);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [selectedRide, setSelectedRide] = useState(null);
  const [myRides, setMyRides] = useState([]); // driver dashboard
  const [requests, setRequests] = useState([]); //
  const [activeTab, setActiveTab] = useState("home");
  const [darkMode, setDarkMode] = useState(false);
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [loading, setLoading] = useState(true); // 
  const [userProfile, setUserProfile] = useState(null); // stores name, branch etc.

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
  const handleSignup = async () => {
    try {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      // create auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const newUser = userCredential.user;

      //store in Firestore
      await addDoc(collection(db, "users"), {
        name: name.trim(),
        branch: branch.trim(),
        email: newUser.email
      });

      toast.success("Account created ");

    } catch (error) {
      console.log(error.message) ;
      toast.error("Sign-Up failed ");
    }
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
        if (!from || !to || !date || !time || !fare || !seats || !vehicleType || !vehicleNumber || !vehicleName) {
          toast.error("Please fill all fields");
          return;
        }

        await postRide({
          from,
          to,
          date,
          time,
          fare,
          seats,
          vehicleType,
          vehicleNumber,
          vehicleName,
          userEmail: user.email,
          userName: userProfile?.name,    
          userBranch: userProfile?.branch  
        });

        toast.success("Ride posted ✅");

        fetchRides();

        // clear form
        setFrom("");
        setTo("");
        setTime("");
        setFare("");
        setSeats("");
        setDate("");
        setVehicleType("");
        setVehicleName("");
        setVehicleNumber("");
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
        const unsubscribeRides = fetchRides();
        let unsubscribeRequests = null;
        let unsubscribeMyRides = null;

        if (user) {
          // real-time listener for my rides
          unsubscribeMyRides = subscribeMyRides(user.email, (myRidesArray) => {
            setMyRides(myRidesArray);
          });

          unsubscribeRequests = fetchRequests();
        }

        return () => {
          unsubscribeRides();
          if (unsubscribeRequests) unsubscribeRequests();
          if (unsubscribeMyRides) unsubscribeMyRides();  // cleanup
        };

      }, [user]);

      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          
          setUser(currentUser);

          if (currentUser) {
            // fetch profile from Firestore
            const profile = await getUserProfile(currentUser.email);

            setUserProfile(profile); // store in state
          } else {
            setUserProfile(null);
          }

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
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
  
          <Toaster position="top-center" reverseOrder={false} />
          {/* <div className="text-center"> */}
          <div className="relative">
            {/* <div className="text-center"> */}
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
                        // combine date + time
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
              showForm={showForm}
              setShowForm={setShowForm}

              from={from} setFrom={setFrom}     
              to={to} setTo={setTo}
              time={time} setTime={setTime}
              fare={fare} setFare={setFare}
              seats={seats} setSeats={setSeats}
              date={date} setDate={setDate}
              vehicleType={vehicleType} setVehicleType={setVehicleType}
              vehicleName={vehicleName} setVehicleName={setVehicleName}
              vehicleNumber={vehicleNumber} setVehicleNumber={setVehicleNumber}

              handlePostRide={handlePostRide}
            />
              
              {activeTab === "requests" && (
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
                          setSelectedRide={setSelectedRide}       // opens existing RideModal
                          handleCancelRequest={handleCancelRequest}
                        />
                      );
                    })
                  )}
                </div>
              )}
                

            

              {activeTab === "myrides" && (
              <div className="p-4 mt-2">

                <h2 className="text-xl font-bold text-left mb-4 text-gray-800 dark:text-gray-100">
                  My Rides
                </h2>

                {myRides.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-6">
                    You haven't posted any rides yet.
                  </p>
                ) : (
                  myRides.slice().reverse().map((ride) => (
                    <MyRideCard
                      key={ride.id}
                      ride={ride}
                      requests={requests}
                      setSelectedRide={setSelectedRide}
                      handleUpdateRequest={handleUpdateRequest}
                      handleDeleteRide={handleDeleteRide}
                      user={user}
                    />
                  ))
                )}

              </div>
            )}
          </div>

          {activeTab === "profile" && (
            <div className="p-4">
              <AuthForm
                user={user}
                userProfile={userProfile}                    
                totalRides={myRides.length}                  
                totalRequests={myRequests.length}        

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

                name={name}
                setName={setName}

                branch={branch}
                setBranch={setBranch}
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
    );
}

export default App;