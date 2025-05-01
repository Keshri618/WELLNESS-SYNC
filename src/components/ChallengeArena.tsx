// "use client";
// import React, { useState, useEffect } from 'react';
// import { Trophy, Medal, Star, Award, Target, Clock, Users, Heart, TrendingUp, ThumbsUp, Bell, Flame, Calendar, Gift, Filter, Check, BarChart2, PieChart } from 'lucide-react';

// // Define interfaces
// interface Challenge {
//   id: number;
//   title: string;
//   description: string;
//   category: string;
//   difficulty: string;
//   participants: number;
//   duration: string;
//   rewards: string;
//   completed: boolean;
//   progress: number;
//   startDate?: string;
//   daysLeft?: number;
// }

// interface LeaderboardEntry {
//   name: string;
//   points: number;
//   rank: number;
//   badges: number;
//   avatar?: string;
// }

// interface UserData {
//   name: string;
//   points: number;
//   rank: string;
//   completedChallenges: number;
//   badges: string[];
//   avatar?: string;
//   streakDays: number;
//   nextReward: number;
//   progress: number;
// }

// interface BadgeData {
//   name: string;
//   icon: React.ReactElement;
//   description: string;
//   unlocked: boolean;
//   progress: number;
//   total: number;
// }

// // Moon icon component
// interface MoonProps {
//   size?: number;
//   className?: string;
// }

// const Moon: React.FC<MoonProps> = ({ size, className }) => {
//   return (
//     <svg 
//       xmlns="http://www.w3.org/2000/svg" 
//       width={size || 24} 
//       height={size || 24} 
//       viewBox="0 0 24 24" 
//       fill="none" 
//       stroke="currentColor" 
//       strokeWidth="2" 
//       strokeLinecap="round" 
//       strokeLinejoin="round" 
//       className={className || ""}
//     >
//       <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
//     </svg>
//   );
// };

// // Sample challenge data
// const initialChallenges: Challenge[] = [
//   {
//     id: 1,
//     title: "10K Steps Daily",
//     description: "Walk 10,000 steps every day for a week. Track your steps using a fitness tracker or smartphone app.",
//     category: "Physical",
//     difficulty: "Medium",
//     participants: 248,
//     duration: "7 days",
//     rewards: "150 wellness points",
//     completed: false,
//     progress: 0,
//     startDate: "Apr 22, 2025",
//     daysLeft: 4,
//   },
//   {
//     id: 2,
//     title: "Mindful Minutes",
//     description: "Complete 10 minutes of meditation for 5 consecutive days. Use any meditation technique that works for you.",
//     category: "Mental",
//     difficulty: "Easy",
//     participants: 173,
//     duration: "5 days",
//     rewards: "100 wellness points",
//     completed: false,
//     progress: 0,
//     startDate: "Apr 23, 2025",
//     daysLeft: 5,
//   },
//   {
//     id: 3,
//     title: "Hydration Hero",
//     description: "Drink 8 glasses of water daily for 10 days. Track your water intake using the app or manual logging.",
//     category: "Nutrition",
//     difficulty: "Easy",
//     participants: 312,
//     duration: "10 days",
//     rewards: "200 wellness points",
//     completed: false,
//     progress: 0,
//     startDate: "Apr 20, 2025",
//     daysLeft: 5,
//   },
//   {
//     id: 4,
//     title: "Sleep Champion",
//     description: "Get 8 hours of sleep for 14 consecutive nights. Use sleep tracker for accurate measurement.",
//     category: "Sleep",
//     difficulty: "Hard",
//     participants: 96,
//     duration: "14 days",
//     rewards: "300 wellness points + Sleep Badge",
//     completed: false,
//     progress: 0,
//     startDate: "Apr 18, 2025",
//     daysLeft: 7,
//   },
//   {
//     id: 5,
//     title: "Sugar Detox",
//     description: "Avoid added sugars and sweetened beverages for 7 days straight. Read labels carefully.",
//     category: "Nutrition",
//     difficulty: "Hard",
//     participants: 87,
//     duration: "7 days",
//     rewards: "200 wellness points + Nutrition Badge",
//     completed: false,
//     progress: 0,
//     startDate: "Apr 24, 2025",
//     daysLeft: 6,
//   },
//   {
//     id: 6,
//     title: "Gratitude Journal",
//     description: "Write down three things you're grateful for every day for 21 days. Reflect on positive aspects of your life.",
//     category: "Mental",
//     difficulty: "Medium",
//     participants: 134,
//     duration: "21 days",
//     rewards: "250 wellness points",
//     completed: false,
//     progress: 0,
//     startDate: "Apr 15, 2025",
//     daysLeft: 11,
//   },
// ];

// // Mock user data
// const userData: UserData = {
//   name: "Alex Johnson",
//   points: 750,
//   rank: "Wellness Warrior",
//   completedChallenges: 12,
//   badges: ["Early Riser", "Meditation Master", "Step Champion"],
//   avatar: "/api/placeholder/40/40",
//   streakDays: 15,
//   nextReward: 1000,
//   progress: 75,
// };

// // Category badges mapping with index signature
// const categoryIcons: { [key: string]: React.ReactElement } = {
//   Physical: <TrendingUp className="mr-2" size={16} />,
//   Mental: <Heart className="mr-2" size={16} />,
//   Nutrition: <Award className="mr-2" size={16} />,
//   Sleep: <Clock className="mr-2" size={16} />,
// };

// // Difficulty color mapping with index signature
// const difficultyColors: { [key: string]: string } = {
//   Easy: "bg-green-100 text-green-800",
//   Medium: "bg-yellow-100 text-yellow-800",
//   Hard: "bg-red-100 text-red-800",
// };

// // Mock badge data
// const badgesData: BadgeData[] = [
//   { 
//     name: "Early Riser", 
//     icon: <Clock size={24} className="text-blue-500" />, 
//     description: "Wake up before 6 AM for 10 days",
//     unlocked: true,
//     progress: 10,
//     total: 10
//   },
//   { 
//     name: "Meditation Master", 
//     icon: <Heart size={24} className="text-purple-500" />, 
//     description: "Complete 30 meditation sessions",
//     unlocked: true,
//     progress: 30,
//     total: 30
//   },
//   { 
//     name: "Step Champion", 
//     icon: <TrendingUp size={24} className="text-green-500" />, 
//     description: "Walk 10,000 steps daily for 14 days",
//     unlocked: true,
//     progress: 14,
//     total: 14
//   },
//   { 
//     name: "Nutrition Expert", 
//     icon: <Award size={24} className="text-yellow-500" />, 
//     description: "Complete 5 nutrition challenges",
//     unlocked: false,
//     progress: 3,
//     total: 5
//   },
//   { 
//     name: "Sleep Master", 
//     icon: <Moon size={24} className="text-indigo-500" />, 
//     description: "Complete the Sleep Champion challenge",
//     unlocked: false,
//     progress: 0,
//     total: 1
//   },
//   { 
//     name: "30-Day Streak", 
//     icon: <Flame size={24} className="text-orange-500" />, 
//     description: "Log into the app for 30 consecutive days",
//     unlocked: false,
//     progress: 15,
//     total: 30
//   },
// ];

// // Activity data for chart
// const activityData = [
//   { day: 'Mon', steps: 8500, meditation: 12, water: 7 },
//   { day: 'Tue', steps: 9200, meditation: 10, water: 8 },
//   { day: 'Wed', steps: 7800, meditation: 15, water: 6 },
//   { day: 'Thu', steps: 10300, meditation: 8, water: 9 },
//   { day: 'Fri', steps: 9700, meditation: 12, water: 8 },
//   { day: 'Sat', steps: 11200, meditation: 5, water: 5 },
//   { day: 'Sun', steps: 8900, meditation: 20, water: 10 },
// ];

// const ChallengeArena: React.FC = () => {
//   const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);
//   const [activeFilter, setActiveFilter] = useState<string>("All");
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
//   const [leaderboardVisible, setLeaderboardVisible] = useState<boolean>(false);
//   const [statsVisible, setStatsVisible] = useState<boolean>(false);
//   const [badgesVisible, setBadgesVisible] = useState<boolean>(false);
//   const [sortBy, setSortBy] = useState<string>("popular");
//   const [notifications, setNotifications] = useState<string[]>([
//     "New Sleep Challenge available",
//     "You've earned the 'Consistent Tracker' badge!",
//     "Sarah just completed the '10K Steps' challenge"
//   ]);
//   const [showNotifications, setShowNotifications] = useState<boolean>(false);
//   const [themeColor, setThemeColor] = useState<string>("indigo");

//   // Mock leaderboard data
//   const leaderboardData: LeaderboardEntry[] = [
//     { name: "Emma Wilson", points: 1450, rank: 1, badges: 15, avatar: "/api/placeholder/40/40" },
//     { name: "Michael Chen", points: 1320, rank: 2, badges: 12, avatar: "/api/placeholder/40/40" },
//     { name: "Sarah Ahmed", points: 1180, rank: 3, badges: 10, avatar: "/api/placeholder/40/40" },
//     { name: userData.name, points: userData.points, rank: 8, badges: 5, avatar: userData.avatar },
//     { name: "James Miller", points: 680, rank: 9, badges: 4, avatar: "/api/placeholder/40/40" },
//     { name: "Olivia Garcia", points: 610, rank: 10, badges: 3, avatar: "/api/placeholder/40/40" },
//   ];

//   // Theme colors mapping
//   interface ThemeColor {
//     primary: string;
//     secondary: string;
//     accent: string;
//     light: string;
//     border: string;
//     progress: string;
//   }

//   const themeColors: { [key: string]: ThemeColor } = {
//     indigo: {
//       primary: "bg-indigo-600 hover:bg-indigo-700",
//       secondary: "bg-indigo-100 hover:bg-indigo-200 text-indigo-800",
//       accent: "text-indigo-600 hover:text-indigo-700",
//       light: "bg-indigo-50",
//       border: "border-indigo-200",
//       progress: "bg-indigo-500",
//     },
//     blue: {
//       primary: "bg-blue-600 hover:bg-blue-700",
//       secondary: "bg-blue-100 hover:bg-blue-200 text-blue-800",
//       accent: "text-blue-600 hover:text-blue-700",
//       light: "bg-blue-50",
//       border: "border-blue-200",
//       progress: "bg-blue-500",
//     },
//     green: {
//       primary: "bg-green-600 hover:bg-green-700",
//       secondary: "bg-green-100 hover:bg-green-200 text-green-800",
//       accent: "text-green-600 hover:text-green-700",
//       light: "bg-green-50",
//       border: "border-green-200",
//       progress: "bg-green-500",
//     },
//     purple: {
//       primary: "bg-purple-600 hover:bg-purple-700",
//       secondary: "bg-purple-100 hover:bg-purple-200 text-purple-800",
//       accent: "text-purple-600 hover:text-purple-700",
//       light: "bg-purple-50",
//       border: "border-purple-200",
//       progress: "bg-purple-500",
//     },
//   };

//   // Animation effect for loading
//   useEffect(() => {
//     const timer = setTimeout(() => {}, 500);
//     return () => clearTimeout(timer);
//   }, []);

//   // Filter and sort challenges
//   const getFilteredAndSortedChallenges = () => {
//     let filtered = challenges.filter((challenge: Challenge) => {
//       if (activeFilter !== "All" && challenge.category !== activeFilter) return false;
//       if (searchTerm && !challenge.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
//       return true;
//     });

//     if (sortBy === "popular") {
//       filtered = filtered.sort((a, b) => b.participants - a.participants);
//     } else if (sortBy === "newest") {
//       filtered = filtered.sort((a, b) => (b.startDate ? new Date(b.startDate).getTime() : 0) - (a.startDate ? new Date(a.startDate).getTime() : 0));
//     } else if (sortBy === "easiest") {
//       const difficultyWeight: { [key: string]: number } = { "Easy": 1, "Medium": 2, "Hard": 3 };
//       filtered = filtered.sort((a, b) => difficultyWeight[a.difficulty] - difficultyWeight[b.difficulty]);
//     } else if (sortBy === "hardest") {
//       const difficultyWeight: { [key: string]: number } = { "Easy": 1, "Medium": 2, "Hard": 3 };
//       filtered = filtered.sort((a, b) => difficultyWeight[b.difficulty] - difficultyWeight[a.difficulty]);
//     }

//     return filtered;
//   };

//   const filteredChallenges = getFilteredAndSortedChallenges();

//   // Join or update challenge progress
//   const handleJoinChallenge = (id: number) => {
//     setChallenges(
//       challenges.map((challenge: Challenge) => {
//         if (challenge.id === id) {
//           const newProgress = challenge.progress === 0 ? 10 : Math.min(challenge.progress + 20, 100);
//           const wasCompleted = challenge.completed;
//           const isCompleted = newProgress >= 100;
          
//           if (!wasCompleted && isCompleted) {
//             setNotifications(prev => [`You completed the "${challenge.title}" challenge!`, ...prev]);
//           }
          
//           return {
//             ...challenge,
//             progress: newProgress,
//             completed: isCompleted,
//           };
//         }
//         return challenge;
//       })
//     );
//   };

//   // Open challenge details modal
//   const openChallengeDetails = (challenge: Challenge) => {
//     setSelectedChallenge(challenge);
//     setShowModal(true);
//   };

//   // Clear all notifications
//   const clearNotifications = () => {
//     setNotifications([]);
//     setShowNotifications(false);
//   };

//   // Toggle theme color
//   const changeTheme = (color: string) => {
//     setThemeColor(color);
//   };

//   return (
//     <div className={`min-h-screen p-6 font-sans bg-gradient-to-br from-${themeColor}-50 via-white to-${themeColor}-50`}>
//       {/* Hero Section */}
//       <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
//         <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 opacity-50"></div>
//         <div className="relative p-8 text-center">
//           <h1 className={`text-4xl font-extrabold text-${themeColor}-700 mb-4 animate-fade-in`}>
//             Welcome to Challenge Arena
//           </h1>
//           <p className="text-gray-700 text-lg max-w-2xl mx-auto mb-6">
//             Embark on a transformative wellness journey! Complete exciting challenges, earn rewards, and become the best version of yourself.
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <button
//               onClick={() => setStatsVisible(true)}
//               className={`${themeColors[themeColor].primary} text-white px-6 py-3 rounded-full font-semibold transform hover:scale-105 transition-all shadow-md`}
//             >
//               View Your Stats
//             </button>
//             <button
//               onClick={() => setBadgesVisible(true)}
//               className={`${themeColors[themeColor].secondary} px-6 py-3 rounded-full font-semibold transform hover:scale-105 transition-all shadow-md`}
//             >
//               See Your Badges
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Header Section */}
//       <div className="mb-8 flex flex-col md:flex-row justify-between items-center bg-white rounded-xl shadow-md p-6">
//         <div className="text-center md:text-left mb-4 md:mb-0">
//           <h2 className={`text-2xl font-bold text-${themeColor}-700 flex items-center justify-center md:justify-start`}>
//             <Trophy className={`mr-2 text-${themeColor}-600`} size={28} />
//             Challenge Arena
//           </h2>
//           <p className="text-gray-600 mt-1">Track progress, join challenges, and earn rewards</p>
//         </div>
        
//         <div className="flex flex-col sm:flex-row items-center gap-4">
//           {/* Theme Selector */}
//           <div className="flex gap-2">
//             {['indigo', 'blue', 'green', 'purple'].map(color => (
//               <button
//                 key={color}
//                 onClick={() => changeTheme(color)}
//                 className={`w-8 h-8 rounded-full bg-${color}-500 hover:ring-2 ring-offset-2 ring-${color}-300 transition-all transform hover:scale-110 shadow-sm`}
//                 aria-label={`${color} theme`}
//               />
//             ))}
//           </div>
          
//           {/* Notifications */}
//           <div className="relative">
//             <button
//               onClick={() => setShowNotifications(!showNotifications)}
//               className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors shadow-sm"
//               aria-label="Notifications"
//             >
//               <Bell size={20} className={`text-${themeColor}-600`} />
//               {notifications.length > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
//                   {notifications.length}
//                 </span>
//               )}
//             </button>
//             {showNotifications && notifications.length > 0 && (
//               <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-10 border border-gray-200">
//                 <div className="p-4 flex justify-between items-center border-b border-gray-100">
//                   <h3 className="font-semibold text-gray-800">Notifications</h3>
//                   <button
//                     onClick={clearNotifications}
//                     className="text-sm text-gray-500 hover:text-gray-700"
//                   >
//                     Clear All
//                   </button>
//                 </div>
//                 <div className="max-h-64 overflow-y-auto">
//                   {notifications.map((notification, index) => (
//                     <div key={index} className="p-4 border-b border-gray-100 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
//                       {notification}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
          
//           {/* User Profile */}
//           <div className="flex items-center bg-gray-50 px-4 py-2 rounded-full shadow-sm">
//             <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold mr-3">
//               AJ
//             </div>
//             <div>
//               <span className="font-semibold text-gray-800 block">{userData.name}</span>
//               <div className="flex items-center text-sm text-gray-600">
//                 <Trophy size={16} className="text-yellow-500 mr-1" />
//                 <span>{userData.points} Points</span>
//               </div>
//             </div>
//           </div>
          
//           {/* Navigation */}
//           <div className="flex gap-2">
//             <button
//               onClick={() => {
//                 setLeaderboardVisible(true);
//                 setStatsVisible(false);
//                 setBadgesVisible(false);
//               }}
//               className={`${themeColors[themeColor].primary} text-white px-4 py-2 rounded-full flex items-center transform hover:scale-105 transition-all shadow-sm`}
//             >
//               <Medal size={16} className="mr-2" />
//               Rankings
//             </button>
//             <button
//               onClick={() => {
//                 setStatsVisible(true);
//                 setLeaderboardVisible(false);
//                 setBadgesVisible(false);
//               }}
//               className={`${themeColors[themeColor].secondary} px-4 py-2 rounded-full flex items-center transform hover:scale-105 transition-all shadow-sm`}
//             >
//               <BarChart2 size={16} className="mr-2" />
//               Stats
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Leaderboard Panel */}
//       {leaderboardVisible && (
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8 relative border-t-4 border-yellow-400 animate-slide-in">
//           <button
//             onClick={() => setLeaderboardVisible(false)}
//             className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
//             aria-label="Close leaderboard"
//           >
//             ✕
//           </button>
//           <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
//             <Trophy className="mr-2 text-yellow-500" size={24} />
//             Wellness Champions
//           </h2>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className={`bg-${themeColor}-50`}>
//                   <th className="py-3 px-4 text-left text-gray-700 font-semibold">Rank</th>
//                   <th className="py-3 px-4 text-left text-gray-700 font-semibold">User</th>
//                   <th className="py-3 px-4 text-left text-gray-700 font-semibold">Points</th>
//                   <th className="py-3 px-4 text-left text-gray-700 font-semibold">Badges</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {leaderboardData.map((user: LeaderboardEntry, index: number) => (
//                   <tr
//                     key={index}
//                     className={`${user.name === userData.name ? `bg-${themeColor}-100` : index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-gray-100 transition-colors`}
//                   >
//                     <td className="py-3 px-4">
//                       {user.rank <= 3 ? (
//                         <span
//                           className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
//                             user.rank === 1
//                               ? 'bg-yellow-100 text-yellow-700'
//                               : user.rank === 2
//                               ? 'bg-gray-200 text-gray-700'
//                               : 'bg-amber-100 text-amber-700'
//                           }`}
//                         >
//                           {user.rank}
//                         </span>
//                       ) : (
//                         user.rank
//                       )}
//                     </td>
//                     <td className="py-3 px-4 font-medium flex items-center">
//                       <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold mr-3">
//                         {user.name.split(' ').map(n => n[0]).join('')}
//                       </div>
//                       {user.name}
//                       {user.name === userData.name && <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">You</span>}
//                     </td>
//                     <td className="py-3 px-4">{user.points}</td>
//                     <td className="py-3 px-4">
//                       <div className="flex items-center">
//                         <Star size={16} className="text-yellow-500 mr-1" />
//                         {user.badges}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600 mb-3">You are <span className="font-semibold">250 points</span> away from reaching the next rank!</p>
//             <div className="w-full bg-gray-200 rounded-full h-2.5">
//               <div className={`${themeColors[themeColor].progress} h-2.5 rounded-full`} style={{ width: "75%" }}></div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Stats Panel */}
//       {statsVisible && (
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8 relative border-t-4 border-blue-500 animate-slide-in">
//           <button
//             onClick={() => setStatsVisible(false)}
//             className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
//             aria-label="Close stats"
//           >
//             ✕
//           </button>
//           <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
//             <BarChart2 className="mr-2 text-blue-500" size={24} />
//             Your Activity Stats
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
//               <h3 className="font-semibold mb-2 text-gray-800">Weekly Steps</h3>
//               <div className="h-40 flex items-end space-x-2">
//                 {activityData.map((day, index) => (
//                   <div key={index} className="flex flex-col items-center flex-1">
//                     <div className="w-full bg-blue-200 rounded-t" style={{ height: `${day.steps / 150}px` }}></div>
//                     <span className="text-xs mt-1 text-gray-600">{day.day}</span>
//                   </div>
//                 ))}
//               </div>
//               <div className="text-center mt-2 text-sm text-gray-600">Daily Steps</div>
//             </div>
//             <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
//               <h3 className="font-semibold mb-2 text-gray-800">Meditation</h3>
//               <div className="h-40 flex items-end space-x-2">
//                 {activityData.map((day, index) => (
//                   <div key={index} className="flex flex-col items-center flex-1">
//                     <div className="w-full bg-purple-200 rounded-t" style={{ height: `${day.meditation * 2}px` }}></div>
//                     <span className="text-xs mt-1 text-gray-600">{day.day}</span>
//                   </div>
//                 ))}
//               </div>
//               <div className="text-center mt-2 text-sm text-gray-600">Minutes Per Day</div>
//             </div>
//             <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
//               <h3 className="font-semibold mb-2 text-gray-800">Water Intake</h3>
//               <div className="h-40 flex items-end space-x-2">
//                 {activityData.map((day, index) => (
//                   <div key={index} className="flex flex-col items-center flex-1">
//                     <div className="w-full bg-green-200 rounded-t" style={{ height: `${day.water * 4}px` }}></div>
//                     <span className="text-xs mt-1 text-gray-600">{day.day}</span>
//                   </div>
//                 ))}
//               </div>
//               <div className="text-center mt-2 text-sm text-gray-600">Glasses Per Day</div>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//             <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-sm">
//               <div className="text-4xl font-bold text-blue-600 mb-2">{userData.streakDays}</div>
//               <div className="flex items-center text-blue-600">
//                 <Flame className="mr-1" size={16} />
//                 <span>Day Streak</span>
//               </div>
//               <p className="text-sm text-gray-600 mt-2">Keep it going!</p>
//             </div>
//             <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-sm">
//               <div className="text-4xl font-bold text-green-600 mb-2">{userData.completedChallenges}</div>
//               <div className="flex items-center text-green-600">
//                 <Check className="mr-1" size={16} />
//                 <span>Challenges Done</span>
//               </div>
//               <p className="text-sm text-gray-600 mt-2">Amazing work!</p>
//             </div>
//             <div className="bg-purple-50 rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-sm">
//               <div className="text-4xl font-bold text-purple-600 mb-2">{userData.badges.length}</div>
//               <div className="flex items-center text-purple-600">
//                 <Award className="mr-1" size={16} />
//                 <span>Badges Earned</span>
//               </div>
//               <p className="text-sm text-gray-600 mt-2">Collect more!</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Badges Panel */}
//       {badgesVisible && (
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8 relative border-t-4 border-purple-500 animate-slide-in">
//           <button
//             onClick={() => setBadgesVisible(false)}
//             className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
//             aria-label="Close badges"
//           >
//             ✕
//           </button>
//           <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
//             <Award className="mr-2 text-purple-500" size={24} />
//             Your Achievement Badges
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {badgesData.map((badge, index) => (
//               <div
//                 key={index}
//                 className={`p-4 flex items-center rounded-lg ${badge.unlocked ? 'bg-white' : 'bg-gray-50'} shadow-sm border-l-4 ${badge.unlocked ? 'border-green-500' : 'border-gray-300'} transform hover:scale-105 transition-transform`}
//               >
//                 <div className={`p-3 rounded-full ${badge.unlocked ? 'bg-green-100' : 'bg-gray-200'} mr-4`}>
//                   {badge.icon}
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-800 flex items-center">
//                     {badge.name}
//                     {badge.unlocked && <Check size={16} className="ml-2 text-green-500" />}
//                   </h3>
//                   <p className="text-sm text-gray-600">{badge.description}</p>
//                   <div className="mt-2">
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                       <div
//                         className={`${badge.unlocked ? 'bg-green-500' : themeColors[themeColor].progress} h-2 rounded-full`}
//                         style={{ width: `${(badge.progress / badge.total) * 100}%` }}
//                       ></div>
//                     </div>
//                     <div className="text-xs text-gray-500 mt-1 text-right">
//                       {badge.progress}/{badge.total}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="mt-6 p-4 bg-purple-50 rounded-lg text-center shadow-sm">
//             <h3 className="font-semibold text-purple-600 mb-2">Next Badge Unlock</h3>
//             <p className="text-gray-600">Complete 2 more nutrition challenges to earn the "Nutrition Expert" badge!</p>
//             <button className={`mt-3 ${themeColors[themeColor].primary} text-white px-6 py-2 rounded-full transform hover:scale-105 transition-all shadow-sm`}>
//               View Nutrition Challenges
//             </button>
//           </div>
//         </div>
//       )}

//       {/* User Progress Summary */}
//       <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-t-4 border-green-500">
//         <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
//           <PieChart className="mr-2 text-green-500" size={20} />
//           Your Wellness Journey
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
//           {[
//             { icon: <Trophy size={20} className="text-indigo-600" />, label: "Current Rank", value: userData.rank, bg: "bg-indigo-50" },
//             { icon: <Award size={20} className="text-green-600" />, label: "Completed", value: `${userData.completedChallenges} Challenges`, bg: "bg-green-50" },
//             { icon: <Star size={20} className="text-blue-600" />, label: "Badges", value: userData.badges.length, bg: "bg-blue-50" },
//             { icon: <Target size={20} className="text-purple-600" />, label: "Next Milestone", value: `${userData.nextReward} Points`, bg: "bg-purple-50" },
//             { icon: <Flame size={20} className="text-orange-600" />, label: "Current Streak", value: `${userData.streakDays} Days`, bg: "bg-orange-50" },
//           ].map((item, index) => (
//             <div key={index} className={`${item.bg} p-4 rounded-lg transform hover:scale-105 transition-transform shadow-sm`}>
//               <div className="flex items-center">
//                 <div className={`p-3 rounded-full ${item.bg.replace('50', '100')}`}>
//                   {item.icon}
//                 </div>
//                 <div className="ml-4">
//                   <p className="text-sm text-gray-600">{item.label}</p>
//                   <p className="font-medium text-gray-800">{item.value}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="mt-6">
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-sm text-gray-600">Progress to next milestone:</span>
//             <span className="text-sm font-medium text-gray-800">{userData.points}/{userData.nextReward} points</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2.5">
//             <div
//               className={`${themeColors[themeColor].progress} h-2.5 rounded-full`}
//               style={{ width: `${(userData.points / userData.nextReward) * 100}%` }
//             }></div>
//           </div>
//           <div className="flex justify-end mt-2">
//             <div className="text-xs text-gray-500 flex items-center">
//               <Gift size={14} className="mr-1" />
//               <span>Next reward at {userData.nextReward} points</span>
//             </div>
//           </div>
//           <div className="text-right text-sm text-gray-600">
//             {userData.progress}% Complete
//           </div>
//         </div>
//       </div>

//       {/* Filters and Sort Section */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white rounded-xl shadow-sm p-4">
//         <div className="flex flex-col sm:flex-row gap-4 mb-4 md:mb-0 w-full md:w-auto">
//           <div className="flex items-center bg-gray-50 rounded-lg shadow-sm">
//             <Filter size={18} className="text-gray-400 ml-3" />
//             <div className="flex overflow-x-auto space-x-1 p-1">
//               {["All", "Physical", "Mental", "Nutrition", "Sleep"].map((category: string) => (
//                 <button
//                   key={category}
//                   className={`px-4 py-2 rounded-lg ${
//                     activeFilter === category 
//                       ? `${themeColors[themeColor].primary} text-white` 
//                       : 'bg-white text-gray-700 hover:bg-gray-100'
//                   } transition-colors transform hover:scale-105 shadow-sm whitespace-nowrap`}
//                   onClick={() => setActiveFilter(category)}
//                 >
//                   {category !== 'All' && categoryIcons[category]}
//                   {category}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="bg-gray-50 rounded-lg px-4 py-2 text-gray-700 focus:outline-none shadow-sm"
//           >
//             <option value="popular">Most Popular</option>
//             <option value="newest">Newest First</option>
//             <option value="easiest">Easiest First</option>
//             <option value="hardest">Hardest First</option>
//           </select>
//         </div>
//         <div className="relative w-full md:w-64">
//           <input
//             type="text"
//             placeholder="Search challenges..."
//             className="pl-10 pr-4 py-2 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full shadow-sm"
//             value={searchTerm}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
//           />
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5 absolute left-3 top-2.5 text-gray-400"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//             />
//           </svg>
//         </div>
//       </div>

//       {/* Featured Challenge */}
//       {filteredChallenges.length > 0 && (
//         <div className={`bg-gradient-to-r from-${themeColor}-500 to-${themeColor}-600 text-white rounded-xl shadow-lg mb-8 grid grid-cols-1 md:grid-cols-3 overflow-hidden`}>
//           <div className="p-6 md:col-span-2">
//             <div className="flex items-center mb-2">
//               <Trophy size={24} className="mr-2" />
//               <span className="font-semibold uppercase tracking-wide text-xs">Featured Challenge</span>
//             </div>
//             <h2 className="text-2xl font-bold mb-2">Sleep Champion</h2>
//             <p className="mb-4 text-gray-100">Get 8 hours of sleep for 14 consecutive nights. Use sleep tracker for accurate measurement.</p>
//             <div className="flex flex-wrap items-center gap-4 mb-4">
//               <div className="flex items-center">
//                 <Users size={16} className="mr-1" />
//                 <span>96 participants</span>
//               </div>
//               <div className="flex items-center">
//                 <Clock size={16} className="mr-1" />
//                 <span>14 days</span>
//               </div>
//               <div className="bg-white text-indigo-600 px-2 py-1 text-xs font-medium rounded">Hard</div>
//             </div>
//             <div className="flex flex-wrap items-center gap-4">
//               <button
//                 onClick={() => openChallengeDetails(challenges[3])}
//                 className="bg-white text-indigo-600 px-6 py-2 rounded-full font-medium hover:bg-indigo-50 transition-colors transform hover:scale-105 shadow-sm"
//               >
//                 View Details
//               </button>
//               <button
//                 onClick={() => handleJoinChallenge(4)}
//                 className="bg-indigo-700 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-800 transition-colors transform hover:scale-105 shadow-sm"
//               >
//                 Join Challenge
//               </button>
//             </div>
//           </div>
//           <div className="hidden md:flex items-center justify-center p-6 bg-indigo-600">
//             <div className="text-center">
//               <div className="text-5xl font-bold mb-2">300</div>
//               <div className="text-indigo-100">wellness points</div>
//               <div className="mt-4 bg-white text-indigo-600 px-3 py-1 rounded-full inline-flex items-center shadow-sm">
//                 <Award size={16} className="mr-1" />
//                 Sleep Badge
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Challenge Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredChallenges.map((challenge: Challenge) => (
//           <div
//             key={challenge.id}
//             className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105"
//             style={{ 
//               borderTop: `4px solid ${
//                 challenge.category === 'Physical' ? '#3B82F6' :
//                 challenge.category === 'Mental' ? '#8B5CF6' :
//                 challenge.category === 'Nutrition' ? '#10B981' : '#6366F1'
//               }`
//             }}
//           >
//             <div className="p-6">
//               <div className="flex justify-between items-start mb-3">
//                 <h3 className="font-bold text-lg text-gray-800">{challenge.title}</h3>
//                 <span className={`text-xs px-2 py-1 rounded ${difficultyColors[challenge.difficulty]}`}>
//                   {challenge.difficulty}
//                 </span>
//               </div>
//               <p className="text-gray-600 text-sm mb-4 line-clamp-2">{challenge.description}</p>
//               <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
//                 <div className="flex items-center">
//                   <Clock size={16} className="mr-1" />
//                   <span>{challenge.duration}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <Users size={16} className="mr-1" />
//                   <span>{challenge.participants} joined</span>
//                 </div>
//               </div>
//               {challenge.daysLeft && challenge.progress === 0 && (
//                 <div className="mb-4 flex items-center justify-between bg-blue-50 p-2 rounded-lg text-xs text-blue-600">
//                   <div className="flex items-center">
//                     <Calendar size={14} className="mr-1" />
//                     <span>Started {challenge.startDate}</span>
//                   </div>
//                   <div className="font-medium">{challenge.daysLeft} days left</div>
//                 </div>
//               )}
//               <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
//                 <div
//                   className={`h-2.5 rounded-full ${challenge.completed ? 'bg-green-500' : themeColors[themeColor].progress}`}
//                   style={{ width: `${challenge.progress}%` }}
//                 ></div>
//               </div>
//               <div className="flex items-center justify-between">
//                 <button
//                   className={`${themeColors[themeColor].accent} text-sm font-medium hover:underline`}
//                   onClick={() => openChallengeDetails(challenge)}
//                 >
//                   View Details
//                 </button>
//                 <button
//                   onClick={() => handleJoinChallenge(challenge.id)}
//                   className={`${
//                     challenge.progress === 0
//                       ? themeColors[themeColor].primary + ' text-white'
//                       : challenge.completed
//                       ? 'bg-green-500 hover:bg-green-600 text-white'
//                       : themeColors[themeColor].secondary
//                   } px-4 py-2 rounded-full text-sm font-medium transition-colors transform hover:scale-105 shadow-sm`}
//                 >
//                   {challenge.progress === 0
//                     ? 'Join Challenge'
//                     : challenge.completed
//                     ? 'Completed!'
//                     : `${challenge.progress}% Complete`}
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* No results message */}
//       {filteredChallenges.length === 0 && (
//         <div className="bg-white rounded-xl p-8 text-center shadow-md">
//           <Target size={48} className="mx-auto text-gray-400 mb-3" />
//           <h3 className="text-xl font-medium text-gray-800 mb-2">No Challenges Found</h3>
//           <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
//           <button
//             onClick={() => {
//               setActiveFilter("All");
//               setSearchTerm("");
//             }}
//             className={`${themeColors[themeColor].primary} text-white px-6 py-2 rounded-full transform hover:scale-105 transition-all shadow-sm`}
//           >
//             Reset Filters
//           </button>
//         </div>
//       )}

//       {/* New Challenge Suggestion */}
//       <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
//         <div className="flex flex-col md:flex-row items-center justify-between">
//           <div className="mb-4 md:mb-0">
//             <h3 className="text-xl font-bold text-gray-800 mb-2">Got a Challenge Idea?</h3>
//             <p className="text-gray-600">Share your creative ideas to inspire our wellness community</p>
//           </div>
//           <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition-colors flex items-center transform hover:scale-105 shadow-sm">
//             <PieChart size={18} className="mr-2" />
//             Suggest a Challenge
//           </button>
//         </div>
//       </div>

//       {/* Challenge Detail Modal */}
//       {showModal && selectedChallenge && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
//           <div className="bg-white rounded-xl max-w-lg w-full shadow-2xl">
//             <div className="border-b border-gray-100 p-6 flex justify-between items-center">
//               <h2 className="text-2xl font-bold text-gray-800">{selectedChallenge.title}</h2>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="text-gray-500 hover:text-gray-700"
//                 aria-label="Close modal"
//               >
//                 ✕
//               </button>
//             </div>
//             <div className="p-6">
//               <div className="flex items-center mb-4">
//                 <span
//                   className={`text-xs px-2 py-1 rounded ${difficultyColors[selectedChallenge.difficulty]} mr-2`}
//                 >
//                   {selectedChallenge.difficulty}
//                 </span>
//                 <span className="flex items-center text-sm text-gray-600">
//                   {categoryIcons[selectedChallenge.category]}
//                   {selectedChallenge.category}
//                 </span>
//               </div>
//               <p className="text-gray-700 mb-6">{selectedChallenge.description}</p>
//               <div className="mb-6">
//                 <h3 className="font-semibold text-gray-800 mb-3">Challenge Details</h3>
//                 <div className="bg-gray-50 rounded-lg p-4 space-y-3 shadow-sm">
//                   <div className="flex items-center justify-between border-b border-gray-100 pb-2">
//                     <span className="text-gray-600 flex items-center"><Clock size={16} className="mr-2" /> Duration:</span>
//                     <span className="font-medium">{selectedChallenge.duration}</span>
//                   </div>
//                   <div className="flex items-center justify-between border-b border-gray-100 pb-2">
//                     <span className="text-gray-600 flex items-center"><Calendar size={16} className="mr-2" /> Start Date:</span>
//                     <span className="font-medium">{selectedChallenge.startDate}</span>
//                   </div>
//                   <div className="flex items-center justify-between border-b border-gray-100 pb-2">
//                     <span className="text-gray-600 flex items-center"><Users size={16} className="mr-2" /> Participants:</span>
//                     <span className="font-medium">{selectedChallenge.participants}</span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-gray-600 flex items-center"><Award size={16} className="mr-2" /> Rewards:</span>
//                     <span className={`font-medium text-${themeColor}-600`}>{selectedChallenge.rewards}</span>
//                   </div>
//                 </div>
//               </div>
//               <div className="mb-6">
//                 <h3 className="font-semibold text-gray-800 mb-2">Your Progress</h3>
//                 <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
//                   <div
//                     className={`h-3 rounded-full ${selectedChallenge.completed ? 'bg-green-500' : themeColors[themeColor].progress}`}
//                     style={{ width: `${selectedChallenge.progress}%` }}
//                   ></div>
//                 </div>
//                 <div className="text-right text-sm text-gray-600">
//                   {selectedChallenge.progress}% Complete
//                 </div>
//               </div>
//               <div className="mb-6">
//                 <h3 className="font-semibold text-gray-800 mb-2">Tips to Succeed</h3>
//                 <ul className={`bg-${themeColor}-50 rounded-lg p-4 text-gray-700 space-y-3 shadow-sm`}>
//                   <li className="flex items-start">
//                     <ThumbsUp size={16} className={`mr-2 text-${themeColor}-600 mt-1 flex-shrink-0`} />
//                     <span>Set a daily reminder to track your progress</span>
//                   </li>
//                   <li className="flex items-start">
//                     <ThumbsUp size={16} className={`mr-2 text-${themeColor}-600 mt-1 flex-shrink-0`} />
//                     <span>Connect with friends to stay motivated</span>
//                   </li>
//                   <li className="flex items-start">
//                     <ThumbsUp size={16} className={`mr-2 text-${themeColor}-600 mt-1 flex-shrink-0`} />
//                     <span>Break the challenge into smaller daily goals</span>
//                   </li>
//                 </ul>
//               </div>
//               <div className="mb-6">
//                 <h3 className="font-semibold text-gray-800 mb-2">Friends Participating</h3>
//                 <div className="flex space-x-2">
//                   <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white text-xs">EM</div>
//                   <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-white text-xs">JD</div>
//                   <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center text-white text-xs">SK</div>
//                   <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs">+2</div>
//                 </div>
//               </div>
//               <div className="flex justify-between">
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="border border-gray-200 px-6 py-2 rounded-full font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
//                 >
//                   Close
//                 </button>
//                 <button
//                   onClick={() => {
//                     handleJoinChallenge(selectedChallenge.id);
//                     setShowModal(false);
//                   }}
//                   className={`${
//                     selectedChallenge.progress === 0
//                       ? themeColors[themeColor].primary + ' text-white'
//                       : selectedChallenge.completed
//                       ? 'bg-green-500 hover:bg-green-600 text-white'
//                       : themeColors[themeColor].secondary
//                   } px-6 py-2 rounded-full font-medium transition-colors transform hover:scale-105 shadow-sm`}
//                 >
//                   {selectedChallenge.progress === 0
//                     ? 'Join Challenge'
//                     : selectedChallenge.completed
//                     ? 'Challenge Completed'
//                     : 'Update Progress'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Custom Animations */}
//       <style jsx>{`
//         @keyframes fade-in {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes slide-in {
//           from { opacity: 0; transform: translateX(20px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
//         .animate-fade-in {
//           animation: fade-in 0.5s ease-out;
//         }
//         .animate-slide-in {
//           animation: slide-in 0.5s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ChallengeArena;


"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Users, Calendar, ArrowRight, Award, Zap, Filter, Search, Star, TrendingUp, Clock, ChevronLeft, ChevronRight, Share2, Heart, Flag, Medal, CheckCircle, Bell, ChevronUp, ChevronDown, X } from 'lucide-react';

// Type definitions
type ChallengeCategory = 'Fitness' | 'Nutrition' | 'Mindfulness' | 'Sleep' | 'Hydration' | 'Social';
type ChallengeDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
type ChallengeStatus = 'upcoming' | 'active' | 'completed';

type Challenge = {
  id: string;
  title: string;
  description: string;
  participants: number;
  duration: string;
  startDate?: string;
  difficulty: ChallengeDifficulty;
  category: ChallengeCategory;
  reward: string;
  progress?: number;
  liked?: boolean;
  featured?: boolean;
  tasks?: ChallengeTask[];
  createdBy?: string;
  status: ChallengeStatus;
  image?: string;
  milestones?: { target: number; reward: string }[];
  leaderboard?: { name: string; score: number; rank: number }[];
};

type ChallengeTask = {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
};

type User = {
  id: string;
  name: string;
  avatar: string;
  level: number;
  points: number;
};

// Sample data
const currentUser: User = {
  id: 'user1',
  name: 'Alex Johnson',
  avatar: '/api/placeholder/40/40',
  level: 7,
  points: 2350
};

const sampleChallenges: Challenge[] = [
  {
    id: 'ch1',
    title: '30-Day Meditation',
    description: 'Practice mindfulness for at least 10 minutes daily for 30 days to improve mental clarity and reduce stress.',
    participants: 2453,
    duration: '30 days',
    startDate: '2025-05-01',
    difficulty: 'Beginner',
    category: 'Mindfulness',
    reward: 'Mindfulness Badge + 500 points',
    featured: false,
    status: 'upcoming',
    tasks: [
      { id: 't1', title: 'Morning meditation (10 min)', completed: false },
      { id: 't2', title: 'Breathing exercises', completed: false },
      { id: 't3', title: 'Gratitude journaling', completed: false }
    ],
    milestones: [
      { target: 10, reward: 'Bronze Meditation Badge' },
      { target: 20, reward: 'Silver Meditation Badge' },
      { target: 30, reward: 'Gold Meditation Badge + 500 points' }
    ]
  },
  {
    id: 'ch2',
    title: '10K Steps Challenge',
    description: 'Complete 10,000 steps daily for two weeks to boost cardiovascular health and build a consistent exercise habit.',
    participants: 5732,
    duration: '14 days',
    startDate: '2025-04-30',
    difficulty: 'Intermediate',
    category: 'Fitness',
    reward: 'Premium Features (1 month)',
    featured: true,
    status: 'active',
    image: '/api/placeholder/400/300',
    tasks: [
      { id: 't1', title: 'Morning walk (5,000 steps)', completed: false },
      { id: 't2', title: 'Afternoon walk (5,000 steps)', completed: false }
    ],
    leaderboard: [
      { name: 'Sarah P.', score: 146532, rank: 1 },
      { name: 'Marcus T.', score: 143210, rank: 2 },
      { name: 'Priya K.', score: 139875, rank: 3 }
    ]
  },
  {
    id: 'ch3',
    title: 'Sleep Improvement',
    description: 'Maintain a consistent sleep schedule for 21 days to enhance sleep quality and overall wellbeing.',
    participants: 1876,
    duration: '21 days',
    startDate: '2025-05-05',
    difficulty: 'Beginner',
    category: 'Sleep',
    reward: 'Sleep Analytics Access',
    featured: false,
    status: 'upcoming',
    tasks: [
      { id: 't1', title: 'Consistent bedtime', completed: false },
      { id: 't2', title: 'No screens 1hr before bed', completed: false },
      { id: 't3', title: 'Morning routine', completed: false }
    ]
  },
  {
    id: 'ch4',
    title: 'Nutrition Overhaul',
    description: 'Log all meals and maintain calorie goals for 30 days to establish healthier eating habits.',
    participants: 3241,
    duration: '30 days',
    startDate: '2025-04-15',
    difficulty: 'Advanced',
    category: 'Nutrition',
    reward: 'Nutritionist Consultation',
    featured: false,
    status: 'active',
    tasks: [
      { id: 't1', title: 'Log breakfast', completed: false },
      { id: 't2', title: 'Log lunch', completed: false },
      { id: 't3', title: 'Log dinner', completed: false },
      { id: 't4', title: 'Stay within calorie goal', completed: false }
    ]
  },
  {
    id: 'ch5',
    title: 'Hydration Challenge',
    description: 'Drink 8 glasses of water daily for 14 days to improve hydration levels and energy.',
    participants: 4127,
    duration: '14 days',
    startDate: '2025-05-10',
    difficulty: 'Beginner',
    category: 'Hydration',
    reward: 'Hydration Tracker Premium',
    featured: false,
    status: 'upcoming',
    tasks: [
      { id: 't1', title: 'Morning water (2 glasses)', completed: false },
      { id: 't2', title: 'Midday water (3 glasses)', completed: false },
      { id: 't3', title: 'Evening water (3 glasses)', completed: false }
    ]
  },
  {
    id: 'ch6',
    title: 'Strength Training Bootcamp',
    description: 'Complete 5 strength training workouts weekly for 4 weeks to build muscle and improve fitness.',
    participants: 2856,
    duration: '28 days',
    startDate: '2025-04-20',
    difficulty: 'Expert',
    category: 'Fitness',
    reward: '1000 Points + Fitness Badge',
    featured: false,
    status: 'active',
    tasks: [
      { id: 't1', title: 'Upper body workout', completed: false },
      { id: 't2', title: 'Lower body workout', completed: false },
      { id: 't3', title: 'Core workout', completed: false },
      { id: 't4', title: 'Active recovery', completed: false }
    ]
  },
  {
    id: 'ch7',
    title: 'Social Wellness Month',
    description: 'Connect with friends or community members regularly for a month to boost social wellness.',
    participants: 1543,
    duration: '30 days',
    startDate: '2025-05-15',
    difficulty: 'Intermediate',
    category: 'Social',
    reward: 'Community Badge',
    featured: false,
    status: 'upcoming',
    tasks: [
      { id: 't1', title: 'Weekly social activity', completed: false },
      { id: 't2', title: 'Daily check-in with friend', completed: false },
      { id: 't3', title: 'Participate in group event', completed: false }
    ]
  },
  {
    id: 'ch8',
    title: 'Plant-Based Week',
    description: 'Try a plant-based diet for one week to explore new foods and environmental benefits.',
    participants: 2187,
    duration: '7 days',
    startDate: '2025-05-03',
    difficulty: 'Intermediate',
    category: 'Nutrition',
    reward: 'Recipe Collection',
    featured: false,
    status: 'upcoming',
    tasks: [
      { id: 't1', title: 'Plant-based breakfast', completed: false },
      { id: 't2', title: 'Plant-based lunch', completed: false },
      { id: 't3', title: 'Plant-based dinner', completed: false }
    ]
  }
];

// Component for challenge cards
const ChallengeCard: React.FC<{ 
  challenge: Challenge; 
  onJoin: (id: string) => void; 
  onLike: (id: string) => void;
  onShare: (id: string) => void;
  joined: boolean;
  expanded: boolean;
  onToggleExpand: () => void;
}> = ({ 
  challenge,
  onJoin,
  onLike,
  onShare,
  joined,
  expanded,
  onToggleExpand
}) => {
  const categoryColors = {
    Fitness: 'bg-blue-100 text-blue-600 border-blue-200',
    Nutrition: 'bg-green-100 text-green-600 border-green-200',
    Mindfulness: 'bg-purple-100 text-purple-600 border-purple-200',
    Sleep: 'bg-indigo-100 text-indigo-600 border-indigo-200',
    Hydration: 'bg-cyan-100 text-cyan-600 border-cyan-200',
    Social: 'bg-pink-100 text-pink-600 border-pink-200'
  };
  
  const difficultyBadge = {
    Beginner: 'bg-green-100 text-green-700',
    Intermediate: 'bg-yellow-100 text-yellow-700',
    Advanced: 'bg-red-100 text-red-700',
    Expert: 'bg-purple-100 text-purple-700'
  };

  const statusIndicator = {
    upcoming: 'bg-yellow-100 text-yellow-700',
    active: 'bg-green-100 text-green-700',
    completed: 'bg-blue-100 text-blue-700'
  };

  const getStatusText = (status: ChallengeStatus) => {
    switch(status) {
      case 'upcoming': return 'Starting Soon';
      case 'active': return 'Active Now';
      case 'completed': return 'Completed';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border-l-4 ${categoryColors[challenge.category].split(' ')[2] || 'border-transparent'}`}>
      <div className={`h-1 ${categoryColors[challenge.category].split(' ')[0]}`}></div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            <span className={`px-2 py-1 text-xs rounded-full mr-2 ${categoryColors[challenge.category]}`}>
              {challenge.category}
            </span>
            <span className={`px-2 py-1 text-xs rounded-full ${statusIndicator[challenge.status]}`}>
              {getStatusText(challenge.status)}
            </span>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${difficultyBadge[challenge.difficulty]}`}>
            {challenge.difficulty}
          </span>
        </div>
        
        <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
        <p className="text-gray-600 mb-4 text-sm">{expanded ? challenge.description : `${challenge.description.substring(0, 80)}...`}</p>
        
        {challenge.image && (
          <div className="mb-4 rounded-md overflow-hidden">
            <img src={challenge.image} alt={challenge.title} className="w-full h-auto" />
          </div>
        )}
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex flex-col items-center text-center">
            <Users className="h-4 w-4 text-gray-500 mb-1" />
            <span className="text-sm font-medium">{challenge.participants.toLocaleString()}</span>
            <span className="text-xs text-gray-500">Participants</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Calendar className="h-4 w-4 text-gray-500 mb-1" />
            <span className="text-sm font-medium">{challenge.duration}</span>
            <span className="text-xs text-gray-500">Duration</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Award className="h-4 w-4 text-gray-500 mb-1" />
            <span className="text-sm font-medium truncate max-w-full">{challenge.reward.split(' + ')[0]}</span>
            <span className="text-xs text-gray-500">Reward</span>
          </div>
        </div>
        
        {expanded && challenge.startDate && (
          <div className="mb-4 p-3 bg-gray-50 rounded-md">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-500 mr-2" />
              <div>
                <span className="text-xs text-gray-500">Start Date</span>
                <p className="text-sm font-medium">{new Date(challenge.startDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        )}
        
        {expanded && challenge.tasks && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Challenge Tasks:</h4>
            <ul className="space-y-1">
              {challenge.tasks.map(task => (
                <li key={task.id} className="text-sm flex items-center">
                  <span className={`mr-2 inline-block w-4 h-4 rounded-full border ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                    {task.completed && <CheckCircle className="h-4 w-4 text-white" />}
                  </span>
                  {task.title}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {expanded && challenge.milestones && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Milestones:</h4>
            <div className="space-y-2">
              {challenge.milestones.map((milestone, idx) => (
                <div key={idx} className="bg-gray-50 p-2 rounded-md flex justify-between items-center">
                  <div className="flex items-center">
                    <Flag className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm">{milestone.target} days</span>
                  </div>
                  <span className="text-xs text-gray-600">{milestone.reward}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {expanded && challenge.leaderboard && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Leaderboard:</h4>
            <div className="bg-gray-50 rounded-md overflow-hidden">
              {challenge.leaderboard.map((entry, idx) => (
                <div key={idx} className={`flex justify-between items-center p-2 ${idx % 2 === 0 ? 'bg-gray-100' : ''}`}>
                  <div className="flex items-center">
                    <span className="text-sm font-medium w-6 text-center">{entry.rank}</span>
                    <span className="text-sm ml-2">{entry.name}</span>
                  </div>
                  <span className="text-sm font-medium">{entry.score.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {joined && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium">Your Progress</span>
              <span className="text-xs font-medium">{challenge.progress || 0}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" 
                style={{ width: `${challenge.progress || 0}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <div className="flex space-x-2">
          <button
            onClick={() => onJoin(challenge.id)}
            className={`flex-1 py-2 rounded-md flex items-center justify-center gap-1 transition-all text-sm ${
              joined
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
            }`}
          >
            {joined ? 'View Details' : 'Join Challenge'}
            <ArrowRight className="h-3 w-3" />
          </button>
          
          <button 
            onClick={() => onToggleExpand()}
            className="px-2 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md transition-all"
          >
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          
          <button 
            onClick={() => onLike(challenge.id)}
            className={`px-2 py-2 ${challenge.liked ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-700'} hover:bg-gray-200 rounded-md transition-all`}
          >
            <Heart className={`h-4 w-4 ${challenge.liked ? 'fill-current' : ''}`} />
          </button>
          
          <button 
            onClick={() => onShare(challenge.id)}
            className="px-2 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md transition-all"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Filter button component
const FilterButton: React.FC<{ 
  active: boolean; 
  onClick: () => void; 
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded-md mr-2 mb-2 text-sm transition-all ${
      active 
        ? 'bg-blue-600 text-white' 
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`}
  >
    {children}
  </button>
);

// TabButton component
const TabButton: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  count?: number;
}> = ({ active, onClick, children, count }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 transition-all border-b-2 ${
      active
        ? 'border-blue-600 text-blue-600 font-medium'
        : 'border-transparent text-gray-600 hover:text-gray-800'
    }`}
  >
    <div className="flex items-center">
      {children}
      {count !== undefined && (
        <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${active ? 'bg-blue-100' : 'bg-gray-100'}`}>
          {count}
        </span>
      )}
    </div>
  </button>
);

// Featured Challenge Carousel
const FeaturedChallengeCarousel: React.FC<{
  challenges: Challenge[];
  onJoin: (id: string) => void;
}> = ({ challenges, onJoin }) => {
  const featuredChallenges = challenges.filter(c => c.featured);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Auto-rotate carousel
    timerRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % featuredChallenges.length);
    }, 5000);
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [featuredChallenges.length]);

  const nextSlide = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentIndex(prev => (prev + 1) % featuredChallenges.length);
  };

  const prevSlide = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentIndex(prev => (prev - 1 + featuredChallenges.length) % featuredChallenges.length);
  };

  if (featuredChallenges.length === 0) return null;

  const challenge = featuredChallenges[currentIndex];

  return (
    <div className="mb-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl overflow-hidden shadow-xl relative">
    <div className="absolute top-1/2 left-4 -translate-y-1/2 z-10">
      <button 
        onClick={prevSlide}
        className="bg-white bg-opacity-30 hover:bg-opacity-40 rounded-full p-2 text-white transition-all"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
    </div>
    <div className="absolute top-1/2 right-4 -translate-y-1/2 z-10">
      <button 
        onClick={nextSlide}
        className="bg-white bg-opacity-30 hover:bg-opacity-40 rounded-full p-2 text-white transition-all"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
    <div className="p-8 md:p-12 flex flex-col md:flex-row items-center">
      <div className="w-full md:w-2/3 text-white mb-8 md:mb-0">
        <div className="flex items-center mb-4">
          <Zap className="h-6 w-6 mr-2" />
          <span className="text-sm font-medium uppercase tracking-wider">Featured Challenge</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-4">{challenge.title}</h3>
        <p className="mb-6 opacity-90">{challenge.description}</p>
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="bg-white bg-opacity-20 px-4 py-2 rounded-md">
            <span className="text-sm font-medium">{challenge.participants.toLocaleString()} Participants</span>
          </div>
          <div className="bg-white bg-opacity-20 px-4 py-2 rounded-md">
            <span className="text-sm font-medium">{challenge.duration}</span>
          </div>
          <div className="bg-white bg-opacity-20 px-4 py-2 rounded-md">
            <span className="text-sm font-medium">{challenge.reward}</span>
          </div>
        </div>
        <button 
          onClick={() => onJoin(challenge.id)}
          className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md font-medium transition-all flex items-center gap-2"
        >
          Join Featured Challenge <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <div className="w-full md:w-1/3 flex justify-center">
        <img src={challenge.image || "/api/placeholder/300/300"} alt={challenge.title} className="rounded-lg" />
      </div>
    </div>
    {/* Carousel indicators */}
    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
      {featuredChallenges.map((_, idx) => (
        <button 
          key={idx}
          onClick={() => setCurrentIndex(idx)}
          className={`w-2 h-2 rounded-full mx-1 ${
            idx === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
          }`}
        />
      ))}
    </div>
  </div>
  );
};

// Create Challenge Modal
const CreateChallengeModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (challenge: Partial<Challenge>) => void;
}> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ChallengeCategory>('Fitness');
  const [difficulty, setDifficulty] = useState<ChallengeDifficulty>('Beginner');
  const [duration, setDuration] = useState('7 days');
  const [startDate, setStartDate] = useState('');
  const [reward, setReward] = useState('');
  const [tasks, setTasks] = useState<Array<{title: string}>>([{title: ''}]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredTasks = tasks.filter(task => task.title.trim() !== '').map((task, idx) => ({
      id: `task-${idx}`,
      title: task.title,
      completed: false
    }));
    
    onSubmit({
      title,
      description,
      category,
      difficulty,
      duration,
      startDate,
      reward,
      tasks: filteredTasks as ChallengeTask[],
      status: 'upcoming',
      participants: 0
    });
    
    onClose();
  };

  const addTask = () => {
    setTasks([...tasks, {title: ''}]);
  };

  const updateTask = (index: number, title: string) => {
    const newTasks = [...tasks];
    newTasks[index].title = title;
    setTasks(newTasks);
  };

  const removeTask = (index: number) => {
    if (tasks.length > 1) {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Create New Challenge</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Challenge Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter challenge title"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your challenge"
                rows={3}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ChallengeCategory)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Fitness">Fitness</option>
                  <option value="Nutrition">Nutrition</option>
                  <option value="Mindfulness">Mindfulness</option>
                  <option value="Sleep">Sleep</option>
                  <option value="Hydration">Hydration</option>
                  <option value="Social">Social</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as ChallengeDifficulty)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="7 days">1 Week</option>
                  <option value="14 days">2 Weeks</option>
                  <option value="21 days">3 Weeks</option>
                  <option value="30 days">30 Days</option>
                  <option value="60 days">60 Days</option>
                  <option value="90 days">90 Days</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reward</label>
              <input
                type="text"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Badge, Points, Premium Features"
                required
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Challenge Tasks</label>
                <button
                  type="button"
                  onClick={addTask}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  + Add Task
                </button>
              </div>
              
              {tasks.map((task, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={task.title}
                    onChange={(e) => updateTask(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Task description"
                  />
                  {tasks.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTask(index)}
                      className="ml-2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
            >
              Create Challenge
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main Challenge Arena Component
const ChallengeArena: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [joinedChallenges, setJoinedChallenges] = useState<string[]>([]);
  const [likedChallenges, setLikedChallenges] = useState<string[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    // Initialize with sample data but add random progress to some challenges
    return sampleChallenges.map(challenge => ({
      ...challenge,
      progress: Math.random() > 0.7 ? Math.floor(Math.random() * 100) : undefined,
      liked: Math.random() > 0.8
    }));
  });
  const [activeTab, setActiveTab] = useState<string>('all');
  const [expandedCards, setExpandedCards] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  
  // Effect to simulate progress updates for joined challenges
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (joinedChallenges.length > 0) {
        setChallenges(prevChallenges => 
          prevChallenges.map(challenge => {
            if (joinedChallenges.includes(challenge.id) && challenge.progress !== undefined) {
              const newProgress = Math.min(100, (challenge.progress || 0) + 1);
              return {
                ...challenge,
                progress: newProgress
              };
            }
            return challenge;
          })
        );
      }
    }, 3000);
    
    return () => clearInterval(intervalId);
  }, [joinedChallenges]);
  
  // Handle joining a challenge
  const handleJoinChallenge = (id: string) => {
    if (joinedChallenges.includes(id)) {
      // If already joined, this would typically navigate to challenge details
      console.log("Navigate to challenge details:", id);
    } else {
      setJoinedChallenges(prev => [...prev, id]);
      
      // Initialize progress for the newly joined challenge
      setChallenges(prevChallenges => 
        prevChallenges.map(challenge => {
          if (challenge.id === id) {
            return {
              ...challenge,
              progress: 0
            };
          }
          return challenge;
        })
      );
    }
  };
  
  // Handle liking a challenge
  const handleLikeChallenge = (id: string) => {
    if (likedChallenges.includes(id)) {
      setLikedChallenges(prev => prev.filter(cId => cId !== id));
    } else {
      setLikedChallenges(prev => [...prev, id]);
    }
    
    setChallenges(prevChallenges => 
      prevChallenges.map(challenge => {
        if (challenge.id === id) {
          return {
            ...challenge,
            liked: !challenge.liked
          };
        }
        return challenge;
      })
    );
  };
  
  // Handle sharing a challenge
  const handleShareChallenge = (id: string) => {
    // In a real implementation, this would open a share dialog
    console.log("Sharing challenge:", id);
    alert("Sharing functionality would open here!");
  };
  
  // Handle toggling card expansion
  const toggleCardExpansion = (id: string) => {
    if (expandedCards.includes(id)) {
      setExpandedCards(prev => prev.filter(cardId => cardId !== id));
    } else {
      setExpandedCards(prev => [...prev, id]);
    }
  };
  
  // Handle challenge creation
  const handleCreateChallenge = (newChallenge: Partial<Challenge>) => {
    const challenge: Challenge = {
      id: `ch${challenges.length + 1}`,
      title: newChallenge.title || 'New Challenge',
      description: newChallenge.description || '',
      participants: 0,
      duration: newChallenge.duration || '7 days',
      startDate: newChallenge.startDate,
      difficulty: newChallenge.difficulty || 'Beginner',
      category: newChallenge.category || 'Fitness',
      reward: newChallenge.reward || 'Badge',
      status: 'upcoming',
      tasks: newChallenge.tasks || [],
      createdBy: currentUser.id
    };
    
    setChallenges(prev => [challenge, ...prev]);
    alert("Challenge created successfully!");
  };
  
  // Apply filters and search
  const filteredChallenges = challenges.filter(challenge => {
    // Category filter
    const matchesCategory = 
      filter === 'all' || 
      filter.toLowerCase() === challenge.category.toLowerCase();
    
    // Difficulty filter
    const matchesDifficulty =
      difficultyFilter === 'all' ||
      difficultyFilter.toLowerCase() === challenge.difficulty.toLowerCase();
    
    // Status filter
    const matchesStatus =
      statusFilter === 'all' ||
      statusFilter === challenge.status;
    
    // Tab filter
    const matchesTab = 
      (activeTab === 'all') ||
      (activeTab === 'joined' && joinedChallenges.includes(challenge.id)) ||
      (activeTab === 'liked' && likedChallenges.includes(challenge.id)) ||
      (activeTab === 'created' && challenge.createdBy === currentUser.id);
    
    // Search query
    const matchesSearch = 
      searchQuery === '' ||
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesDifficulty && matchesStatus && matchesTab && matchesSearch;
  });
  
  // Sort challenges
  const sortedChallenges = [...filteredChallenges].sort((a, b) => {
    switch (sortOption) {
      case 'popular':
        return b.participants - a.participants;
      case 'newest':
        return new Date(b.startDate || '').getTime() - new Date(a.startDate || '').getTime();
      case 'shortest':
        return parseInt(a.duration) - parseInt(b.duration);
      case 'longest':
        return parseInt(b.duration) - parseInt(a.duration);
      default:
        return 0;
    }
  });

  // Count for tabs
  const joinedCount = challenges.filter(c => joinedChallenges.includes(c.id)).length;
  const likedCount = challenges.filter(c => likedChallenges.includes(c.id)).length;
  const createdCount = challenges.filter(c => c.createdBy === currentUser.id).length;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-lg mb-4">
            <Trophy className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Challenge Arena</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join wellness challenges to achieve your goals, compete with friends, and earn rewards.
            Track your progress and stay motivated on your wellness journey.
          </p>
          
          {/* User Stats */}
          <div className="mt-8 inline-flex items-center bg-white rounded-full px-4 py-2 shadow-sm">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                <span className="font-bold text-blue-600">{currentUser.level}</span>
              </div>
              <div className="mr-4 text-left">
                <p className="font-medium text-sm">{currentUser.name}</p>
                <p className="text-xs text-gray-500">{currentUser.points} points</p>
              </div>
            </div>
            <div className="flex items-center">
              <Medal className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm mr-2">{joinedChallenges.length} Challenges</span>
            </div>
          </div>
        </div>
        
        {/* Featured Challenge Carousel */}
        <FeaturedChallengeCarousel 
          challenges={challenges} 
          onJoin={handleJoinChallenge} 
        />
        
        {/* Tabs */}
        <div className="mb-6 border-b">
          <div className="flex overflow-x-auto hide-scrollbar">
            <TabButton 
              active={activeTab === 'all'} 
              onClick={() => setActiveTab('all')}
            >
              All Challenges
            </TabButton>
            <TabButton 
              active={activeTab === 'joined'} 
              onClick={() => setActiveTab('joined')}
              count={joinedCount}
            >
              <Users className="h-4 w-4 mr-1" />
              Joined
            </TabButton>
            <TabButton 
              active={activeTab === 'liked'} 
              onClick={() => setActiveTab('liked')}
              count={likedCount}
            >
              <Heart className="h-4 w-4 mr-1" />
              Liked
            </TabButton>
            <TabButton 
              active={activeTab === 'created'} 
              onClick={() => setActiveTab('created')}
              count={createdCount}
            >
              <Flag className="h-4 w-4 mr-1" />
              Created
            </TabButton>
          </div>
        </div>
        
        {/* Search, Filter, Sort Controls */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search challenges..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="ml-2 px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center"
              >
                <Filter className="h-4 w-4 mr-2" />
                <span className="text-sm">Filters</span>
              </button>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Sort:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="shortest">Shortest Duration</option>
                <option value="longest">Longest Duration</option>
              </select>
            </div>
          </div>
          
          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border">
              <div className="flex flex-wrap gap-y-4">
                <div className="w-full md:w-1/3 pr-4">
                  <h4 className="text-sm font-medium mb-2">Category</h4>
                  <div className="flex flex-wrap">
                    <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
                      All
                    </FilterButton>
                    <FilterButton active={filter === 'fitness'} onClick={() => setFilter('fitness')}>
                      Fitness
                    </FilterButton>
                    <FilterButton active={filter === 'nutrition'} onClick={() => setFilter('nutrition')}>
                      Nutrition
                    </FilterButton>
                    <FilterButton active={filter === 'mindfulness'} onClick={() => setFilter('mindfulness')}>
                      Mindfulness
                    </FilterButton>
                    <FilterButton active={filter === 'sleep'} onClick={() => setFilter('sleep')}>
                      Sleep
                    </FilterButton>
                    <FilterButton active={filter === 'hydration'} onClick={() => setFilter('hydration')}>
                      Hydration
                    </FilterButton>
                    <FilterButton active={filter === 'social'} onClick={() => setFilter('social')}>
                      Social
                    </FilterButton>
                  </div>
                </div>
                
                <div className="w-full md:w-1/3 pr-4">
                  <h4 className="text-sm font-medium mb-2">Difficulty</h4>
                  <div className="flex flex-wrap">
                    <FilterButton active={difficultyFilter === 'all'} onClick={() => setDifficultyFilter('all')}>
                      All
                    </FilterButton>
                    <FilterButton active={difficultyFilter === 'beginner'} onClick={() => setDifficultyFilter('beginner')}>
                      Beginner
                    </FilterButton>
                    <FilterButton active={difficultyFilter === 'intermediate'} onClick={() => setDifficultyFilter('intermediate')}>
                      Intermediate
                    </FilterButton>
                    <FilterButton active={difficultyFilter === 'advanced'} onClick={() => setDifficultyFilter('advanced')}>
                      Advanced
                    </FilterButton>
                    <FilterButton active={difficultyFilter === 'expert'} onClick={() => setDifficultyFilter('expert')}>
                      Expert
                    </FilterButton>
                  </div>
                </div>
                
                <div className="w-full md:w-1/3">
                  <h4 className="text-sm font-medium mb-2">Status</h4>
                  <div className="flex flex-wrap">
                    <FilterButton active={statusFilter === 'all'} onClick={() => setStatusFilter('all')}>
                      All
                    </FilterButton>
                    <FilterButton active={statusFilter === 'upcoming'} onClick={() => setStatusFilter('upcoming')}>
                      Upcoming
                    </FilterButton>
                    <FilterButton active={statusFilter === 'active'} onClick={() => setStatusFilter('active')}>
                      Active
                    </FilterButton>
                    <FilterButton active={statusFilter === 'completed'} onClick={() => setStatusFilter('completed')}>
                      Completed
                    </FilterButton>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => {
                    setFilter('all');
                    setDifficultyFilter('all');
                    setStatusFilter('all');
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Challenge Cards */}
        {sortedChallenges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedChallenges.map((challenge) => (
              <ChallengeCard 
                key={challenge.id} 
                challenge={challenge} 
                onJoin={handleJoinChallenge}
                onLike={handleLikeChallenge}
                onShare={handleShareChallenge}
                joined={joinedChallenges.includes(challenge.id)}
                expanded={expandedCards.includes(challenge.id)}
                onToggleExpand={() => toggleCardExpansion(challenge.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-4">No challenges match your filters</p>
            <button 
              onClick={() => { 
                setActiveTab('all');
                setFilter('all'); 
                setDifficultyFilter('all');
                setStatusFilter('all');
                setSearchQuery(''); 
              }}
              className="text-blue-600 font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
        
        {/* Create Custom Challenge */}
        <div className="mt-12 text-center">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-md font-medium transition-all flex items-center gap-2 mx-auto"
          >
            Create Custom Challenge <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        
        {/* Challenges activity feed */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Recent Activity</h3>
            <button className="text-blue-600 text-sm hover:underline">View All</button>
          </div>
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-4 border-b flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-medium">Alex Johnson</span> completed day 7 of 
                  <span className="font-medium"> 10K Steps Challenge</span>
                </p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            
            <div className="p-4 border-b flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Trophy className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-medium">Sarah Williams</span> earned 
                  <span className="font-medium"> Bronze Meditation Badge</span>
                </p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
            
            <div className="p-4 border-b flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <Users className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-medium">Mark Thompson</span> joined 
                  <span className="font-medium"> Sleep Improvement Challenge</span>
                </p>
                <p className="text-xs text-gray-500">Yesterday</p>
              </div>
            </div>
            
            <div className="p-4 flex items-center">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                <Bell className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-medium">Nutrition Overhaul</span> challenge starts tomorrow
                </p>
                <p className="text-xs text-gray-500">Yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Create Challenge Modal */}
      <CreateChallengeModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateChallenge}
      />
    </section>
  );
};

export default ChallengeArena;