
import React, { useEffect, useState } from 'react';
import "./Navbar.css";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logged out successfully!');
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/home', icon: '⌂' },
    { name: 'Journal', path: '/blogs', icon: '✎' },
  ];

  return (
    <header className="relative z-20 bg-[#f5dce5] border-b-2 border-[#d8b1bd]">
      <div className="max-w-6xl mx-auto px-4 md:px-7">

        {/* Brand */}
        <div className="flex justify-between items-center py-4">
          <Link to="/home" className="group">
            <p className="text-xs tracking-[0.25em] uppercase text-[#a66d83]">
              ✿ welcome to my space ✿
            </p>
            <h1 className="text-3xl md:text-4xl font-bold italic text-[#a65e7d] group-hover:text-[#71856b] transition">
              Personal<span className="text-[#71856b]">.</span>
            </h1>
          </Link>

          <div className="text-right">
            <p className="text-xs text-[#98717e]">
              A little corner of the internet
            </p>
            <p className="text-lg text-[#b77b91]">♡ ✧ ♡</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center sm:justify-between items-center gap-3 border-t border-dashed border-[#cb9eae] py-3">

          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm transition ${location.pathname === link.path
                    ? 'bg-[#a65e7d] text-white shadow-sm'
                    : 'text-[#815968] hover:bg-[#fff5f0]'
                  }`}
              >
                <span className="mr-1">{link.icon}</span>
                {link.name}
              </Link>
            ))}

            <Link
              to="/home#about"
              className="px-4 py-2 rounded-full text-sm text-[#815968] hover:bg-[#fff5f0] transition"
            >
              ♡ About
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <span className="hidden md:block text-xs text-[#98717e]">
                Hello, {user.email?.split('@')[0]} ♡
              </span>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="bg-[#71856b] hover:bg-[#596e53] text-white px-5 py-2 rounded-full text-sm transition shadow-sm"
              >
                Logout ↗
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-[#a65e7d] hover:bg-[#815968] text-white px-5 py-2 rounded-full text-sm transition shadow-sm"
              >
                Login ♡
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
