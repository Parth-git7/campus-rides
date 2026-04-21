import { NavLink, useNavigate } from "react-router-dom";

const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const RequestsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
    <line x1="6" y1="1" x2="6" y2="4"/>
    <line x1="10" y1="1" x2="10" y2="4"/>
    <line x1="14" y1="1" x2="14" y2="4"/>
  </svg>
);

const MyRidesIcon = () => (
  <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 13h20v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-3z"/>
    <path d="M2 13l3-5h10l3 5"/>
    <path d="M7 8l1.5-2h7L17 8"/>
    <circle cx="6.5" cy="17.5" r="1.5"/>
    <circle cx="17.5" cy="17.5" r="1.5"/>
  </svg>
);
const ProfileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

function NavItem({ to, icon, label }) {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <div className={`
          flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl transition-all duration-200
          ${isActive
            ? "bg-blue-50 dark:bg-blue-900/30"
            : ""}
        `}>
          <span className={isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"}>
            {icon}
          </span>
          <span className={`text-[10px] font-medium leading-none
            ${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"}
          `}>
            {label}
          </span>
        </div>
      )}
    </NavLink>
  );
}

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0
      bg-white dark:bg-gray-800 z-50
      border-t border-gray-200 dark:border-gray-700
      shadow-md flex justify-around items-center py-2 px-2">

      {/* LEFT SIDE */}
      <div className="flex items-center justify-around flex-1 pr-2">
        <NavItem to="/" icon={<HomeIcon />} label="Home" />
        <NavItem to="/requests" icon={<RequestsIcon />} label="Requests" />
      </div>

      {/* CENTER + BUTTON */}
      <button
        onClick={() => navigate("/post-ride")}
        className="bg-blue-600 text-white w-12 h-12 rounded-full -mt-5 shadow-lg
          border-4 border-gray-100 dark:border-gray-900
          flex items-center justify-center flex-shrink-0"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-around flex-1 pl-2">
        <NavItem to="/myrides" icon={<MyRidesIcon />} label="My Rides" />
        <NavItem to="/profile" icon={<ProfileIcon />} label="Profile" />
      </div>

    </div>
  );
}

export default Navbar;

// version 2

//import { NavLink, useNavigate } from "react-router-dom";

// function Navbar() {

//   const navigate = useNavigate();

//   return (
//     <div className="fixed bottom-0 left-0 right-0 
//       bg-white dark:bg-gray-800 z-50
//       border-t border-gray-200 dark:border-gray-700
//       shadow-md flex justify-around items-center py-2">

//       {/* NavLink automatically adds active styling when route matches */}
//       <NavLink
//         to="/"
//         className={({ isActive }) =>
//           isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300"
//         }
//       >
//         Home
//       </NavLink>

//       <NavLink
//         to="/requests"
//         className={({ isActive }) =>
//           isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300"
//         }
//       >
//         Requests
//       </NavLink>

//       {/* CENTER BUTTON — navigates to post ride page */}
//       <button
//         onClick={() => navigate("/post-ride")}
//         className="bg-blue-600 text-white w-12 h-12 rounded-full -mt-4 shadow-lg"
//       >
//         +
//       </button>

//       <NavLink
//         to="/myrides"
//         className={({ isActive }) =>
//           isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300"
//         }
//       >
//         My Rides
//       </NavLink>

//       <NavLink
//         to="/profile"
//         className={({ isActive }) =>
//           isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-300"
//         }
//       >
//         Profile
//       </NavLink>

//     </div>
//   );
// }

// export default Navbar;






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