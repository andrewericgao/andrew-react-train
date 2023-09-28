import React from 'react';
import { signInWithGoogle, firebaseSignOut, useAuthState } from '/src/firebase.js'; // Add this import

const Banner = ({ title }) => {
  const [user] = useAuthState();
  return (
    <div className="banner-container">
      <h1>{title}</h1>
      {user ? (
        <button className="google-signin-btn" onClick={firebaseSignOut}>Sign out</button>
      ) : (
        <button className="google-signin-btn" onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
};

export default Banner;