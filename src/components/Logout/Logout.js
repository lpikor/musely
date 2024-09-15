import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Importuj useNavigate
import '../../firebaseConfig';

const Logout = () => {
  const auth = getAuth();
  const navigate = useNavigate(); // Użyj hooka useNavigate

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out");
        navigate("/"); // Przekierowanie do ścieżki "/"
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
