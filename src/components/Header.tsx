"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Change header style on scroll
  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Dynamic Logo */}
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <div className="relative h-10 w-10 mr-2">
                  <div className={`absolute inset-0 rounded-full ${
                    scrolled ? 'bg-teal-500' : 'bg-teal-400'
                  } transition-all duration-300 flex items-center justify-center`}>
                    <span className="text-white font-bold text-lg">W</span>
                  </div>
                </div>
                <span className={`font-bold text-xl ${
                  scrolled ? 'text-teal-500' : 'text-teal-400'
                } transition-colors duration-300`}>
                  Wellness Sync
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/">
              <span className={`font-medium ${
                scrolled ? 'text-gray-700 hover:text-teal-500' : 'text-gray-800 hover:text-teal-400'
              } cursor-pointer transition-colors`}>
                Home
              </span>
            </Link>
            <Link href="/login">
              <span className={`font-medium ${
                scrolled ? 'text-gray-700 hover:text-teal-500' : 'text-gray-800 hover:text-teal-400'
              } cursor-pointer transition-colors`}>
                Login
              </span>
            </Link>
            <Link href="/signup">
              <span className={`${
                scrolled 
                  ? 'bg-teal-500 hover:bg-teal-600 text-white' 
                  : 'bg-teal-400 hover:bg-teal-500 text-white'
              } px-4 py-2 rounded-md font-medium transition-colors cursor-pointer`}>
                Sign Up
              </span>
            </Link>
            <Link href="/about">
              <span className={`font-medium ${
                scrolled ? 'text-gray-700 hover:text-teal-500' : 'text-gray-800 hover:text-teal-400'
              } cursor-pointer transition-colors`}>
                About
              </span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className={`p-2 rounded-md ${
                scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-800 hover:bg-gray-200'
              }`}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-4">
            <Link href="/">
              <div className="block px-3 py-2 rounded-md hover:bg-gray-100 font-medium">
                Home
              </div>
            </Link>
            <Link href="/login">
              <div className="block px-3 py-2 rounded-md hover:bg-gray-100 font-medium">
                Login
              </div>
            </Link>
            <Link href="/signup">
              <div className="block px-3 py-2 rounded-md bg-teal-500 text-white text-center font-medium">
                Sign Up
              </div>
            </Link>
            <Link href="/about">
              <div className="block px-3 py-2 rounded-md hover:bg-gray-100 font-medium">
                About
              </div>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;