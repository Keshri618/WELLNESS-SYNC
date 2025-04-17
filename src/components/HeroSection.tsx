"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Shield, BarChart3 } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 pt-24 md:pt-28">
      {/* Main Hero Content */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Content - Text */}
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              Your Path to <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">Wellness</span> Starts Here
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Achieve balance and harmony with personalized wellness tracking, insights, and guidance. Your journey to better health begins now.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/signup" className="inline-block">
                <button className="flex items-center px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  Get Started Free
                  <ArrowRight size={18} className="ml-2" />
                </button>
              </Link>
              <Link href="/about" className="inline-block">
                <button className="flex items-center px-8 py-3 bg-white text-gray-700 font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  Learn More
                </button>
              </Link>
            </div>
            
            {/* Featured Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                  <Sparkles size={18} className="text-teal-500" />
                </div>
                <p className="font-medium text-gray-700">Personalized Plans</p>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <Shield size={18} className="text-blue-500" />
                </div>
                <p className="font-medium text-gray-700">Data Privacy</p>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <BarChart3 size={18} className="text-purple-500" />
                </div>
                <p className="font-medium text-gray-700">Progress Tracking</p>
              </div>
            </div>
          </div>
          
          {/* Right Content - Image */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Hero Image Frame */}
              <div className="relative z-10 bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* This would be replaced with your actual hero image */}
                <div className="aspect-w-4 aspect-h-5 w-full bg-gradient-to-br from-teal-400/20 to-blue-400/20 rounded-xl">
                  <div className="flex items-center justify-center p-6 h-full">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-teal-300 to-blue-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-6xl font-bold">W</span>
                      </div>
                      <div className="mb-4 bg-white/70 backdrop-blur-sm rounded-lg py-3 px-6 shadow-sm">
                        <div className="h-4 w-32 mx-auto bg-gradient-to-r from-teal-200 to-blue-200 rounded-full"></div>
                      </div>
                      <div className="flex justify-center space-x-2">
                        <div className="h-20 w-12 bg-teal-100 rounded-lg"></div>
                        <div className="h-20 w-12 bg-blue-100 rounded-lg"></div>
                        <div className="h-20 w-12 bg-purple-100 rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-6 -left-6 w-24 h-24 bg-yellow-200 rounded-full opacity-70 blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-teal-300 rounded-full opacity-70 blur-xl"></div>
              <div className="absolute top-1/3 -right-8 w-16 h-16 bg-blue-300 rounded-full opacity-70 blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave Separator */}
      <div className="relative h-24 md:h-36 overflow-hidden">
        <svg className="absolute bottom-0 w-full text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0H0V0z" className="fill-white"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;