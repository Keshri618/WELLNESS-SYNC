// "use client";
// import { useState, useEffect, useMemo } from 'react';
// import { Search, Users, UserPlus, MessageCircle, X, Heart, Filter, Calendar, MapPin, Award } from 'lucide-react';

// // Define interface for buddy data
// interface Buddy {
//   id: number;
//   name: string;
//   interests: string[];
//   goals: string[];
//   matchScore: number;
//   availability: string;
//   location: string;
//   avatar: string;
//   bio: string;
//   experience: string;
// }

// // Define interface for filters
// interface Filters {
//   activities: string[];
//   goals: string[];
//   availability: string;
//   location: string;
// }

// export default function BuddyMatchSection() {
//   const [activeTab, setActiveTab] = useState<'discover' | 'match'>('discover');
//   const [filters, setFilters] = useState<Filters>(() => {
//     // Load filters from localStorage if available
//     const savedFilters = localStorage.getItem('buddyFilters');
//     return savedFilters ? JSON.parse(savedFilters) : {
//       activities: [],
//       goals: [],
//       availability: 'any',
//       location: 'any'
//     };
//   });
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [buddies, setBuddies] = useState<Buddy[]>([]);
//   const [potentialMatches, setPotentialMatches] = useState<Buddy[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [matchAnimation, setMatchAnimation] = useState(false);
//   const [currentMatch, setCurrentMatch] = useState<Buddy | null>(null);

//   // Mock data
//   const mockBuddies: Buddy[] = [
//     {
//       id: 1,
//       name: 'Alex Johnson',
//       interests: ['Yoga', 'Meditation', 'Running'],
//       goals: ['Stress reduction', 'Better sleep'],
//       matchScore: 87,
//       availability: 'Mornings',
//       location: 'Seattle, WA',
//       avatar: '/api/placeholder/64/64',
//       bio: 'Dedicated yogi looking for meditation partners to practice mindfulness techniques.',
//       experience: 'Intermediate',
//     },
//     // Add more mock buddies as needed
//   ];

//   const activityOptions = ['Yoga', 'Running', 'Meditation', 'Weight Training', 'Swimming', 'HIIT', 'Cycling', 'Nutrition', 'Mindfulness', 'Hiking', 'Pilates', 'Dance', 'Outdoor fitness'];
//   const goalOptions = ['Stress reduction', 'Weight loss', 'Muscle gain', 'Better sleep', 'Mental clarity', 'Marathon training', 'Cardio improvement', 'Flexibility', 'Core strength', 'Overall wellness', 'Nature connection'];
//   const availabilityOptions = ['any', 'Mornings', 'Afternoons', 'Evenings', 'Weekends', 'Flexible'];
//   const locationOptions = ['any', 'Seattle, WA', 'Portland, OR', 'San Francisco, CA', 'Denver, CO', 'Austin, TX', 'Boulder, CO'];
//   const experienceLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

//   // Persist filters to localStorage
//   useEffect(() => {
//     localStorage.setItem('buddyFilters', JSON.stringify(filters));
//   }, [filters]);

//   // Load mock data
//   useEffect(() => {
//     setIsLoading(true);
//     setError(null);
//     const timer = setTimeout(() => {
//       try {
//         setBuddies(mockBuddies);
//         setPotentialMatches(mockBuddies.slice(0, 3));
//         setIsLoading(false);
//       } catch (err) {
//         setError('Failed to load buddies. Please try again later.');
//         setIsLoading(false);
//       }
//     }, 1000);
    
//     return () => clearTimeout(timer);
//   }, []);

//   // Filter handlers
//   const toggleActivityFilter = (activity: string) => {
//     setFilters(prev => ({
//       ...prev,
//       activities: prev.activities.includes(activity)
//         ? prev.activities.filter(a => a !== activity)
//         : [...prev.activities, activity]
//     }));
//   };

//   const toggleGoalFilter = (goal: string) => {
//     setFilters(prev => ({
//       ...prev,
//       goals: prev.goals.includes(goal)
//         ? prev.goals.filter(g => g !== goal)
//         : [...prev.goals, goal]
//     }));
//   };

//   const setAvailabilityFilter = (availability: string) => {
//     setFilters(prev => ({
//       ...prev,
//       availability
//     }));
//   };

//   const setLocationFilter = (location: string) => {
//     setFilters(prev => ({
//       ...prev,
//       location
//     }));
//   };

//   // Memoized filtered buddies
//   const filteredBuddies = useMemo(() => {
//     return buddies.filter(buddy => {
//       const matchesSearch = searchQuery === '' || 
//         buddy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         buddy.interests.some(interest => interest.toLowerCase().includes(searchQuery.toLowerCase())) ||
//         buddy.goals.some(goal => goal.toLowerCase().includes(searchQuery.toLowerCase())) ||
//         buddy.location.toLowerCase().includes(searchQuery.toLowerCase());
      
//       const matchesActivities = filters.activities.length === 0 || 
//         buddy.interests.some(interest => filters.activities.includes(interest));
      
//       const matchesGoals = filters.goals.length === 0 ||
//         buddy.goals.some(goal => filters.goals.includes(goal));
      
//       const matchesAvailability = filters.availability === 'any' ||
//         buddy.availability === filters.availability;
      
//       const matchesLocation = filters.location === 'any' ||
//         buddy.location === filters.location;
      
//       return matchesSearch && matchesActivities && matchesGoals && matchesAvailability && matchesLocation;
//     });
//   }, [buddies, searchQuery, filters]);

//   // Handle send buddy request
//   const sendBuddyRequest = (buddyId: number) => {
//     alert(`Buddy request sent to user #${buddyId}!`);
//   };

//   const handleLikeMatch = (match: Buddy) => {
//     setCurrentMatch(match);
//     setMatchAnimation(true);
//     setTimeout(() => {
//       setMatchAnimation(false);
//       setPotentialMatches(prev => prev.filter(m => m.id !== match.id));
//     }, 2000);
//   };

//   const handleSkipMatch = (matchId: number) => {
//     setPotentialMatches(prev => prev.filter(m => m.id !== matchId));
//   };

//   // Get experience level badge color
//   const getExperienceBadgeColor = (level: string) => {
//     switch(level) {
//       case 'Beginner': return 'bg-green-100 text-green-700';
//       case 'Intermediate': return 'bg-blue-100 text-blue-700';
//       case 'Advanced': return 'bg-purple-100 text-purple-700';
//       case 'Expert': return 'bg-red-100 text-red-700';
//       default: return 'bg-gray-100 text-gray-700';
//     }
//   };

//   return (
//     <div className="bg-gray-50 py-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Find Your Wellness Buddy</h2>
//           <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
//             Connect with like-minded individuals to achieve your wellness goals together
//           </p>
//         </div>
        
//         <div className="bg-white rounded-xl shadow-xl overflow-hidden">
//           {/* Tabs */}
//           <div className="flex border-b border-gray-200">
//             <button 
//               onClick={() => setActiveTab('discover')}
//               className={`flex-1 py-4 px-8 text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
//                 activeTab === 'discover' 
//                   ? 'border-b-2 border-cyan-500 text-cyan-600' 
//                   : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
//               }`}
//               aria-selected={activeTab === 'discover'}
//             >
//               <div className="flex items-center justify-center gap-2">
//                 <Users size={20} />
//                 <span>Discover Buddies</span>
//               </div>
//             </button>
//             <button 
//               onClick={() => setActiveTab('match')}
//               className={`flex-1 py-4 px-8 text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
//                 activeTab === 'match' 
//                   ? 'border-b-2 border-cyan-500 text-cyan-600' 
//                   : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
//               }`}
//               aria-selected={activeTab === 'match'}
//             >
//               <div className="flex items-center justify-center gap-2">
//                 <Heart size={20} />
//                 <span>Buddy Match</span>
//                 {potentialMatches.length > 0 && (
//                   <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 ml-1">
//                     {potentialMatches.length}
//                   </span>
//                 )}
//               </div>
//             </button>
//           </div>
          
//           <div className="p-6 md:p-8">
//             {/* Discover Buddies Tab */}
//             {activeTab === 'discover' && (
//               <div>
//                 {/* Search and filter bar */}
//                 <div className="flex flex-col md:flex-row gap-4 mb-8">
//                   <div className="relative flex-grow">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Search size={20} className="text-gray-500" />
//                     </div>
//                     <input
//                       type="text"
//                       placeholder="Search by name, interest, goal, or location..."
//                       className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       aria-label="Search for wellness buddies"
//                     />
//                   </div>
                  
//                   <button 
//                     onClick={() => setIsFilterOpen(!isFilterOpen)}
//                     className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-all md:w-auto focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                     aria-expanded={isFilterOpen}
//                     aria-controls="filter-panel"
//                   >
//                     <Filter size={20} />
//                     <span className="font-medium">Filters</span>
//                     {(filters.activities.length > 0 || filters.goals.length > 0 || filters.availability !== 'any' || filters.location !== 'any') && (
//                       <span className="bg-cyan-600 text-white text-xs rounded-full px-2 py-0.5 ml-1">
//                         {filters.activities.length + filters.goals.length + 
//                         (filters.availability !== 'any' ? 1 : 0) + 
//                         (filters.location !== 'any' ? 1 : 0)}
//                       </span>
//                     )}
//                   </button>
//                 </div>
                
//                 {/* Filters dropdown */}
//                 {isFilterOpen && (
//                   <div id="filter-panel" className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-200">
//                     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//                       <div>
//                         <h3 className="font-medium text-gray-900 mb-3">Activities</h3>
//                         <div className="flex flex-wrap gap-2">
//                           {activityOptions.map(activity => (
//                             <button
//                               key={activity}
//                               onClick={() => toggleActivityFilter(activity)}
//                               className={`px-3 py-1 text-sm rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
//                                 filters.activities.includes(activity)
//                                   ? 'bg-cyan-600 text-white'
//                                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                               }`}
//                               aria-pressed={filters.activities.includes(activity)}
//                             >
//                               {activity}
//                             </button>
//                           ))}
//                         </div>
//                       </div>
                      
//                       <div>
//                         <h3 className="font-medium text-gray-900 mb-3">Goals</h3>
//                         <div className="flex flex-wrap gap-2">
//                           {goalOptions.map(goal => (
//                             <button
//                               key={goal}
//                               onClick={() => toggleGoalFilter(goal)}
//                               className={`px-3 py-1 text-sm rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
//                                 filters.goals.includes(goal)
//                                   ? 'bg-cyan-600 text-white'
//                                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                               }`}
//                               aria-pressed={filters.goals.includes(goal)}
//                             >
//                               {goal}
//                             </button>
//                           ))}
//                         </div>
//                       </div>
                      
//                       <div>
//                         <h3 className="font-medium text-gray-900 mb-3">Availability</h3>
//                         <select
//                           value={filters.availability}
//                           onChange={(e) => setAvailabilityFilter(e.target.value)}
//                           className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                           aria-label="Select availability"
//                         >
//                           {availabilityOptions.map(option => (
//                             <option key={option} value={option}>
//                               {option === 'any' ? 'Any time' : option}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
                      
//                       <div>
//                         <h3 className="font-medium text-gray-900 mb-3">Location</h3>
//                         <select
//                           value={filters.location}
//                           onChange={(e) => setLocationFilter(e.target.value)}
//                           className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                           aria-label="Select location"
//                         >
//                           {locationOptions.map(option => (
//                             <option key={option} value={option}>
//                               {option === 'any' ? 'Any location' : option}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
                    
//                     <div className="flex justify-end mt-6">
//                       <button
//                         onClick={() => setFilters({ activities: [], goals: [], availability: 'any', location: 'any' })}
//                         className="text-gray-600 hover:text-gray-800 mr-4 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                       >
//                         Reset all filters
//                       </button>
//                       <button
//                         onClick={() => setIsFilterOpen(false)}
//                         className="bg-cyan-600 text-white px-6 py-2 rounded-md hover:bg-cyan-700 transition-all font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                       >
//                         Apply filters
//                       </button>
//                     </div>
//                   </div>
//                 )}
                
//                 {/* Error state */}
//                 {error && (
//                   <div className="text-center py-16 bg-red-50 rounded-lg">
//                     <h3 className="text-xl font-medium text-red-700 mb-2">Error</h3>
//                     <p className="text-red-600">{error}</p>
//                   </div>
//                 )}
                
//                 {/* Loading state */}
//                 {isLoading && !error && (
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {[...Array(3)].map((_, i) => (
//                       <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
//                         <div className="flex items-center gap-4">
//                           <div className="w-16 h-16 rounded-full bg-gray-200"></div>
//                           <div className="flex-1">
//                             <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
//                             <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                           </div>
//                         </div>
//                         <div className="h-4 bg-gray-200 rounded w-full mt-4"></div>
//                         <div className="h-4 bg-gray-200 rounded w-3/4 mt-2"></div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
                
//                 {/* Buddies grid */}
//                 {!isLoading && !error && filteredBuddies.length > 0 ? (
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {filteredBuddies.map(buddy => (
//                       <div key={buddy.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
//                         <div className="p-6">
//                           <div className="flex items-center gap-4">
//                             <div className="relative">
//                               <img src={buddy.avatar} alt={buddy.name} className="w-16 h-16 rounded-full object-cover" />
//                               <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
//                             </div>
//                             <div>
//                               <h3 className="font-bold text-xl text-gray-900">{buddy.name}</h3>
//                               <div className="flex items-center text-sm gap-2">
//                                 <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${getExperienceBadgeColor(buddy.experience)}`}>
//                                   {buddy.experience}
//                                 </div>
//                                 <span className="text-gray-500 flex items-center">
//                                   <MapPin size={14} className="mr-1" />
//                                   {buddy.location}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
                          
//                           <div className="mt-4 flex items-center">
//                             <div className={`text-lg font-bold rounded-md px-2 py-1 ${
//                               buddy.matchScore >= 90 ? 'bg-green-100 text-green-800' : 
//                               buddy.matchScore >= 80 ? 'bg-cyan-100 text-cyan-800' : 
//                               'bg-amber-100 text-amber-800'
//                             }`}>
//                               {buddy.matchScore}%
//                             </div>
//                             <div className="text-sm text-gray-500 ml-2">match</div>
                            
//                             <div className="ml-auto flex items-center gap-1 text-gray-500 text-sm">
//                               <Calendar size={14} />
//                               <span>{buddy.availability}</span>
//                             </div>
//                           </div>
                          
//                           <p className="text-gray-700 my-4">{buddy.bio}</p>
                          
//                           <div className="mb-4">
//                             <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-2">Interests</h4>
//                             <div className="flex flex-wrap gap-2">
//                               {buddy.interests.map(interest => (
//                                 <span key={interest} className="px-3 py-1 bg-cyan-50 text-cyan-700 text-sm rounded-full">
//                                   {interest}
//                                 </span>
//                               ))}
//                             </div>
//                           </div>
                          
//                           <div className="mb-4">
//                             <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-2">Goals</h4>
//                             <div className="flex flex-wrap gap-2">
//                               {buddy.goals.map(goal => (
//                                 <span key={goal} className="px-3 py-1 bg-amber-50 text-amber-700 text-sm rounded-full">
//                                   {goal}
//                                 </span>
//                               ))}
//                             </div>
//                           </div>
                          
//                           <div className="flex gap-3 mt-6">
//                             <button 
//                               className="flex-1 flex justify-center items-center gap-2 bg-white border border-cyan-600 text-cyan-600 py-2 rounded-lg hover:bg-cyan-50 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                               onClick={() => alert(`Starting chat with ${buddy.name}`)}
//                               aria-label={`Message ${buddy.name}`}
//                             >
//                               <MessageCircle size={18} />
//                               <span>Message</span>
//                             </button>
//                             <button 
//                               className="flex-1 flex justify-center items-center gap-2 bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                               onClick={() => sendBuddyRequest(buddy.id)}
//                               aria-label={`Connect with ${buddy.name}`}
//                             >
//                               <UserPlus size={18} />
//                               <span>Connect</span>
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : !isLoading && !error && (
//                   <div className="text-center py-16 bg-gray-50 rounded-lg">
//                     <div className="mb-6 text-gray-400">
//                       <Users size={64} className="mx-auto" />
//                     </div>
//                     <h3 className="text-xl font-medium text-gray-700 mb-2">No buddies found</h3>
//                     <p className="text-gray-500 max-w-md mx-auto">Try adjusting your filters or search criteria to find wellness buddies</p>
//                   </div>
//                 )}
//               </div>
//             )}
            
//             {/* Match Tab */}
//             {activeTab === 'match' && (
//               <div>
//                 <div className="max-w-4xl mx-auto">
//                   <div className="text-center mb-8">
//                     <p className="text-lg text-gray-600">
//                       We've found some great wellness buddies that match your interests and goals!
//                     </p>
//                   </div>
                  
//                   {/* Error state */}
//                   {error && (
//                     <div className="text-center py-16 bg-red-50 rounded-lg">
//                       <h3 className="text-xl font-medium text-red-700 mb-2">Error</h3>
//                       <p className="text-red-600">{error}</p>
//                     </div>
//                   )}
                  
//                   {/* Loading state */}
//                   {isLoading && !error && (
//                     <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl p-8 animate-pulse">
//                       <div className="flex flex-col md:flex-row gap-8">
//                         <div className="md:w-1/3 flex flex-col items-center">
//                           <div className="w-32 h-32 rounded-full bg-gray-200 mb-4"></div>
//                           <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
//                           <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                         </div>
//                         <div className="md:w-2/3">
//                           <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
//                           <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
//                           <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
                  
//                   {/* Match content */}
//                   {!isLoading && !error && potentialMatches.length > 0 ? (
//                     <div className="relative">
//                       {/* Match animation */}
//                       {matchAnimation && (
//                         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animate-fade-in">
//                           <div className="bg-white rounded-full p-8 shadow-2xl animate-bounce">
//                             <Heart size={48} className="text-red-500" />
//                             <p className="mt-4 text-lg font-semibold text-gray-800">
//                               It's a match with {currentMatch?.name}!
//                             </p>
//                           </div>
//                         </div>
//                       )}
                      
//                       {/* Current match card */}
//                       <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl overflow-hidden shadow-lg border border-cyan-100 p-8">
//                         <div className="flex flex-col md:flex-row gap-8">
//                           {/* Left side */}
//                           <div className="md:w-1/3 flex flex-col items-center">
//                             <div className="relative mb-4">
//                               <img 
//                                 src={potentialMatches[0].avatar} 
//                                 alt={potentialMatches[0].name}
//                                 className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md" 
//                               />
//                               <div className="absolute bottom-1 right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
//                             </div>
                            
//                             <h3 className="text-2xl font-bold text-gray-800 mb-1 text-center">{potentialMatches[0].name}</h3>
//                             <div className="flex items-center gap-1 text-gray-600 mb-4">
//                               <MapPin size={16} />
//                               <span>{potentialMatches[0].location}</span>
//                             </div>
                            
//                             <div className="mb-4 flex items-center gap-2">
//                               <div className={`px-3 py-1 rounded-full text-sm font-medium ${getExperienceBadgeColor(potentialMatches[0].experience)}`}>
//                                 {potentialMatches[0].experience}
//                               </div>
//                               <div className="flex items-center gap-1 text-gray-600 text-sm">
//                                 <Calendar size={14} />
//                                 <span>{potentialMatches[0].availability}</span>
//                               </div>
//                             </div>
                            
//                             <div className="bg-white bg-opacity-60 rounded-lg p-4 w-full shadow-sm">
//                               <div className="flex items-center justify-between mb-2">
//                                 <h4 className="font-medium text-gray-800">Match Score</h4>
//                                 <div className={`text-2xl font-bold ${
//                                   potentialMatches[0].matchScore >= 90 ? 'text-green-600' : 
//                                   potentialMatches[0].matchScore >= 80 ? 'text-cyan-600' : 
//                                   'text-amber-600'
//                                 }`}>
//                                   {potentialMatches[0].matchScore}%
//                                 </div>
//                               </div>
                              
//                               <div className="w-full bg-gray-200 rounded-full h-2.5">
//                                 <div 
//                                   className={`h-2.5 rounded-full ${
//                                     potentialMatches[0].matchScore >= 90 ? 'bg-green-600' : 
//                                     potentialMatches[0].matchScore >= 80 ? 'bg-cyan-600' : 
//                                     'bg-amber-600'
//                                   }`}
//                                   style={{ width: `${potentialMatches[0].matchScore}%` }}
//                                 ></div>
//                               </div>
//                             </div>
//                           </div>
                          
//                           {/* Right side */}
//                           <div className="md:w-2/3">
//                             <div className="bg-white bg-opacity-60 rounded-lg p-5 mb-6 shadow-sm">
//                               <h4 className="font-medium text-gray-800 mb-2">About me</h4>
//                               <p className="text-gray-700">{potentialMatches[0].bio}</p>
//                             </div>
                            
//                             <div className="grid md:grid-cols-2 gap-4 mb-6">
//                               <div>
//                                 <h4 className="text-sm font-medium text-gray-700 mb-2">Interests</h4>
//                                 <div className="flex flex-wrap gap-2">
//                                   {potentialMatches[0].interests.map(interest => (
//                                     <span key={interest} className="px-3 py-1 bg-white bg-opacity-70 text-cyan-700 text-sm rounded-full border border-cyan-100">
//                                       {interest}
//                                     </span>
//                                   ))}
//                                 </div>
//                               </div>
                              
//                               <div>
//                                 <h4 className="text-sm font-medium text-gray-700 mb-2">Goals</h4>
//                                 <div className="flex flex-wrap gap-2">
//                                   {potentialMatches[0].goals.map(goal => (
//                                     <span key={goal} className="px-3 py-1 bg-white bg-opacity-70 text-amber-700 text-sm rounded-full border border-amber-100">
//                                       {goal}
//                                     </span>
//                                   ))}
//                                 </div>
//                               </div>
//                             </div>
                            
//                             <div className="bg-cyan-50 p-5 rounded-lg mb-6 shadow-sm">
//                               <h4 className="font-medium text-cyan-800 mb-3 flex items-center gap-2">
//                                 <Award size={18} />
//                                 <span>Why you might be great wellness buddies</span>
//                               </h4>
//                               <ul className="space-y-2 text-gray-700">
//                                 <li className="flex items-start gap-2">
//                                   <div className="mt-1.5 w-2 h-2 bg-cyan-600 rounded-full"></div>
//                                   <span>You both have a focus on {potentialMatches[0].goals[0]}</span>
//                                 </li>
//                                 <li className="flex items-start gap-2">
//                                   <div className="mt-1.5 w-2 h-2 bg-cyan-600 rounded-full"></div>
//                                   <span>Shared interest in {potentialMatches[0].interests[0]}</span>
//                                 </li>
//                                 <li className="flex items-start gap-2">
//                                   <div className="mt-1.5 w-2 h-2 bg-cyan-600 rounded-full"></div>
//                                   <span>Your {potentialMatches[0].availability.toLowerCase()} availability is compatible</span>
//                                 </li>
//                               </ul>
//                             </div>
                            
//                             <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
//                               <button 
//                                 onClick={() => handleSkipMatch(potentialMatches[0].id)}
//                                 className="flex items-center justify-center gap-2 bg-white text-gray-600 px-8 py-3 rounded-lg shadow border border-gray-200 hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                                 aria-label={`Skip match with ${potentialMatches[0].name}`}
//                               >
//                                 <X size={20} />
//                                 <span>Skip</span>
//                               </button>
//                               <button 
//                                 onClick={() => handleLikeMatch(potentialMatches[0])}
//                                 className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-teal-500 text-white px-10 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                                 aria-label={`Connect with ${potentialMatches[0].name}`}
//                               >
//                                 <Heart size={20} />
//                                 <span>Connect</span>
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
                      
//                       {/* Match count */}
//                       <div className="mt-6 flex justify-center">
//                         <div className="bg-white rounded-full px-4 py-2 shadow-sm text-gray-600">
//                           {potentialMatches.length} potential {potentialMatches.length === 1 ? 'match' : 'matches'} remaining
//                         </div>
//                       </div>
//                     </div>
//                   ) : !isLoading && !error && (
//                     <div className="text-center py-16 bg-gray-50 rounded-lg">
//                       <div className="mb-6 text-gray-400">
//                         <Heart size={64} className="mx-auto" />
//                       </div>
//                       <h3 className="text-xl font-medium text-gray-700 mb-2">No matches found</h3>
//                       <p className="text-gray-500 max-w-md mx-auto">
//                         We've run out of potential matches. Try adjusting your preferences or check back later!
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// components/BuddyMatchSection.tsx

"use client";
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, off, DatabaseReference, DataSnapshot } from 'firebase/database';
import { useLocalStorage } from 'usehooks-ts';
import GoogleMapsLoader from './GoogleMapsLoader'; // Adjust path as needed

// Types
type Activity = 'Yoga' | 'Running' | 'Meditation' | 'Weight Training' | 'Swimming' | 'Cycling';
type Goal = 'Weight Loss' | 'Muscle Gain' | 'Stress Relief' | 'General Fitness' | 'Training for Event';
type Availability = 'Morning' | 'Afternoon' | 'Evening' | 'Weekends' | 'Flexible';

interface BuddyProfile {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  activities: Activity[];
  goals: Goal[];
  location: string;
  availability: Availability[];
  matchScore: number;
  lastActive: string;
  badges: string[];
  distance?: number;
}

interface Filters {
  activities: Activity[];
  goals: Goal[];
  availability: Availability[];
  maxDistance: number;
  minMatchScore: number; // Corrected from minMatchScoreNUMBER
}

// Firebase config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Define the component as a React functional component
const BuddyMatchSection: React.FC<{ userLocation?: { lat: number; lng: number } }> = ({ userLocation }) => {
  // State
  const [profiles, setProfiles] = useState<BuddyProfile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<BuddyProfile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<BuddyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Filters with localStorage persistence
  const [filters, setFilters] = useLocalStorage<Filters>('buddyMatchFilters', {
    activities: [],
    goals: [],
    availability: [],
    maxDistance: 50,
    minMatchScore: 50,
  });

  // Load profiles from Firebase
  useEffect(() => {
    setIsLoading(true);
    const profilesRef: DatabaseReference = ref(database, 'profiles');
    const unsubscribe = onValue(profilesRef, (snapshot: DataSnapshot) => {
      try {
        const data = snapshot.val();
        const loadedProfiles: BuddyProfile[] = data ? Object.values(data) : [];

        // Calculate distances if user location is available
        if (userLocation) {
          loadedProfiles.forEach(profile => {
            // This would be replaced with actual distance calculation
            profile.distance = Math.floor(Math.random() * 50); // Mock distance
          });
        }

        setProfiles(loadedProfiles);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load profiles');
        setIsLoading(false);
      }
    }, (error: Error) => {
      setError('Failed to connect to database');
      setIsLoading(false);
    });

    return () => {
      off(profilesRef);
      unsubscribe();
    };
  }, [userLocation]);

  // Filter profiles based on filters
  useEffect(() => {
    const filtered = profiles.filter(profile => {
      // Match score filter
      if (profile.matchScore < filters.minMatchScore) return false;

      // Activity filter
      if (filters.activities.length > 0 &&
          !filters.activities.some(activity => profile.activities.includes(activity))) {
        return false;
      }

      // Goal filter
      if (filters.goals.length > 0 &&
          !filters.goals.some(goal => profile.goals.includes(goal))) {
        return false;
      }

      // Availability filter
      if (filters.availability.length > 0 &&
          !filters.availability.some(avail => profile.availability.includes(avail))) {
        return false;
      }

      // Distance filter
      if (profile.distance && profile.distance > filters.maxDistance) return false;

      return true;
    });

    setFilteredProfiles(filtered);
  }, [profiles, filters]);

  // Initialize Google Maps when API is loaded
  const initializeMap = useCallback(() => {
    if (!userLocation || !window.google || !window.google.maps) return;

    const mapElement = document.getElementById('map');
    if (mapElement) {
      const newMap = new google.maps.Map(mapElement, {
        center: { lat: userLocation.lat, lng: userLocation.lng },
        zoom: 12,
        styles: [
          {
            featureType: 'poi',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'transit',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }],
          },
        ],
      });

      // Add user marker
      new google.maps.Marker({
        position: { lat: userLocation.lat, lng: userLocation.lng },
        map: newMap,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#6366f1',
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: '#ffffff',
        },
      });

      setMap(newMap);
    }
  }, [userLocation]);

  // Update map markers when filtered profiles change
  useEffect(() => {
    if (!map || !userLocation) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    const newMarkers: google.maps.Marker[] = [];
    filteredProfiles.forEach(profile => {
      // Mock location - in a real app, you'd use actual coordinates
      const lat = userLocation.lat + (Math.random() * 0.1 - 0.05);
      const lng = userLocation.lng + (Math.random() * 0.1 - 0.05);

      const marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 6,
          fillColor: '#10b981',
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: '#ffffff',
        },
      });

      marker.addListener('click', () => {
        const selected = profiles.find(p => p.id === profile.id);
        if (selected) setSelectedProfile(selected);
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  }, [filteredProfiles, map, userLocation, profiles]);

  // Toggle filter for arrays
  const toggleFilter = useCallback(
    (type: keyof Filters, value: Activity | Goal | Availability) => {
      setFilters((prev: Filters) => {
        const currentValues = prev[type] as string[];
        const newValues = currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value];

        return { ...prev, [type]: newValues };
      });
    },
    [setFilters]
  );

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.03, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' },
    tap: { scale: 0.98 },
  };

  const filterVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: 'auto', opacity: 1 },
  };

  if (error) {
    return (
      <div className="p-6 bg-red-50 rounded-xl text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-indigo-600 mb-4">Find Your Wellness Buddy</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Connect with like-minded individuals who share your wellness goals and activities.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 bg-white rounded-xl shadow-sm p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-700">Filter Buddies</h3>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-indigo-600 hover:text-indigo-800"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
            <motion.span
              animate={{ rotate: showFilters ? 180 : 0 }}
              className="ml-2"
            >
              ▼
            </motion.span>
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={filterVariants}
              className="overflow-hidden"
            >
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Activities Filter */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Activities</h4>
                  <div className="space-y-2">
                    {(['Yoga', 'Running', 'Meditation', 'Weight Training', 'Swimming', 'Cycling'] as Activity[]).map(
                      (activity) => (
                        <motion.label
                          key={activity}
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={filters.activities.includes(activity)}
                            onChange={() => toggleFilter('activities', activity)}
                            className="rounded text-indigo-600"
                          />
                          <span>{activity}</span>
                        </motion.label>
                      )
                    )}
                  </div>
                </div>

                {/* Goals Filter */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Goals</h4>
                  <div className="space-y-2">
                    {(['Weight Loss', 'Muscle Gain', 'Stress Relief', 'General Fitness', 'Training for Event'] as Goal[]).map(
                      (goal) => (
                        <motion.label
                          key={goal}
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={filters.goals.includes(goal)}
                            onChange={() => toggleFilter('goals', goal)}
                            className="rounded text-indigo-600"
                          />
                          <span>{goal}</span>
                        </motion.label>
                      )
                    )}
                  </div>
                </div>

                {/* Availability Filter */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Availability</h4>
                  <div className="space-y-2">
                    {(['Morning', 'Afternoon', 'Evening', 'Weekends', 'Flexible'] as Availability[]).map(
                      (availability) => (
                        <motion.label
                          key={availability}
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={filters.availability.includes(availability)}
                            onChange={() => toggleFilter('availability', availability)}
                            className="rounded text-indigo-600"
                          />
                          <span>{availability}</span>
                        </motion.label>
                      )
                    )}
                  </div>
                </div>

                {/* Distance Filter */}
                <div className="md:col-span-3">
                  <h4 className="font-medium text-gray-700 mb-2">Maximum Distance: {filters.maxDistance} miles</h4>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={filters.maxDistance}
                    onChange={(e) => setFilters({ ...filters, maxDistance: parseInt(e.target.value) })}
                    className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Match Score Filter */}
                <div className="md:col-span-3">
                  <h4 className="font-medium text-gray-700 mb-2">Minimum Match Score: {filters.minMatchScore}%</h4>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.minMatchScore}
                    onChange={(e) => setFilters({ ...filters, minMatchScore: parseInt(e.target.value) })}
                    className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results and Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profiles List */}
        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : filteredProfiles.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No buddies found</h3>
              <p className="text-gray-500">Try adjusting your filters to find more matches.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence>
                {filteredProfiles.map((profile) => (
                  <motion.div
                    key={profile.id}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                    variants={cardVariants}
                    transition={{ duration: 0.3 }}
                    onClick={() => setSelectedProfile(profile)}
                    className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer"
                  >
                    <div className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <img
                            src={profile.avatar}
                            alt={profile.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100"
                          />
                          <div
                            className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                              profile.lastActive === 'Online' ? 'bg-green-500' : 'bg-gray-400'
                            }`}
                          ></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-gray-900">{profile.name}</h3>
                            <div className="flex items-center">
                              <span className="text-sm font-medium text-indigo-600 mr-1">
                                {profile.matchScore}%
                              </span>
                              <svg
                                className="w-5 h-5 text-indigo-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{profile.bio}</p>

                          {/* Activities */}
                          <div className="mt-3 flex flex-wrap gap-2">
                            {profile.activities.slice(0, 3).map((activity) => (
                              <span
                                key={activity}
                                className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full"
                              >
                                {activity}
                              </span>
                            ))}
                            {profile.activities.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                +{profile.activities.length - 3}
                              </span>
                            )}
                          </div>

                          {/* Availability */}
                          <div className="mt-2 flex flex-wrap gap-2">
                            {profile.availability.map((avail) => (
                              <span
                                key={avail}
                                className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full"
                              >
                                {avail}
                              </span>
                            ))}
                          </div>

                          {/* Distance */}
                          {profile.distance && (
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              {profile.distance} miles away
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Map and Selected Profile */}
        <div className="space-y-6">
          {/* Map */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <GoogleMapsLoader
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
              onLoad={initializeMap}
              onError={(error) => console.error('Google Maps API Error:', error)}
            >
              <div id="map" className="h-64 w-full"></div>
            </GoogleMapsLoader>
          </div>

          {/* Selected Profile */}
          {selectedProfile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedProfile.avatar}
                      alt={selectedProfile.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{selectedProfile.name}</h3>
                      <div className="flex items-center mt-1">
                        <span className="text-sm font-medium text-indigo-600 mr-1">
                          {selectedProfile.matchScore}%
                        </span>
                        <span className="text-sm text-gray-500">Match</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProfile(null)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Match Score Visualization */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Compatibility</span>
                    <span>{selectedProfile.matchScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedProfile.matchScore}%` }}
                      transition={{ duration: 1 }}
                      className="bg-indigo-600 h-2.5 rounded-full"
                    ></motion.div>
                  </div>
                </div>

                {/* Bio */}
                <p className="mt-4 text-gray-600">{selectedProfile.bio}</p>

                {/* Details */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Activities</h4>
                    <div className="mt-1 space-y-1">
                      {selectedProfile.activities.map((activity) => (
                        <div key={activity} className="flex items-center">
                          <svg
                            className="w-4 h-4 text-indigo-500 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm text-gray-700">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Goals</h4>
                    <div className="mt-1 space-y-1">
                      {selectedProfile.goals.map((goal) => (
                        <div key={goal} className="flex items-center">
                          <svg
                            className="w-4 h-4 text-indigo-500 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm text-gray-700">{goal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <h4 className="text-sm font-medium text-gray-500">Availability</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedProfile.availability.map((avail) => (
                        <span
                          key={avail}
                          className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full"
                        >
                          {avail}
                        </span>
                      ))}
                    </div>
                  </div>
                  {selectedProfile.distance && (
                    <div className="col-span-2">
                      <h4 className="text-sm font-medium text-gray-500">Location</h4>
                      <div className="mt-1 flex items-center text-sm text-gray-700">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {selectedProfile.distance} miles from you
                      </div>
                    </div>
                  )}
                </div>

                {/* Badges */}
                {selectedProfile.badges.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-500">Badges</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedProfile.badges.map((badge) => (
                        <span
                          key={badge}
                          className="px-3 py-1 bg-yellow-50 text-yellow-700 text-sm rounded-full flex items-center"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-8 flex space-x-3">
                  <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition duration-200">
                    Send Message
                  </button>
                  <button className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg transition duration-200">
                    View Profile
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BuddyMatchSection;