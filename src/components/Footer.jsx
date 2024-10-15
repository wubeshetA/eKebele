import React from 'react';
import { FiLinkedin, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-primary-dark text-white py-8">
      <div className="container mx-auto text-center flex justify-center space-x-4">
        <div className="flex justify-center space-x-4 mb-4">
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <FiLinkedin className="w-6 h-6" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <FiTwitter className="w-6 h-6" />
          </a>
        </div>
        <div className="flex justify-center space-x-4">
          <p>&copy; 2024 eKebele. All rights reserved.</p>
          <a href="/terms-of-use" className="hover:text-gray-300">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;