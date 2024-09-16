import { useState, useEffect } from 'react';
import './App.css';
import MyBigCalendar from './components/MyBigCalendar/MyBigCalendar';
import Chat from './components/Chat/Chat';
import Locations from './components/Locations/Locations';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import UserProfile from './components/UserProfile/UserProfile';
import NavMenu from './components/NavMenu/NavMenu';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { fetchUserProfile } from './firebaseFunctions';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userProfile, setUserProfile] = useState(null);

	useEffect(() => {
		// Nasłuchuj zmian w stanie zalogowania użytkownika
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				setIsLoggedIn(true);
				const profileData = await fetchUserProfile(user.uid);
				setUserProfile(profileData);
			} else {
				setIsLoggedIn(false);
				setUserProfile(null);
			}
		});

		return () => unsubscribe();
	}, []);

	return (
		<Router>
			<div className="App">
				{!isLoggedIn ? (
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="*" element={<Navigate to="/login" />} />
					</Routes>
				) : (
					<>
						<NavMenu />
						<Routes>
							<Route path="/profile" element={<Profile />} />
							<Route path="/calendar" element={<MyBigCalendar />} />
							<Route path="/locations" element={<Locations />} />
							<Route path="/user-profile" element={<UserProfile profile={userProfile} />} />
							<Route path="/" element={<Chat />} />
							<Route path="*" element={<Navigate to="/" />} />
						</Routes>
					</>
				)}
			</div>
		</Router>
	);
}

export default App;
