import React from 'react';
import { FiLinkedin, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-primary-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          {/* Logo and Brand */}
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-semibold">eKebele</p>
            <p className="text-sm text-gray-400">Empowering citizens through digital services</p>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="w-6 h-6" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
              aria-label="Twitter"
            >
              <FiTwitter className="w-6 h-6" />
            </a>
          </div>

          {/* Links and Info */}
          <div className="text-sm">
            <p className="mb-2">&copy; 2024 eKebele. All rights reserved.</p>
            <a
              href="/terms-of-use"
              className="hover:text-gray-300 transition-colors"
            >
              Terms of Use
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 border-t border-gray-500"></div>

        {/* Extra Info */}
        <div className="text-center mt-4 text-sm text-gray-400">
          <p>Built with ❤️ for a connected Ethiopia</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
