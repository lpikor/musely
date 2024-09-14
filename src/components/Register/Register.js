import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig';
import { useState } from "react";
import Logo from '../Logo/Logo';

const Register = ({ onSwitchToRegister }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [role, setRole] = useState("musician"); // Domyślna wartość

	const handleRegister = async (e) => {
		e.preventDefault();
		const auth = getAuth();

		try {
			// Rejestracja w Firebase Authentication
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;

			// Tworzenie profilu użytkownika w Firestore
			await setDoc(doc(db, "users", user.uid), {
				firstName,
				lastName,
				role,
				email: user.email,
				uid: user.uid
			});

			console.log("User profile created!");
		} catch (error) {
			console.error("Error creating user:", error);
		}
	};

	return (
		<div className="register">
			<Logo />
			<form onSubmit={handleRegister}>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
					required
				/>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					required
				/>
				<input
					type="text"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					placeholder="First Name"
					required
				/>
				<input
					type="text"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					placeholder="Last Name"
					required
				/>
				<select value={role} onChange={(e) => setRole(e.target.value)}>
					<option value="musician">Musician</option>
					<option value="organizer">Organizer</option>
					<option value="venueOwner">Venue Owner</option>
				</select>
				<button type="submit">Register</button>
			</form>
			<p className="footnote">
				Already have an account? 
				<span onClick={onSwitchToRegister} style={{ cursor: 'pointer', color: 'blue' }}> Login</span>
			</p>
		</div>
	);
};

export default Register;
