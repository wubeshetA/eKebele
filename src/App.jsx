import React, { useState } from 'react';
import NotifierBar from './components/NotifierBar';
import NavBar from './components/NavBar';
import BannerSection from './components/BannerSection';
import Footer from './components/Footer';
import ServicesSection from './components/ServicesSection';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';

const App = () => {
  const [showNotifier, setShowNotifier] = useState(true);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Display Notifier Bar with a news message */}
        {showNotifier && (
          <NotifierBar
            message="This is an important update for all users."
            isVisible={showNotifier}
            setIsVisible={setShowNotifier}
          />
        )}

        {/* Navigation Bar */}
        <div id='nav-id' className={`sticky top-0 z-10 ${showNotifier ? 'mt-10' : 'mt-0'}`}>
          <NavBar />
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          <Routes>
            {/* Home Route */}
            <Route
              path="/home"
              element={
                <div id="body-id">
                  <BannerSection />
                  <ServicesSection />
                </div>
              }
            />
            {/* Sign Up Route */}
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
