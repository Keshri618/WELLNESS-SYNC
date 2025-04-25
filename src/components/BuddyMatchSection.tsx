"use client";
import { useState, useEffect, useMemo } from 'react';
import { Search, Users, UserPlus, MessageCircle, X, Heart, Filter, Calendar, MapPin, Award } from 'lucide-react';

// Define interface for buddy data
interface Buddy {
  id: number;
  name: string;
  interests: string[];
  goals: string[];
  matchScore: number;
  availability: string;
  location: string;
  avatar: string;
  bio: string;
  experience: string;
}

// Define interface for filters
interface Filters {
  activities: string[];
  goals: string[];
  availability: string;
  location: string;
}

export default function BuddyMatchSection() {
  const [activeTab, setActiveTab] = useState<'discover' | 'match'>('discover');
  const [filters, setFilters] = useState<Filters>(() => {
    // Load filters from localStorage if available
    const savedFilters = localStorage.getItem('buddyFilters');
    return savedFilters ? JSON.parse(savedFilters) : {
      activities: [],
      goals: [],
      availability: 'any',
      location: 'any'
    };
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [buddies, setBuddies] = useState<Buddy[]>([]);
  const [potentialMatches, setPotentialMatches] = useState<Buddy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [matchAnimation, setMatchAnimation] = useState(false);
  const [currentMatch, setCurrentMatch] = useState<Buddy | null>(null);

  // Mock data
  const mockBuddies: Buddy[] = [
    {
      id: 1,
      name: 'Alex Johnson',
      interests: ['Yoga', 'Meditation', 'Running'],
      goals: ['Stress reduction', 'Better sleep'],
      matchScore: 87,
      availability: 'Mornings',
      location: 'Seattle, WA',
      avatar: '/api/placeholder/64/64',
      bio: 'Dedicated yogi looking for meditation partners to practice mindfulness techniques.',
      experience: 'Intermediate',
    },
    // Add more mock buddies as needed
  ];

  const activityOptions = ['Yoga', 'Running', 'Meditation', 'Weight Training', 'Swimming', 'HIIT', 'Cycling', 'Nutrition', 'Mindfulness', 'Hiking', 'Pilates', 'Dance', 'Outdoor fitness'];
  const goalOptions = ['Stress reduction', 'Weight loss', 'Muscle gain', 'Better sleep', 'Mental clarity', 'Marathon training', 'Cardio improvement', 'Flexibility', 'Core strength', 'Overall wellness', 'Nature connection'];
  const availabilityOptions = ['any', 'Mornings', 'Afternoons', 'Evenings', 'Weekends', 'Flexible'];
  const locationOptions = ['any', 'Seattle, WA', 'Portland, OR', 'San Francisco, CA', 'Denver, CO', 'Austin, TX', 'Boulder, CO'];
  const experienceLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  // Persist filters to localStorage
  useEffect(() => {
    localStorage.setItem('buddyFilters', JSON.stringify(filters));
  }, [filters]);

  // Load mock data
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const timer = setTimeout(() => {
      try {
        setBuddies(mockBuddies);
        setPotentialMatches(mockBuddies.slice(0, 3));
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load buddies. Please try again later.');
        setIsLoading(false);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter handlers
  const toggleActivityFilter = (activity: string) => {
    setFilters(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }));
  };

  const toggleGoalFilter = (goal: string) => {
    setFilters(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const setAvailabilityFilter = (availability: string) => {
    setFilters(prev => ({
      ...prev,
      availability
    }));
  };

  const setLocationFilter = (location: string) => {
    setFilters(prev => ({
      ...prev,
      location
    }));
  };

  // Memoized filtered buddies
  const filteredBuddies = useMemo(() => {
    return buddies.filter(buddy => {
      const matchesSearch = searchQuery === '' || 
        buddy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        buddy.interests.some(interest => interest.toLowerCase().includes(searchQuery.toLowerCase())) ||
        buddy.goals.some(goal => goal.toLowerCase().includes(searchQuery.toLowerCase())) ||
        buddy.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesActivities = filters.activities.length === 0 || 
        buddy.interests.some(interest => filters.activities.includes(interest));
      
      const matchesGoals = filters.goals.length === 0 ||
        buddy.goals.some(goal => filters.goals.includes(goal));
      
      const matchesAvailability = filters.availability === 'any' ||
        buddy.availability === filters.availability;
      
      const matchesLocation = filters.location === 'any' ||
        buddy.location === filters.location;
      
      return matchesSearch && matchesActivities && matchesGoals && matchesAvailability && matchesLocation;
    });
  }, [buddies, searchQuery, filters]);

  // Handle send buddy request
  const sendBuddyRequest = (buddyId: number) => {
    alert(`Buddy request sent to user #${buddyId}!`);
  };

  const handleLikeMatch = (match: Buddy) => {
    setCurrentMatch(match);
    setMatchAnimation(true);
    setTimeout(() => {
      setMatchAnimation(false);
      setPotentialMatches(prev => prev.filter(m => m.id !== match.id));
    }, 2000);
  };

  const handleSkipMatch = (matchId: number) => {
    setPotentialMatches(prev => prev.filter(m => m.id !== matchId));
  };

  // Get experience level badge color
  const getExperienceBadgeColor = (level: string) => {
    switch(level) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-blue-100 text-blue-700';
      case 'Advanced': return 'bg-purple-100 text-purple-700';
      case 'Expert': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Find Your Wellness Buddy</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Connect with like-minded individuals to achieve your wellness goals together
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button 
              onClick={() => setActiveTab('discover')}
              className={`flex-1 py-4 px-8 text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                activeTab === 'discover' 
                  ? 'border-b-2 border-cyan-500 text-cyan-600' 
                  : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
              }`}
              aria-selected={activeTab === 'discover'}
            >
              <div className="flex items-center justify-center gap-2">
                <Users size={20} />
                <span>Discover Buddies</span>
              </div>
            </button>
            <button 
              onClick={() => setActiveTab('match')}
              className={`flex-1 py-4 px-8 text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                activeTab === 'match' 
                  ? 'border-b-2 border-cyan-500 text-cyan-600' 
                  : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
              }`}
              aria-selected={activeTab === 'match'}
            >
              <div className="flex items-center justify-center gap-2">
                <Heart size={20} />
                <span>Buddy Match</span>
                {potentialMatches.length > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 ml-1">
                    {potentialMatches.length}
                  </span>
                )}
              </div>
            </button>
          </div>
          
          <div className="p-6 md:p-8">
            {/* Discover Buddies Tab */}
            {activeTab === 'discover' && (
              <div>
                {/* Search and filter bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={20} className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search by name, interest, goal, or location..."
                      className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      aria-label="Search for wellness buddies"
                    />
                  </div>
                  
                  <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-all md:w-auto focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    aria-expanded={isFilterOpen}
                    aria-controls="filter-panel"
                  >
                    <Filter size={20} />
                    <span className="font-medium">Filters</span>
                    {(filters.activities.length > 0 || filters.goals.length > 0 || filters.availability !== 'any' || filters.location !== 'any') && (
                      <span className="bg-cyan-600 text-white text-xs rounded-full px-2 py-0.5 ml-1">
                        {filters.activities.length + filters.goals.length + 
                        (filters.availability !== 'any' ? 1 : 0) + 
                        (filters.location !== 'any' ? 1 : 0)}
                      </span>
                    )}
                  </button>
                </div>
                
                {/* Filters dropdown */}
                {isFilterOpen && (
                  <div id="filter-panel" className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">Activities</h3>
                        <div className="flex flex-wrap gap-2">
                          {activityOptions.map(activity => (
                            <button
                              key={activity}
                              onClick={() => toggleActivityFilter(activity)}
                              className={`px-3 py-1 text-sm rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                                filters.activities.includes(activity)
                                  ? 'bg-cyan-600 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                              aria-pressed={filters.activities.includes(activity)}
                            >
                              {activity}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">Goals</h3>
                        <div className="flex flex-wrap gap-2">
                          {goalOptions.map(goal => (
                            <button
                              key={goal}
                              onClick={() => toggleGoalFilter(goal)}
                              className={`px-3 py-1 text-sm rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                                filters.goals.includes(goal)
                                  ? 'bg-cyan-600 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                              aria-pressed={filters.goals.includes(goal)}
                            >
                              {goal}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">Availability</h3>
                        <select
                          value={filters.availability}
                          onChange={(e) => setAvailabilityFilter(e.target.value)}
                          className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                          aria-label="Select availability"
                        >
                          {availabilityOptions.map(option => (
                            <option key={option} value={option}>
                              {option === 'any' ? 'Any time' : option}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">Location</h3>
                        <select
                          value={filters.location}
                          onChange={(e) => setLocationFilter(e.target.value)}
                          className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                          aria-label="Select location"
                        >
                          {locationOptions.map(option => (
                            <option key={option} value={option}>
                              {option === 'any' ? 'Any location' : option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-6">
                      <button
                        onClick={() => setFilters({ activities: [], goals: [], availability: 'any', location: 'any' })}
                        className="text-gray-600 hover:text-gray-800 mr-4 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      >
                        Reset all filters
                      </button>
                      <button
                        onClick={() => setIsFilterOpen(false)}
                        className="bg-cyan-600 text-white px-6 py-2 rounded-md hover:bg-cyan-700 transition-all font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      >
                        Apply filters
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Error state */}
                {error && (
                  <div className="text-center py-16 bg-red-50 rounded-lg">
                    <h3 className="text-xl font-medium text-red-700 mb-2">Error</h3>
                    <p className="text-red-600">{error}</p>
                  </div>
                )}
                
                {/* Loading state */}
                {isLoading && !error && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full bg-gray-200"></div>
                          <div className="flex-1">
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                        <div className="h-4 bg-gray-200 rounded w-full mt-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 mt-2"></div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Buddies grid */}
                {!isLoading && !error && filteredBuddies.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBuddies.map(buddy => (
                      <div key={buddy.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
                        <div className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <img src={buddy.avatar} alt={buddy.name} className="w-16 h-16 rounded-full object-cover" />
                              <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                            </div>
                            <div>
                              <h3 className="font-bold text-xl text-gray-900">{buddy.name}</h3>
                              <div className="flex items-center text-sm gap-2">
                                <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${getExperienceBadgeColor(buddy.experience)}`}>
                                  {buddy.experience}
                                </div>
                                <span className="text-gray-500 flex items-center">
                                  <MapPin size={14} className="mr-1" />
                                  {buddy.location}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex items-center">
                            <div className={`text-lg font-bold rounded-md px-2 py-1 ${
                              buddy.matchScore >= 90 ? 'bg-green-100 text-green-800' : 
                              buddy.matchScore >= 80 ? 'bg-cyan-100 text-cyan-800' : 
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {buddy.matchScore}%
                            </div>
                            <div className="text-sm text-gray-500 ml-2">match</div>
                            
                            <div className="ml-auto flex items-center gap-1 text-gray-500 text-sm">
                              <Calendar size={14} />
                              <span>{buddy.availability}</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 my-4">{buddy.bio}</p>
                          
                          <div className="mb-4">
                            <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-2">Interests</h4>
                            <div className="flex flex-wrap gap-2">
                              {buddy.interests.map(interest => (
                                <span key={interest} className="px-3 py-1 bg-cyan-50 text-cyan-700 text-sm rounded-full">
                                  {interest}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-2">Goals</h4>
                            <div className="flex flex-wrap gap-2">
                              {buddy.goals.map(goal => (
                                <span key={goal} className="px-3 py-1 bg-amber-50 text-amber-700 text-sm rounded-full">
                                  {goal}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex gap-3 mt-6">
                            <button 
                              className="flex-1 flex justify-center items-center gap-2 bg-white border border-cyan-600 text-cyan-600 py-2 rounded-lg hover:bg-cyan-50 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500"
                              onClick={() => alert(`Starting chat with ${buddy.name}`)}
                              aria-label={`Message ${buddy.name}`}
                            >
                              <MessageCircle size={18} />
                              <span>Message</span>
                            </button>
                            <button 
                              className="flex-1 flex justify-center items-center gap-2 bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500"
                              onClick={() => sendBuddyRequest(buddy.id)}
                              aria-label={`Connect with ${buddy.name}`}
                            >
                              <UserPlus size={18} />
                              <span>Connect</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : !isLoading && !error && (
                  <div className="text-center py-16 bg-gray-50 rounded-lg">
                    <div className="mb-6 text-gray-400">
                      <Users size={64} className="mx-auto" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">No buddies found</h3>
                    <p className="text-gray-500 max-w-md mx-auto">Try adjusting your filters or search criteria to find wellness buddies</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Match Tab */}
            {activeTab === 'match' && (
              <div>
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-8">
                    <p className="text-lg text-gray-600">
                      We've found some great wellness buddies that match your interests and goals!
                    </p>
                  </div>
                  
                  {/* Error state */}
                  {error && (
                    <div className="text-center py-16 bg-red-50 rounded-lg">
                      <h3 className="text-xl font-medium text-red-700 mb-2">Error</h3>
                      <p className="text-red-600">{error}</p>
                    </div>
                  )}
                  
                  {/* Loading state */}
                  {isLoading && !error && (
                    <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl p-8 animate-pulse">
                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/3 flex flex-col items-center">
                          <div className="w-32 h-32 rounded-full bg-gray-200 mb-4"></div>
                          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                        <div className="md:w-2/3">
                          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Match content */}
                  {!isLoading && !error && potentialMatches.length > 0 ? (
                    <div className="relative">
                      {/* Match animation */}
                      {matchAnimation && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animate-fade-in">
                          <div className="bg-white rounded-full p-8 shadow-2xl animate-bounce">
                            <Heart size={48} className="text-red-500" />
                            <p className="mt-4 text-lg font-semibold text-gray-800">
                              It's a match with {currentMatch?.name}!
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {/* Current match card */}
                      <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl overflow-hidden shadow-lg border border-cyan-100 p-8">
                        <div className="flex flex-col md:flex-row gap-8">
                          {/* Left side */}
                          <div className="md:w-1/3 flex flex-col items-center">
                            <div className="relative mb-4">
                              <img 
                                src={potentialMatches[0].avatar} 
                                alt={potentialMatches[0].name}
                                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md" 
                              />
                              <div className="absolute bottom-1 right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                            </div>
                            
                            <h3 className="text-2xl font-bold text-gray-800 mb-1 text-center">{potentialMatches[0].name}</h3>
                            <div className="flex items-center gap-1 text-gray-600 mb-4">
                              <MapPin size={16} />
                              <span>{potentialMatches[0].location}</span>
                            </div>
                            
                            <div className="mb-4 flex items-center gap-2">
                              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getExperienceBadgeColor(potentialMatches[0].experience)}`}>
                                {potentialMatches[0].experience}
                              </div>
                              <div className="flex items-center gap-1 text-gray-600 text-sm">
                                <Calendar size={14} />
                                <span>{potentialMatches[0].availability}</span>
                              </div>
                            </div>
                            
                            <div className="bg-white bg-opacity-60 rounded-lg p-4 w-full shadow-sm">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-gray-800">Match Score</h4>
                                <div className={`text-2xl font-bold ${
                                  potentialMatches[0].matchScore >= 90 ? 'text-green-600' : 
                                  potentialMatches[0].matchScore >= 80 ? 'text-cyan-600' : 
                                  'text-amber-600'
                                }`}>
                                  {potentialMatches[0].matchScore}%
                                </div>
                              </div>
                              
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div 
                                  className={`h-2.5 rounded-full ${
                                    potentialMatches[0].matchScore >= 90 ? 'bg-green-600' : 
                                    potentialMatches[0].matchScore >= 80 ? 'bg-cyan-600' : 
                                    'bg-amber-600'
                                  }`}
                                  style={{ width: `${potentialMatches[0].matchScore}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Right side */}
                          <div className="md:w-2/3">
                            <div className="bg-white bg-opacity-60 rounded-lg p-5 mb-6 shadow-sm">
                              <h4 className="font-medium text-gray-800 mb-2">About me</h4>
                              <p className="text-gray-700">{potentialMatches[0].bio}</p>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-4 mb-6">
                              <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Interests</h4>
                                <div className="flex flex-wrap gap-2">
                                  {potentialMatches[0].interests.map(interest => (
                                    <span key={interest} className="px-3 py-1 bg-white bg-opacity-70 text-cyan-700 text-sm rounded-full border border-cyan-100">
                                      {interest}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Goals</h4>
                                <div className="flex flex-wrap gap-2">
                                  {potentialMatches[0].goals.map(goal => (
                                    <span key={goal} className="px-3 py-1 bg-white bg-opacity-70 text-amber-700 text-sm rounded-full border border-amber-100">
                                      {goal}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <div className="bg-cyan-50 p-5 rounded-lg mb-6 shadow-sm">
                              <h4 className="font-medium text-cyan-800 mb-3 flex items-center gap-2">
                                <Award size={18} />
                                <span>Why you might be great wellness buddies</span>
                              </h4>
                              <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start gap-2">
                                  <div className="mt-1.5 w-2 h-2 bg-cyan-600 rounded-full"></div>
                                  <span>You both have a focus on {potentialMatches[0].goals[0]}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <div className="mt-1.5 w-2 h-2 bg-cyan-600 rounded-full"></div>
                                  <span>Shared interest in {potentialMatches[0].interests[0]}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <div className="mt-1.5 w-2 h-2 bg-cyan-600 rounded-full"></div>
                                  <span>Your {potentialMatches[0].availability.toLowerCase()} availability is compatible</span>
                                </li>
                              </ul>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                              <button 
                                onClick={() => handleSkipMatch(potentialMatches[0].id)}
                                className="flex items-center justify-center gap-2 bg-white text-gray-600 px-8 py-3 rounded-lg shadow border border-gray-200 hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                aria-label={`Skip match with ${potentialMatches[0].name}`}
                              >
                                <X size={20} />
                                <span>Skip</span>
                              </button>
                              <button 
                                onClick={() => handleLikeMatch(potentialMatches[0])}
                                className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-teal-500 text-white px-10 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                aria-label={`Connect with ${potentialMatches[0].name}`}
                              >
                                <Heart size={20} />
                                <span>Connect</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Match count */}
                      <div className="mt-6 flex justify-center">
                        <div className="bg-white rounded-full px-4 py-2 shadow-sm text-gray-600">
                          {potentialMatches.length} potential {potentialMatches.length === 1 ? 'match' : 'matches'} remaining
                        </div>
                      </div>
                    </div>
                  ) : !isLoading && !error && (
                    <div className="text-center py-16 bg-gray-50 rounded-lg">
                      <div className="mb-6 text-gray-400">
                        <Heart size={64} className="mx-auto" />
                      </div>
                      <h3 className="text-xl font-medium text-gray-700 mb-2">No matches found</h3>
                      <p className="text-gray-500 max-w-md mx-auto">
                        We've run out of potential matches. Try adjusting your preferences or check back later!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}