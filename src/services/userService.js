import { db } from "../firebase";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
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

// Upload image to Cloudinary and return the URL
export const uploadProfilePhoto = async (file) => {

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "carpool_profiles"); // your preset
  formData.append("cloud_name", "dbcosvtxe");           // your cloud name

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dbcosvtxe/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

    if (!data.secure_url) {
      throw new Error("Image upload failed");
    }

    return data.secure_url; // this is the image URL we save to Firestore
  };


  // Save photoURL to Firestore user document
  export const updateUserPhoto = async (userId, photoURL) => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { photoURL });
  };

  // fetch multiple user photos by email in one go
  export const getUserPhotos = async (emails) => {
    const uniqueEmails = [...new Set(emails)]; // remove duplicates
    
    const photoMap = {};

    await Promise.all(
      uniqueEmails.map(async (email) => {
        const profile = await getUserProfile(email);
        photoMap[email] = profile?.photoURL || null;
      })
    );

    return photoMap; // { "email@x.com": "https://cloudinary..." }
  };

  // Save phone and gender to Firestore user document
  export const updateUserProfile = async (userId, { phone, gender }) => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { phone, gender });
  };