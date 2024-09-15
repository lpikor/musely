import { useState, useEffect } from 'react';
import './App.css';
import MyBigCalendar from './components/MyBigCalendar/MyBigCalendar';
import Chat from './components/Chat/Chat';
import Locations from './components/Locations/Locations';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Logout from './components/Logout/Logout';
import UserProfile from './components/UserProfile/UserProfile';
import NavMenu from './components/NavMenu/NavMenu';
import { auth } from './firebaseConfig'; 
import { onAuthStateChanged } from 'firebase/auth';
import { fetchUserProfile } from './firebaseFunctions';

// Importuj elementy React Router
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    // Nasłuchuj zmian w stanie zalogowania użytkownika
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Użytkownik jest zalogowany
        setIsLoggedIn(true);

        // Pobierz dane profilu użytkownika z Firestore
        const profileData = await fetchUserProfile(user.uid);
        setUserProfile(profileData);
      } else {
        // Użytkownik nie jest zalogowany
        setIsLoggedIn(false);
        setUserProfile(null);
      }
    });

    // Czyszczenie nasłuchiwania
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Jeśli użytkownik nie jest zalogowany, wyświetl ekran logowania/rejestracji */}
        {!isLoggedIn ? (
          <>
            {showLogin ? (
              <Login onSwitchToRegister={() => setShowLogin(false)} />
            ) : (
              <Register onSwitchToRegister={() => setShowLogin(true)} />
            )}
          </>
        ) : (
          // Jeśli użytkownik jest zalogowany, wyświetl resztę aplikacji
          <>
            <NavMenu />
            <Logout />
            <Routes>
              <Route path="/profile" element={<Profile />} />
              <Route path="/calendar" element={<MyBigCalendar />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/user-profile" element={<UserProfile profile={userProfile} />} />
              {/* Domyślna trasa na stronę główną */}
              <Route path="/" element={<Chat />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
