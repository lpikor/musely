import { getAuth, signOut } from "firebase/auth";
import '../../firebaseConfig';

const Logout = () => {
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
