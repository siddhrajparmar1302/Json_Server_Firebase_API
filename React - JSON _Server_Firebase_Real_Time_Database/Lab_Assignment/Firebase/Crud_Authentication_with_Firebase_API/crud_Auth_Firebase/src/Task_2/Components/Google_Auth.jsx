import React, { useState, useEffect } from "react";
import { auth, provider, signInWithPopup, signOut } from "../../firebase_config";
import { useNavigate } from "react-router-dom";

const GoogleAuth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      navigate("/crud"); // Redirect if user is already logged in
    }
  }, [navigate]);

  // ✅ Google Sign-In
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      localStorage.setItem("user", JSON.stringify(result.user)); // ✅ Store user in localStorage
      alert("Login Successful!");
      navigate("/crud"); // Redirect to CRUD Page
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <div className="p-5 text-center">
      <h2>Google Authentication</h2>
      {user ? (
        <p>Redirecting...</p> // Show a message while redirecting
      ) : (
        <button onClick={handleGoogleLogin}>Sign in with Google</button>
      )}
    </div>
  );
};

export default GoogleAuth;



