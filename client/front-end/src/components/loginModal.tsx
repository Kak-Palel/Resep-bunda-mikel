import { useState } from "react";
import { useUserContext } from "./UserContext";

import getApiUrl from "../constants/config";

const API_URL = getApiUrl();

const SIGNUP_ROUTE = `${API_URL}/api/user/register`;
const LOGIN_ROUTE = `${API_URL}/api/user/login`;

function LoginModal({
  onLoginSuccess,
}: {
  onLoginSuccess: (email: string, token: string) => void;
}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const { setUser, setToken } = useUserContext();

  const handleAuthentication = async (url: string, body: object) => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "An error occurred");

    return data;
  };

  const handleSubmit = async () => {
    try {
      const data = isSignUp
        ? await handleAuthentication(SIGNUP_ROUTE, {
            username,
            email,
            password,
          })
        : await handleAuthentication(LOGIN_ROUTE, { email, password });

      const { token, user } = data;
      if (!token || !user) throw new Error("Invalid server response");

      // Update global context
      setToken(token);
      setUser(user);

      // Persist in localStorage
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert(isSignUp ? "Sign-up successful!" : "Login successful!");
      onLoginSuccess(email, token); // Notify parent component
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <div className="p-4">
      {isSignUp && (
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="block w-full mb-2 p-2 border border-gray-300 rounded"
        />
      )}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="block w-full mb-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        className="block w-full mb-2 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleSubmit}
        className="w-full p-2 bg-orange text-white rounded hover:bg-light_orange"
      >
        {isSignUp ? "Sign Up" : "Login"}
      </button>
      <button
        onClick={() => setIsSignUp(!isSignUp)}
        className="w-full mt-2 p-2 border border-gray-300 rounded hover:bg-gray-100"
      >
        {isSignUp ? "Switch to Login" : "Switch to Sign Up"}
      </button>
    </div>
  );
}

export default LoginModal;
