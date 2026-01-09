import React, { useState, useContext } from 'react';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../lib/firebase';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const auth = getAuth(app);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      userContext?.setUser({ uid: userCredential.user.uid, email: userCredential.user.email });
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      userContext?.setUser({ uid: result.user.uid, email: result.user.email });
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleGitHubSignIn = async () => {
    setError(null);
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      userContext?.setUser({ uid: result.user.uid, email: result.user.email });
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleEmailSignIn}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <div>
        <button onClick={handleGoogleSignIn}>Sign in with Google</button>
        <button onClick={handleGitHubSignIn}>Sign in with GitHub</button>
      </div>
    </div>
  );
};

export default SignIn;
