import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from './firebaseConfig';

const fetchUserProfile = async (userId) => {
  const userRef = doc(db, "users", userId);
  
  try {
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      console.log("User data:", userSnap.data());
      return userSnap.data();
    } else {
      console.log("No such user!");
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
};

const handleUpdateProfile = async (userId, newProfileData) => {
	const userRef = doc(db, "users", userId);
  
	try {
	  await updateDoc(userRef, newProfileData);
	  console.log("Profile updated!");
	} catch (error) {
	  console.error("Error updating profile:", error);
	}
};

export { fetchUserProfile, handleUpdateProfile };