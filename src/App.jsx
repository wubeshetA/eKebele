import React from 'react';
import NotifierBar from './components/NotifierBar';
import NavBar from './components/NavBar';
import BannerSection from './components/BannerSection';
import Footer from './components/Footer';
import ServicesSection from './components/ServicesSection';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import ServiceNotAvailable from './pages/ServiceNotAvaliable'; // Import the Service Not Available page
import Dashboard from './pages/vital_events/Dashbaord';

import ProtectedRoute from './components/ProtectedRoute';
import { REFRESH_TOKEN, ACCESS_TOKEN } from "./constants";

import BirthCertificateForm from './pages/vital_events/BirthCertificateForm';
import LoginPage from './pages/LoginPage'; // Changed from LoginModal to LoginPage
import PageNotFound from './pages/PageNotFound';
import ProfilePage from './pages/Profile';
import SupportPage from './pages/SupportPage';
import FAQSection from './pages/FAQ';
import BirthCertificateDetail from './pages/vital_events/BirthCertificateDetail';

function Logout () {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
  return <Navigate to="/" />;
}

const App = () => {
  return (
    <Router>
      <div className="flex flex-col" style={{ height: '100vh' }}>
        {/* Display Notifier Bar with a news message */}
        <NotifierBar message="This is an important update for all users." />

        {/* Navigation Bar */}
        <NavBar />

        {/* Main Content */}
        <div className="flex-grow">
          <Routes>
            {/* Protected Route for Dashboard */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />

            {/* Route for Birth Certificate Form */}
            <Route path="/services/apply-birth-certificate" element={<BirthCertificateForm />} />
            <Route path="/services/vital-events/:id" element={<BirthCertificateDetail />} />

            {/* Home Route */}
            <Route
              path="/"
              element={
                <div id="body-id">
                  <BannerSection />
                  <ServicesSection />
                  <FAQSection />
                </div>
              }
            />

            {/* Sign Up Route */}
            <Route path="/sign-up" element={<Register />} />

            {/* Login Page Route */}
            <Route path='/login' element={<LoginPage />} /> {/* Changed from LoginModal to LoginPage */}

            {/* Service Not Available Route */}
            <Route path="/service-not-available" element={<ServiceNotAvailable />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/support-center" element={<SupportPage />} />
            
            <Route path='/profile' element={<ProtectedRoute>
                 <ProfilePage />
                </ProtectedRoute>} />

            {/* Wildcard Route for 404 Page */}
            <Route path="*" element={<PageNotFound />} /> {/* Changed to JSX element */}

          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
