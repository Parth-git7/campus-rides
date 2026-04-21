import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../services/userService";
import { uploadProfilePhoto, updateUserPhoto } from "../services/userService";
import { updateUserProfile } from "../services/userService" ;
import toast from "react-hot-toast";

const useAuth = () => {
  const navigate = useNavigate();
  // --- Auth State ---
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  // --- Form State ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  // --- Login ---
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success("You are ready to go");
        setUser(userCredential.user);
      })
      .catch(() => {
        toast.error("Login failed");
      });
  };

  // --- Signup ---
  const handleSignup = async () => {
    try {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const newUser = userCredential.user;

      // store extra info in Firestore (auth only stores email/password)
      await addDoc(collection(db, "users"), {
        name: name.trim(),
        branch: branch.trim(),
        email: newUser.email,
      });

      toast.success("Account created");
    } catch (error) {
      toast.error("Sign-Up failed");
    }
  };

  // --- Logout ---
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        setUserProfile(null);
        navigate("/"); // redirect to home after logout
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // --- Upload profile photo ---
    const handlePhotoUpload = async (file) => {
    try {
        if (!file) return;

        // upload to cloudinary → get URL back
        const photoURL = await uploadProfilePhoto(file);

        // save URL to Firestore user document
        await updateUserPhoto(userProfile.id, photoURL);

        // update local state instantly — no need to refetch
        setUserProfile((prev) => ({ ...prev, photoURL }));

        toast.success("Profile photo updated");

    } catch (error) {
        toast.error("Photo upload failed");
        console.log(error.message);
    }
    };

    // Save phone and gender to Firestore
    const handleSaveProfile = async ({ phone, gender }) => {
      try {
        if (!userProfile?.id) return;

        await updateUserProfile(userProfile.id, { phone, gender });

        // update local state instantly — no need to refetch
        setUserProfile((prev) => ({ ...prev, phone, gender }));

        toast.success("Profile updated");
      } catch (error) {
        toast.error("Failed to update profile");
      }
    };

  // --- Auto-detect login state on app load ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const profile = await getUserProfile(currentUser.email);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
    });

    return () => unsubscribe(); // cleanup on unmount
  }, []);

  // --- Return everything App.js needs ---
  return {
    user,
    userProfile,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    name, setName,
    branch, setBranch,
    isSignup, setIsSignup,
    handleLogin,
    handleSignup,
    handleLogout,
    handlePhotoUpload,
    handleSaveProfile,
  };

};

export default useAuth;