import React from 'react';
import { signInWithGoogle, firebaseSignOut, useAuthState } from '/src/firebase.js';

const Banner = ({ title }) => {
  const [user] = useAuthState();
  return (
    <div className="banner-container">
      <div className="title-container">
        <h1>{title}</h1>
        <p className="small-text">Please unselect the courses you have selected for this term before switching to another term.</p>
      </div>
      {user ? (
        <button className="google-signin-btn" onClick={firebaseSignOut}>Sign out</button>
      ) : (
        <button className="google-signin-btn" onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
};

export default Banner;