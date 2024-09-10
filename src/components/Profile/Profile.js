import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

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
      {user ? <p>Logged in as {user.email}</p> : <p>No user logged in</p>}
    </div>
  );
};

export default Profile;
