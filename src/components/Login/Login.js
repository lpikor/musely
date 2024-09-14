import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import '../../firebaseConfig';
import { useState } from "react";
import Logo from '../Logo/Logo';

const Login = ({ onSwitchToRegister }) => {  // Przekazujemy props
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User logged in:", userCredential.user);
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  return (
    <div className="login">
      <Logo />
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      <p className="footnote">
        Don't have an account? 
        <span onClick={onSwitchToRegister} style={{ cursor: 'pointer', color: 'blue' }}> Sign up</span>
      </p>
    </div>
  );
};

export default Login;
