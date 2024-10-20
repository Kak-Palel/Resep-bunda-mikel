import { useState } from 'react';

const SIGNUP_ROUTE = "http://localhost:8080/api/user/register";
const LOGIN_ROUTE = "http://localhost:8080/api/user/login";

async function signUpUser(username: string, email: string, password: string) {
  try {
    const response = await fetch(SIGNUP_ROUTE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    const token = data.token; // Assuming the API returns a token field in the response
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('email', email);

    return token;
  } catch (error) {
    alert((error as Error).message);
    return null;
  }
}

async function loginUser(email: string, password: string) {
  try {
    const response = await fetch(LOGIN_ROUTE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.status !== 200) {
      throw new Error(data.message  || 'An error occurred');
      alert(response.status);
    }

    const token = data.token; // Assuming the API returns a token field in the response
    alert(response.status);
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('email', email);

    return token;
  } catch (error) {
    alert((error as Error).message);
  }
}

function LoginModal({ onLoginSuccess }: { onLoginSuccess: (email: string, token: string) => void }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogin = async () => {
    try {
      var token = '';
      if (isSignUp) {
        // await createUserWithEmailAndPassword(auth, email, password);
        token = await signUpUser(username, email, password);
        alert('Sign-up successful!');
      } else {
        // await signInWithEmailAndPassword(auth, email, password);
        token = await loginUser(email, password);
      }
      onLoginSuccess(email, token); // Pass email to parent component
    } catch (error) {
      alert((error as Error).message);
    }
  };

  if(!isSignUp) {
    return (
      <div className="p-4">
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
          onClick={handleLogin}
          className="w-full p-2 bg-orange text-white rounded hover:bg-light_orange"
        >
          Login
        </button>
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full mt-2 p-2 border border-gray-300 rounded hover:bg-gray-100"
        >
          {'Switch to Sign Up'}
        </button>
      </div>
    );
  }
  else {
    return (
      <div className="p-4">
        <input
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="block w-full mb-2 p-2 border border-gray-300 rounded"
        />
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
          onClick={handleLogin}
          className="w-full p-2 bg-orange text-white rounded hover:bg-light_orange"
        >
          Sign Up
        </button>
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full mt-2 p-2 border border-gray-300 rounded hover:bg-gray-100"
        >
          {'Switch to Login'}
        </button>
      </div>
    );
  }
}

export default LoginModal;
