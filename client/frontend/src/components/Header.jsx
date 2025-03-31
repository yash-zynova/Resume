// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  // Initialize userInfo from localStorage
  const [userInfo, setUserInfo] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('userInfo'));
    } catch (error) {
      console.error("Error parsing userInfo:", error);
      return null;
    }
  });

  // Function to update userInfo from localStorage
  const updateUserInfo = () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('userInfo'));
      setUserInfo(storedUser);
    } catch (error) {
      console.error("Error parsing userInfo:", error);
      setUserInfo(null);
    }
  };

  // Listen for storage events and custom "userInfoUpdated" events
  useEffect(() => {
    window.addEventListener('storage', updateUserInfo);
    window.addEventListener('userInfoUpdated', updateUserInfo);
    return () => {
      window.removeEventListener('storage', updateUserInfo);
      window.removeEventListener('userInfoUpdated', updateUserInfo);
    };
  }, []);

  // Logout handler clears localStorage and dispatches event for immediate update
  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    window.dispatchEvent(new Event('userInfoUpdated'));
    navigate('/login');
  };

  // Determine display name from different potential property structures
  const displayName =
    userInfo?.name ||
    userInfo?.user?.name ||
    userInfo?.username ||
    'User';

  return (
    <header className="bg-blue-700 text-white p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Resume Builder
        </Link>
        <nav>
          {userInfo ? (
            <>
              <span className="mr-4">Hi, {displayName}</span>
              <button onClick={logoutHandler} className="hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4 hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
