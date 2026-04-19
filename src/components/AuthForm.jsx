function AuthForm({
  user,
  userProfile,
  handlePhotoUpload,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  isSignup,
  setIsSignup,
  handleLogin,
  handleSignup,
  handleLogout,
  name,
  setName,
  branch,
  setBranch,
  totalRequests,
  totalRides
}) {

  // ✔ If user logged in → show profile
  if (user) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow border border-gray-200 dark:border-gray-700 overflow-hidden">

        {/* TOP GRADIENT BANNER */}
        <div className="h-24 bg-gradient-to-br from-blue-500 to-blue-700 relative">
          
          {/* AVATAR */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
            <label className="cursor-pointer group">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) handlePhotoUpload(file);
                }}
              />
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-700 overflow-hidden relative">
                
                {/* show photo if exists, else show letter */}
                {userProfile?.photoURL ? (
                  <img
                    src={userProfile.photoURL}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-black text-blue-600">
                    {userProfile?.name ? userProfile.name[0].toUpperCase() : user.email[0].toUpperCase()}
                  </span>
                )}

                {/* hover overlay — hints that photo is clickable */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                  <span className="text-white text-[10px] font-bold">EDIT</span>
                </div>

              </div>
            </label>
          </div>
        </div>

        {/* PROFILE BODY */}
        <div className="pt-12 pb-6 px-6">

          {/* NAME + BRANCH */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-black text-gray-900 dark:text-white">
              {userProfile?.name || "—"}
            </h2>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 uppercase tracking-wider mt-1">
              {userProfile?.branch || "—"}
            </span>
          </div>

          {/* DIVIDER */}
          <div className="border-t border-gray-100 dark:border-gray-700 mb-5"></div>

          {/* DETAILS */}
          <div className="flex flex-col gap-3 mb-6">

            {/* Email */}
            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900/50 px-4 py-3 rounded-xl">
              <span className="text-[11px] uppercase tracking-widest text-gray-400 font-bold">Email</span>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{user.email}</span>
            </div>

            {/* Member Since */}
            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-900/50 px-4 py-3 rounded-xl">
              <span className="text-[11px] uppercase tracking-widest text-gray-400 font-bold">Member Since</span>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {user.metadata?.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString("default", { month: "long", year: "numeric" })
                  : "—"}
              </span>
            </div>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-3 mb-6">

            <div className="flex flex-col items-center bg-blue-50 dark:bg-blue-900/20 py-4 rounded-2xl">
              <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
                {totalRides}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold mt-1">
                Rides Posted
              </span>
            </div>

            <div className="flex flex-col items-center bg-blue-50 dark:bg-blue-900/20 py-4 rounded-2xl">
              <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
                {totalRequests}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold mt-1">
                Rides Requested
              </span>
            </div>

          </div>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-xl text-sm font-bold
              bg-red-100 hover:bg-red-200 text-red-600
              dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400
              border border-red-200 dark:border-red-800
              transition-all"
          >
            Logout
          </button>

        </div>
      </div>
    );
  }

  // ✔ If not logged in → show auth form
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700">

      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        {isSignup ? "Sign Up" : "Login"}
      </h2>

      {isSignup && (
        <>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-3 border rounded bg-white dark:bg-gray-700 dark:text-white"
        />
        

          <input
            type="text"
            placeholder="Branch (e.g. CSE)"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="w-full p-2 mb-3 border rounded bg-white dark:bg-gray-700 dark:text-white"
        />
        </>
      )}
      <input 
        type="email"
        placeholder="Chitkara Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // ✔ update email
        className="w-full p-2 mb-3 border rounded bg-white dark:bg-gray-700 dark:text-white"
      />

      <input 
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // ✔ update password
        className="w-full p-2 mb-3 border rounded bg-white dark:bg-gray-700 dark:text-white"
      />

      {isSignup && (
        <input 
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} // ✔ confirm password
          className="w-full p-2 mb-3 border rounded bg-white dark:bg-gray-700 dark:text-white"
        />
      )}
      

      <button 
        onClick={isSignup ? handleSignup : handleLogin} // ✔ switch action
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
      >
        {isSignup ? "Sign Up" : "Login"}
      </button>

      <p 
        onClick={() => setIsSignup(!isSignup)} // ✔ toggle mode
        className="mt-3 text-sm text-blue-600 dark:text-blue-400 cursor-pointer"
      >
        {isSignup 
          ? "Already have an account? Login" 
          : "New user? Sign up"}
      </p>

    </div>
  );
}

export default AuthForm;