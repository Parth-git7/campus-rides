import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

// Fetch user profile using email
export const getUserProfile = async (email) => {
  // Create query to find user by email
  const q = query(
    collection(db, "users"),
    where("email", "==", email)
  );

  const snapshot = await getDocs(q);

  // If no user found
  if (snapshot.empty) {
    return null;
  }

  // Get first matching user document
  const userDoc = snapshot.docs[0];

  // Return structured user object
  return {
    id: userDoc.id,
    ...userDoc.data()
  };
};