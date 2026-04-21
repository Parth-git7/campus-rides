import AuthForm from "../components/AuthForm";

function ProfilePage({
  user,
  userProfile,
  totalRides,
  totalRequests,
  email, setEmail,
  password, setPassword,
  confirmPassword, setConfirmPassword,
  isSignup, setIsSignup,
  handleLogin,
  handleSignup,
  handleLogout,
  name, setName,
  branch, setBranch,
  handlePhotoUpload,
  handleSaveProfile,
}) {

  return (
    <div className="p-4">
      {/* AuthForm handles both logged in and logged out states internally */}
      <AuthForm
        user={user}
        userProfile={userProfile}
        totalRides={totalRides}
        totalRequests={totalRequests}
        email={email} setEmail={setEmail}
        password={password} setPassword={setPassword}
        confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
        isSignup={isSignup} setIsSignup={setIsSignup}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        handleLogout={handleLogout}
        name={name} setName={setName}
        branch={branch} setBranch={setBranch}
        handlePhotoUpload={handlePhotoUpload}
        handleSaveProfile={handleSaveProfile}
        
      />
    </div>
  );
}

export default ProfilePage;