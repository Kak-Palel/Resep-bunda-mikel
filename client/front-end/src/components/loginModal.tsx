import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig.js';

function LoginModal({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogin = async () => {
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Sign-up successful!');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Login successful!');
      }
      onLoginSuccess(email); // Pass email to parent component
    } catch (error) {
      alert(error.message);
    }
  };

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
        {isSignUp ? 'Sign Up' : 'Login'}
      </button>
      <button
        onClick={() => setIsSignUp(!isSignUp)}
        className="w-full mt-2 p-2 border border-gray-300 rounded hover:bg-gray-100"
      >
        {isSignUp ? 'Switch to Login' : 'Switch to Sign Up'}
      </button>
    </div>
  );
}

export default LoginModal;
