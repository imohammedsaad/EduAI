import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 backdrop-blur-md bg-black/20">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400 hover:text-white/80 transition-colors">
            © {new Date().getFullYear()} EduAI. All rights reserved.
          </p>
          <div className="flex items-center space-x-8">
            <Link 
              to="/terms" 
              className="text-sm text-gray-400 hover:text-white transition-all duration-200 hover:scale-105 transform"
            >
              Terms of Service
            </Link>
            <Link 
              to="/privacy" 
              className="text-sm text-gray-400 hover:text-white transition-all duration-200 hover:scale-105 transform"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 