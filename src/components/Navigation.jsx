import React from 'react';
import { NavLink } from 'react-router-dom';
import { signInWithGoogle, firebaseSignOut as signOut, useAuthState } from '/src/firebase.js';

const SignInButton = () => (
  <button className="ms-auto btn btn-dark" onClick={signInWithGoogle}>Sign in</button>
);

const SignOutButton = () => (
  <button className="ms-auto btn btn-dark" onClick={signOut}>Sign out</button>
);

const AuthButton = () => {
  const [user] = useAuthState();
  return user ? <SignOutButton /> : <SignInButton />;
};

const activation = ({isActive}) => isActive ? 'active' : 'inactive';

const Navigation = () => (
  <nav className="d-flex justify-content-between align-items-center">
    <div>
      <NavLink to="/" className={activation} end>Posts</NavLink>
      <NavLink to="/users" className={activation} end>Users</NavLink>
    </div>
    <AuthButton />
  </nav>
);

export default Navigation;
