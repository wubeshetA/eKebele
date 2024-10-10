import React, { useState, useEffect, useRef } from 'react';
import { FiLogIn, FiSearch, FiChevronDown, FiHelpCircle, FiUserPlus } from 'react-icons/fi'; 
import { Link } from 'react-router-dom';
import eKebeleLogo from '../assets/EKEBELE.svg';
import en from '../assets/gb.svg';
import am from '../assets/et.svg';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false); // For mobile menu
  const [isLanguageOpen, setIsLanguageOpen] = useState(false); // For language dropdown
  const [language, setLanguage] = useState('English'); // Default language
  const [isSearchOpen, setIsSearchOpen] = useState(false); // For search bar visibility
  const [searchQuery, setSearchQuery] = useState(''); // For search input value
  const [isScrolled, setIsScrolled] = useState(false); // For tracking scroll position
  const searchBarRef = useRef(null); // To track clicks outside of search bar

  const toggleLanguage = (lang) => {
    setLanguage(lang);
    setIsLanguageOpen(false); // Close dropdown after selection
  };

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      // console.log(Searching for: ${searchQuery}); // Replace this with the actual search functionality
    }
  };

  // Handle clicks outside of the search bar to collapse it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    // Add event listener for clicks
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle scroll event to add shadow to navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add event listener for scroll
    window.addEventListener('scroll', handleScroll);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`bg-primary-dark text-white font-sans fixed w-full z-10 transition-shadow duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/home">
              <img className="w-24" src={eKebeleLogo} alt="Logo" />
            </Link>
          </div>

          {/* Links for larger screens */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Support Center Link */}
            <a href="/support-center" className="flex items-center text-white hover:text-gray-300">
              <FiHelpCircle className="w-5 h-5 mr-2" /> {/* Question Mark Icon */}
              Support Center
            </a>

            {/* Sign Up Link */}
            <Link to="/sign-up" className="flex items-center text-white hover:text-gray-300">
              <FiUserPlus className="w-5 h-5 mr-2" /> {/* Person with Plus Icon */}
              Sign Up
            </Link>

            {/* Log In Button */}
            <button type="button" className="btn btn-navbar auth-nav mr-3 flex items-center text-white">
              <FiLogIn className="w-5 h-5 mr-2" /> {/* Log In Icon */}
              Log In
            </button>

            {/* Find Application Button */}
            <div className="flex items-center" ref={searchBarRef}>
              {isSearchOpen && (
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md w-48 sm:w-64 md:w-72 focus:outline-none focus:ring-2 focus:ring-green-400 mr-2 transition-width duration-200"
                  placeholder="Search for application..."
                />
              )}
              <button
                type="button"
                className="flex items-center bg-primary text-white hover:bg-primary-light px-4 py-2 rounded-md"
                onClick={() => {
                  if (!isSearchOpen) {
                    setIsSearchOpen(true); // Open search bar
                  } else {
                    handleSearchClick(); // Perform search action
                  }
                }}
              >
                <FiSearch className="w-5 h-5 mr-2" /> {/* React Icons */}
                {isSearchOpen ? 'Search' : 'Find Application'}
              </button>
            </div>

            {/* Language Switcher */}
            <div className="relative">
              <button
                className="flex items-center text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              >
                <img
                  src={
                    language === 'English'
                      ? { en }
                      : { et }
                  }
                  alt={language}
                  className="w-5 h-5 mr-2"
                />
                {language}
                <FiChevronDown className="w-4 h-4 ml-1" /> {/* Dropdown Icon */}
              </button>

              {/* Dropdown */}
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu">
                    <button
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                      onClick={() => toggleLanguage('English')}
                    >
                      <img
                        src="/path-to-britain-flag.png"
                        alt="English"
                        className="w-5 h-5 mr-2"
                      />
                      English
                    </button>
                    <button
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                      onClick={() => toggleLanguage('Amharic')}
                    >
                      <img
                        src="/path-to-ethiopia-flag.png"
                        alt="Amharic"
                        className="w-5 h-5 mr-2"
                      />
                      Amharic
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Hamburger Menu for small screens */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Support Center Link (Mobile) */}
            <a href="/support-center" className="flex items-center text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium">
              <FiHelpCircle className="w-5 h-5 mr-2" />
              Support Center
            </a>

            {/* Sign Up Link (Mobile) */}
            <Link to="/sign-up" className="flex items-center text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium">
              <FiUserPlus className="w-5 h-5 mr-2" />
              Sign Up
            </Link>

            {/* Log In Button (Mobile) */}
            <button className="flex items-center text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium">
              <FiLogIn className="w-5 h-5 mr-2" />
              Log In
            </button>

            {/* Find Application Button (Mobile) */}
            <button className="flex items-center text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium">
              <FiSearch className="w-5 h-5 mr-2" />
              Find Application
            </button>

            {/* Language Switcher (Mobile) */}
            <div className="relative">
              <button
                className="flex items-center text-white hover:text-gray-300 px-3 py-2 rounded-md text-base font-medium focus:outline-none"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              >
                <img
                  src={
                    language === 'English'
                      ? '/path-to-britain-flag.png'
                      : '/path-to-ethiopia-flag.png'
                  }
                  alt={language}
                  className="w-5 h-5 mr-2"
                />
                {language}
                <FiChevronDown className="w-4 h-4 ml-1" />
              </button>
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu">
                    <button
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                      onClick={() => toggleLanguage('English')}
                    >
                      <img
                        src="/path-to-britain-flag.png"
                        alt="English"
                        className="w-5 h-5 mr-2"
                      />
                      English
                    </button>
                    <button
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                      onClick={() => toggleLanguage('Amharic')}
                    >
                      <img
                        src="/path-to-ethiopia-flag.png"
                        alt="Amharic"
                        className="w-5 h-5 mr-2"
                      />
                      Amharic
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;