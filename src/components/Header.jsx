function Header({ user, userProfile }) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    return "Evening";
  };

 return (
   
      <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
        Where<span className="text-blue-600">To</span>
        {user && userProfile?.name && (
          <span className="text-gray-900 dark:text-white">
            , {userProfile.name.split(" ")[0]}
          </span>
        )}
      </h1>
      
    
  );
}

export default Header;