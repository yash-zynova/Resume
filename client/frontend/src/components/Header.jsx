import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  // Initialize user info from localStorage
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('userInfo'));
      setUserInfo(storedUser);
    } catch (error) {
      console.error('Failed to parse userInfo from localStorage', error);
      setUserInfo(null);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
    navigate('/login');
  };

  return (
    <header className="bg-blue-700 text-white p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Resume Builder
        </Link>
        <nav>
          {userInfo ? (
            <>
              <span className="mr-4">Hi, {userInfo.name}</span>
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
