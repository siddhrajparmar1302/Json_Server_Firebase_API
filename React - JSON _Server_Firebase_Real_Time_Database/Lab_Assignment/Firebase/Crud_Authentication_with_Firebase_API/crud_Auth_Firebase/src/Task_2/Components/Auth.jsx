import React, { useState } from "react";
import { auth } from "../../firebase_config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(true);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("User registered successfully!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in successfully!");
        navigate("/crud"); // 👈 Redirect user to CRUD page after login
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>{isRegistering ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">{isRegistering ? "Register" : "Login"}</button>
      </form>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "Already have an account? Login" : "New here? Register"}
      </button>
    </div>
  );
};

export default Auth;
