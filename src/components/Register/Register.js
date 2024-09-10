import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig';
import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
	const auth = getAuth();
	const email = "lukaszp@gmail.com";
	const password = "test123";
	const firstName = "John";
	const lastName = "Doe";
	const role = "musician";

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
    <form onSubmit={handleRegister}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
