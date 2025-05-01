"use client";
import React, { useState, useEffect } from "react";

// Define testimonial type
type Testimonial = {
  id: number;
  name: string;
  role: string;
  rating: number;
  quote: string;
  avatar: string;
};

// Sample testimonial data
const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Sophia Chen",
    role: "Yoga Instructor",
    rating: 5,
    quote: "WellnessSync transformed how I track my clients' progress. The personalized insights have been invaluable!",
    avatar: "/api/placeholder/100/100"
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Fitness Enthusiast",
    rating: 5,
    quote: "I've tried many wellness apps, but nothing compares to the holistic approach of WellnessSync.",
    avatar: "/api/placeholder/100/100"
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Meditation Coach",
    rating: 5,
    quote: "The mindfulness features are exceptional. My clients have seen remarkable improvements in their practice.",
    avatar: "/api/placeholder/100/100"
  },
  {
    id: 4,
    name: "Jordan Taylor",
    role: "Student",
    rating: 4,
    quote: "WellnessSync helped me balance academics and self-care. My stress levels have significantly decreased!",
    avatar: "/api/placeholder/100/100"
  },
  {
    id: 5,
    name: "Elena Rodriguez",
    role: "Nutritionist",
    rating: 5,
    quote: "The dietary tracking features are intuitive and comprehensive. A game-changer for my practice.",
    avatar: "/api/placeholder/100/100"
  }
];

// Star Rating Component with fixed visibility
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? "text-amber-500" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

// Improved Testimonial Card Component with light theme
const TestimonialCard = ({ testimonial, isActive }: { testimonial: Testimonial, isActive: boolean }) => {
  return (
    <div 
      className={`w-full max-w-sm mx-auto bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ${
        isActive ? "border-2 border-blue-400 shadow-xl" : "border border-gray-100"
      }`}
    >
      {/* Enhanced Avatar */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          {/* Avatar Circle with soft glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-200 to-purple-200 opacity-70 blur-md"></div>
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-r from-blue-300 to-purple-300 p-1 shadow-md">
            <div className="w-full h-full rounded-full overflow-hidden bg-white">
              <img 
                src={testimonial.avatar} 
                alt={testimonial.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* User initial badge */}
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold shadow-md border-2 border-white">
            {testimonial.name.charAt(0)}
          </div>
        </div>
      </div>
      
      {/* Name and role with light theme */}
      <div className="text-center mb-4">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg py-2 px-4 mb-2 shadow-sm">
          <h3 className="text-xl font-bold text-gray-800">{testimonial.name}</h3>
        </div>
        <div className="bg-gray-50 rounded-full py-1 px-4 inline-block">
          <p className="text-blue-600 text-sm font-medium">{testimonial.role}</p>
        </div>
      </div>
      
      {/* Rating stars */}
      <div className="flex justify-center mb-4 bg-gray-50 py-2 rounded-full">
        <StarRating rating={testimonial.rating} />
      </div>
      
      {/* Quote with light theme */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 shadow-sm">
        <p className="text-gray-700 italic text-base font-medium">&ldquo;{testimonial.quote}&rdquo;</p>
      </div>
    </div>
  );
};

// Main component with fixes for Next.js
export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const maxIndex = testimonialData.length - 1;
  
  // Safe auto-slide functionality that works in Next.js
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (!isPaused) {
      interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPaused, maxIndex]);
  
  // Fixed navigation function
  const goToTestimonial = (index: number) => {
    if (index < 0) {
      setActiveIndex(maxIndex);
    } else if (index > maxIndex) {
      setActiveIndex(0);
    } else {
      setActiveIndex(index);
    }
  };
  
  // Get visible testimonials for desktop
  const getVisibleTestimonials = () => {
    const visibleCount = 3;
    const result = [];
    
    for (let i = 0; i < visibleCount; i++) {
      const index = (activeIndex + i) % testimonialData.length;
      result.push({
        testimonial: testimonialData[index],
        isActive: i === 0
      });
    }
    
    return result;
  };
  
  return (
    <section className="relative w-full py-16 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-white overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-blue-200 opacity-40 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-purple-200 opacity-40 blur-3xl animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-pink-100 opacity-30 blur-2xl animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/4 w-32 h-32 rounded-full bg-indigo-100 opacity-30 blur-2xl animate-pulse"></div>
      
      <div className="relative max-w-6xl mx-auto">
        {/* Section heading with light styling */}
        <div className="text-center mb-16">
          <div className="inline-block bg-white bg-opacity-80 px-8 py-4 rounded-xl mb-4 shadow-sm">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-4">What Our Users Say</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-300 to-purple-300 mx-auto rounded-full"></div>
          </div>
          <p className="text-gray-600 mt-6 max-w-lg mx-auto text-lg font-medium">
            Discover how WellnessSync is transforming lives with personalized wellness guidance
          </p>
        </div>
        
        {/* Mobile layout (single card) */}
        <div className="md:hidden">
          <div className="px-4">
            <TestimonialCard 
              testimonial={testimonialData[activeIndex]} 
              isActive={true}
            />
          </div>
          
          {/* Mobile navigation dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonialData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeIndex === index 
                    ? "bg-blue-400 w-6" 
                    : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Desktop layout (multiple cards) */}
        <div className="hidden md:block">
          <div className="flex justify-between items-center">
            {/* Previous button */}
            <button 
              onClick={() => goToTestimonial(activeIndex - 1)}
              className="bg-white p-3 rounded-full shadow-md transition-all hover:shadow-blue-200 border border-gray-100"
              aria-label="Previous testimonials"
            >
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Testimonial cards */}
            <div className="flex flex-1 justify-center px-6 gap-4">
              {getVisibleTestimonials().map(({ testimonial, isActive }, index) => (
                <div key={testimonial.id} className="w-1/3">
                  <TestimonialCard testimonial={testimonial} isActive={isActive} />
                </div>
              ))}
            </div>
            
            {/* Next button */}
            <button 
              onClick={() => goToTestimonial(activeIndex + 1)}
              className="bg-white p-3 rounded-full shadow-md transition-all hover:shadow-blue-200 border border-gray-100"
              aria-label="Next testimonials"
            >
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Desktop navigation dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonialData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeIndex === index 
                    ? "bg-blue-400 w-6" 
                    : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Enhanced pause/play button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 rounded-full text-white text-sm font-medium shadow-md transition-all"
          >
            {isPaused ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Resume Slideshow
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Pause Slideshow
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}