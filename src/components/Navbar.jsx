import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 
      bg-white dark:bg-gray-800 z-50
      border-t border-gray-200 dark:border-gray-700
      shadow-md flex justify-around items-center py-2">

      {/* NavLink automatically adds active styling when route matches */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300"
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/requests"
        className={({ isActive }) =>
          isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300"
        }
      >
        Requests
      </NavLink>

      {/* CENTER BUTTON — navigates to post ride page */}
      <button
        onClick={() => navigate("/post-ride")}
        className="bg-blue-600 text-white w-12 h-12 rounded-full -mt-4 shadow-lg"
      >
        +
      </button>

      <NavLink
        to="/myrides"
        className={({ isActive }) =>
          isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300"
        }
      >
        My Rides
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300"
        }
      >
        Profile
      </NavLink>

    </div>
  );
}

export default Navbar;






// version 1 (without routing , removed) below 

// function Navbar({ activeTab, setActiveTab, setShowForm }) {
//   return (
    
//     <div className="fixed bottom-0 left-0 right-0 
//       bg-white dark:bg-gray-800 z-50
//       border-t border-gray-200 dark:border-gray-700
//       shadow-md flex justify-around items-center py-2">

//       <button 
//         onClick={() => setActiveTab("home")}
//         className={
//           activeTab === "home"
//             ? "text-blue-600 dark:text-blue-400"
//             : "text-gray-600 dark:text-gray-300"
//         }
//       >
//         Home
//       </button>

//       <button 
//         onClick={() => setActiveTab("requests")}
//         className={
//           activeTab === "requests"
//             ? "text-blue-600 dark:text-blue-400"
//             : "text-gray-600 dark:text-gray-300"
//         }
//       >
//         Requests
//       </button>

//       {/* CENTER BUTTON */}
//       <button 
//         onClick={() => setShowForm(true)} // ✔ opens post ride form
//         className="bg-blue-600 text-white w-12 h-12 rounded-full -mt-4 shadow-lg"
//       >
//         +
//       </button>

//       <button 
//         onClick={() => setActiveTab("myrides")}
//         className={
//           activeTab === "myrides"
//             ? "text-blue-600 dark:text-blue-400"
//             : "text-gray-600 dark:text-gray-300"
//         }
//       >
//         My Rides
//       </button>

//       <button 
//         onClick={() => setActiveTab("profile")}
//         className={
//           activeTab === "profile"
//             ? "text-blue-600 dark:text-blue-400"
//             : "text-gray-600 dark:text-gray-300"
//         }
//       >
//         Profile
//       </button>

//     </div>
//   );
// }

// export default Navbar;