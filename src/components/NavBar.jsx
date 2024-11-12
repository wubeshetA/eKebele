import React, { useState, useEffect, useRef } from 'react';
import { FiLogIn, FiSearch, FiChevronDown, FiHelpCircle, FiUserPlus, FiUser, FiLogOut } from 'react-icons/fi'; 
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import eKebeleLogo from '../assets/EKEBELE.svg';
import en from '../assets/gb.svg';
import am from '../assets/et.svg';
import { userLogged } from '../utils';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import Popup from './Popup';
import api from '../api/api';
import SpinnerLoading from './SpinnerLoading';

const NavBar = () => {
  const { t } = useTranslation();
  const [popupData, setPopupData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // For mobile menu
  const [isLanguageOpen, setIsLanguageOpen] = useState(false); // For language dropdown
  const [language, setLanguage] = useState("English"); 
  const [isSearchOpen, setIsSearchOpen] = useState(false); // For search bar visibility
  const [searchQuery, setSearchQuery] = useState(''); // For search input value
  const [isScrolled, setIsScrolled] = useState(false); // For tracking scroll position
  const searchBarRef = useRef(null); // To track clicks outside of search bar
  const showNotifier = useSelector((state) => state.notifier.showNotifier);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng') || 'en';
    const languageName = savedLanguage === 'en' ? 'English' : 'አማርኛ';
    setLanguage(languageName);
    i18next.changeLanguage(savedLanguage); 
  }, []);

  
  const toggleLanguage = (lang) => {
    if (lang === 'en') {
      setLanguage(t('english'));
    }
    else if (lang === 'am') {
      setLanguage(t('amharic'));
    }
    setIsLanguageOpen(false);
    i18next.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
  };

  const handleSearchClick = async () => {
    if (searchQuery.trim()) {
      setIsLoading(true); // Show spinner when search starts
      try {
        const response = await api.get(`/api/vital-events/applications/${searchQuery}/`);
        setPopupData(response.data); // Show data in pop-up
      } catch (error) {
        console.error('Error fetching application:', error);
        alert('Application not found');
      } finally {
        setIsLoading(false); // Hide spinner when request completes
      }
    }
  };

  const closePopup = () => setPopupData(null);
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchClick(); // Trigger search on "Enter" key press
    }
  };

  // Handle clicks outside of the search bar to collapse it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
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
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`sticky top-0 z-20 ${showNotifier ? 'mt-10' : 'mt-0'} bg-primary-dark text-white font-sans fixed w-full transition-shadow duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img className="w-24" src={eKebeleLogo} alt="Logo" />
            </Link>
          </div>

          {/* Links for larger screens */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Support Center Link */}
            <Link to="/support-center" className="flex items-center text-white hover:text-gray-300">
              <FiHelpCircle className="w-5 h-5 mr-2" />
              {t('support-center')}
            </Link>

            {!userLogged() ? (
              <>
                {/* Sign Up Link */}
                <Link to="/sign-up" className="flex items-center text-white hover:text-gray-300">
                  <FiUserPlus className="w-5 h-5 mr-2" />
                  {t('sign-up')}
                </Link>

                {/* Log In Button */}
                <Link to="/login" className="flex items-center text-white hover:text-gray-300">
                  <FiLogIn className="w-5 h-5 mr-2" />
                  {t('log-in')}
                </Link>
              </>
            ) : <></>}

            {/* Find Application Button */}
            <div className="flex items-center" ref={searchBarRef}>
              {isSearchOpen && (
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-gray-900 px-3 py-1 border border-gray-300 rounded-md w-48 sm:w-64 md:w-72 focus:outline-none focus:ring-2 focus:ring-green-400 mr-2 transition-width duration-200"
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
                <FiSearch className="w-5 h-5 mr-2 " />
                {isSearchOpen ? t('search') : t('find-application')}
              </button>
            </div>

            {/* Language Switcher */}
            <div className="relative">
              <button
                className="flex items-center text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              >
                <img
                  src={language === 'English' ? en : am}
                  alt={language}
                  className="w-5 h-5 mr-2 rounded-full"
                />
                {language}
                <FiChevronDown className="w-4 h-4 ml-1" />
              </button>

              {/* Dropdown */}
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu">
                    <button
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                      onClick={() => toggleLanguage('en')}
                    >
                      <img src={en} alt="English" className="w-5 h-5 mr-2 rounded-full" />
                      {t('english')}
                    </button>
                    <button
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                      onClick={() => toggleLanguage('am')}
                    >
                      <img src={am} alt="Amharic" className="w-5 h-5 mr-2 rounded-full" />
                      {t('amharic')}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {userLogged() && 
              // Avatar with User's Initial (assuming user's initial is W for now)
              <Link to="/profile" className="flex items-center">
                <div className="bg-white text-primary-dark w-8 h-8 flex items-center justify-center rounded-full">
                  W
                </div>
              </Link>
          }
          </div>

          {/* Hamburger Menu for small screens */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
            <Link to="/support-center" className="flex items-center text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium">
              <FiHelpCircle className="w-5 h-5 mr-2" />
              {t('support-center')}
            </Link>

            {!userLogged() ? (
              <>
                <Link to="/sign-up" className="flex items-center text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium">
                  <FiUserPlus className="w-5 h-5 mr-2" />
                  {t('sign-up')}
                </Link>

                <Link to="/login" className="flex items-center text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium">
                  <FiLogIn className="w-5 h-5 mr-2" />
                  {t('log-in')}
                </Link>
              </>
            ) : <></>}

            {userLogged() && <Link to="/profile" className="flex items-center text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium">
              <FiUser className="w-5 h-5 mr-2" />
              Profile
            </Link> }

            { userLogged() &&
            <button className="flex items-center text-white hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium">
              <FiLogOut className="w-5 h-5 mr-2" />
              Logout
            </button>  }
            

            {/* find applciaiton button */}

            <div className="flex items-center" ref={searchBarRef}>
              {isSearchOpen ? (
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-gray-900 px-3 py-1 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-400 mb-2"
                  placeholder="Search for application..."
                  onKeyDown={handleKeyPress} // Trigger search on Enter key press
                />
              ) : (
                <button
                  type="button"
                  className="flex items-center bg-primary text-white hover:bg-primary-light px-4 py-2 rounded-md w-full"
                  onClick={() => setIsSearchOpen(true)} // Show input and hide button
                >
                  <FiSearch className="w-5 h-5 mr-2" />
                  {t('find-application')}
                </button>
              )}
            </div>

            
          </div>
        </div>
      )}

{isLoading && <SpinnerLoading />}

  {popupData && <Popup data={popupData} onClose={closePopup} />}
    </nav>
  );
};

export default NavBar;
