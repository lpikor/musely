import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { fetchUserProfile } from '../../firebaseFunctions'; // Funkcja do pobierania profilu

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true); // Zmienna do śledzenia stanu ładowania
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Użytkownik jest zalogowany, pobieramy profil
        const userProfile = await fetchUserProfile(user.uid);
        setProfile(userProfile);
      }
      setLoading(false); // Przestajemy ładować, gdy stan logowania się ustali
    });

    // Zwróć funkcję czyszczącą, aby usunąć listener przy odmontowaniu komponentu
    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!profile) {
    return <p>No profile found or user not logged in</p>;
  }

  return (
    <div>
      <h1>{profile.firstName} {profile.lastName}</h1>
      <p>Rola: {profile.role}</p>
      <p>Email: {profile.email}</p>
    </div>
  );
};

export default UserProfile;
