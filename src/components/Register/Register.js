import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Register.css';

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [role, setRole] = useState("musician");
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();
		const auth = getAuth();

		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;

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
				<button className="button" type="submit">Sign up</button>
			</form>
			<p className="footnote">
				Already have an account?
				<span onClick={() => navigate('/login')} style={{ cursor: 'pointer', color: 'blue' }}> Sign in</span>
			</p>
		</div>
	);
};

export default Register;
