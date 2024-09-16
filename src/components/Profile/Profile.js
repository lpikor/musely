import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import Logout from "../Logout/Logout";

const Profile = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <div>
      <Logout />
      {user ? <p>Logged in as {user.email}</p> : <p>No user logged in</p>}
    </div>
  );
};

export default Profile;
