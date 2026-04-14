function AuthForm({
  user,
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
  setBranch
}) {

  // ✔ If user logged in → show profile
  if (user) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700">

        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Profile
        </h2>

        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {user?.email}
        </p>

        <button 
          onClick={handleLogout} // ✔ logout function
          className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full"
        >
          Logout
        </button>

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