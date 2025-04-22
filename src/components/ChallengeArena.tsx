"use client";
import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Star, Award, Target, Clock, Users, Heart, TrendingUp, ThumbsUp } from 'lucide-react';

// Sample challenge data
const initialChallenges = [
  {
    id: 1,
    title: "10K Steps Daily",
    description: "Walk 10,000 steps every day for a week",
    category: "Physical",
    difficulty: "Medium",
    participants: 248,
    duration: "7 days",
    rewards: "150 wellness points",
    completed: false,
    progress: 0,
  },
  {
    id: 2,
    title: "Mindful Minutes",
    description: "Complete 10 minutes of meditation for 5 consecutive days",
    category: "Mental",
    difficulty: "Easy",
    participants: 173,
    duration: "5 days",
    rewards: "100 wellness points",
    completed: false,
    progress: 0,
  },
  {
    id: 3,
    title: "Hydration Hero",
    description: "Drink 8 glasses of water daily for 10 days",
    category: "Nutrition",
    difficulty: "Easy",
    participants: 312,
    duration: "10 days",
    rewards: "200 wellness points",
    completed: false,
    progress: 0,
  },
  {
    id: 4,
    title: "Sleep Champion",
    description: "Get 8 hours of sleep for 14 consecutive nights",
    category: "Sleep",
    difficulty: "Hard",
    participants: 96,
    duration: "14 days",
    rewards: "300 wellness points + Sleep Badge",
    completed: false,
    progress: 0,
  },
];

// Mock user data
const userData = {
  name: "Alex Johnson",
  points: 750,
  rank: "Wellness Warrior",
  completedChallenges: 12,
  badges: ["Early Riser", "Meditation Master", "Step Champion"]
};

// Category badges mapping
const categoryIcons = {
  "Physical": <TrendingUp className="mr-2" size={16} />,
  "Mental": <Heart className="mr-2" size={16} />,
  "Nutrition": <Award className="mr-2" size={16} />,
  "Sleep": <Clock className="mr-2" size={16} />,
};

// Difficulty color mapping
const difficultyColors = {
  "Easy": "bg-green-100 text-green-800",
  "Medium": "bg-yellow-100 text-yellow-800",
  "Hard": "bg-red-100 text-red-800",
};

export default function ChallengeArena() {
  const [challenges, setChallenges] = useState(initialChallenges);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [leaderboardVisible, setLeaderboardVisible] = useState(false);
  
  // Mock leaderboard data
  const leaderboardData = [
    { name: "Emma Wilson", points: 1450, rank: 1, badges: 15 },
    { name: "Michael Chen", points: 1320, rank: 2, badges: 12 },
    { name: "Sarah Ahmed", points: 1180, rank: 3, badges: 10 },
    { name: userData.name, points: userData.points, rank: 8, badges: 5 },
    { name: "James Miller", points: 680, rank: 9, badges: 4 },
    { name: "Olivia Garcia", points: 610, rank: 10, badges: 3 },
  ];

  // Filter challenges
  const filteredChallenges = challenges.filter(challenge => {
    if (activeFilter !== "All" && challenge.category !== activeFilter) return false;
    if (searchTerm && !challenge.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  // Join or update challenge progress
  const handleJoinChallenge = (id) => {
    setChallenges(challenges.map(challenge => {
      if (challenge.id === id) {
        return {
          ...challenge,
          progress: challenge.progress === 0 ? 10 : Math.min(challenge.progress + 20, 100),
          completed: challenge.progress + 20 >= 100
        };
      }
      return challenge;
    }));
  };

  // Open challenge details modal
  const openChallengeDetails = (challenge) => {
    setSelectedChallenge(challenge);
    setShowModal(true);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-lg shadow-xl">
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-indigo-800 mb-2">Challenge Arena</h1>
          <p className="text-gray-600">Complete challenges, earn rewards, improve your wellness journey</p>
        </div>
        
        <div className="flex items-center mt-4 md:mt-0 space-x-4">
          <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md">
            <Trophy className="text-yellow-500" size={20} />
            <span className="ml-2 font-semibold">{userData.points} Points</span>
          </div>
          <button 
            onClick={() => setLeaderboardVisible(!leaderboardVisible)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full flex items-center shadow-md transition-all"
          >
            <Medal className="mr-2" size={16} />
            Leaderboard
          </button>
        </div>
      </div>

      {/* Leaderboard Popup */}
      {leaderboardVisible && (
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8 relative border border-indigo-100">
          <button 
            onClick={() => setLeaderboardVisible(false)}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          <h2 className="text-2xl font-bold text-indigo-800 mb-4 flex items-center">
            <Trophy className="mr-2 text-yellow-500" size={24} />
            Wellness Champions
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-indigo-50">
                  <th className="py-2 px-4 text-left">Rank</th>
                  <th className="py-2 px-4 text-left">User</th>
                  <th className="py-2 px-4 text-left">Points</th>
                  <th className="py-2 px-4 text-left">Badges</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((user, index) => (
                  <tr key={index} className={`${user.name === userData.name ? 'bg-indigo-100' : index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                    <td className="py-3 px-4">
                      {user.rank <= 3 ? (
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full 
                          ${user.rank === 1 ? 'bg-yellow-100 text-yellow-600' : 
                            user.rank === 2 ? 'bg-gray-200 text-gray-600' : 
                            'bg-amber-100 text-amber-600'}`}>
                          {user.rank}
                        </span>
                      ) : user.rank}
                    </td>
                    <td className="py-3 px-4 font-medium">{user.name}</td>
                    <td className="py-3 px-4">{user.points}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Star size={16} className="text-yellow-500 mr-1" />
                        {user.badges}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* User Progress Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-indigo-100">
        <h2 className="text-xl font-semibold text-indigo-800 mb-4">Your Wellness Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-indigo-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Trophy size={20} className="text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Current Rank</p>
                <p className="font-medium">{userData.rank}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Award size={20} className="text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Completed</p>
                <p className="font-medium">{userData.completedChallenges} Challenges</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Star size={20} className="text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Badges Earned</p>
                <p className="font-medium">{userData.badges.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <Target size={20} className="text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Next Milestone</p>
                <p className="font-medium">1000 Points</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div className="flex overflow-x-auto space-x-2 pb-2 mb-4 md:mb-0">
          {["All", "Physical", "Mental", "Nutrition", "Sleep"].map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                activeFilter === category
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
              } transition-colors duration-200`}
              onClick={() => setActiveFilter(category)}
            >
              {category !== "All" && categoryIcons[category]}
              {category}
            </button>
          ))}
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search challenges..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Challenge Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map(challenge => (
          <div 
            key={challenge.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
          >
            <div className={`h-2 ${
              challenge.category === "Physical" ? "bg-blue-500" :
              challenge.category === "Mental" ? "bg-purple-500" :
              challenge.category === "Nutrition" ? "bg-green-500" :
              "bg-indigo-500"
            }`}></div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg text-gray-800">{challenge.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[challenge.difficulty]}`}>
                  {challenge.difficulty}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{challenge.description}</p>
              
              <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>{challenge.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users size={16} className="mr-1" />
                  <span>{challenge.participants} joined</span>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className={`h-2 rounded-full ${
                    challenge.completed ? 'bg-green-500' : 'bg-indigo-500'
                  }`}
                  style={{ width: `${challenge.progress}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between">
                <button
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  onClick={() => openChallengeDetails(challenge)}
                >
                  View Details
                </button>
                
                <button 
                  onClick={() => handleJoinChallenge(challenge.id)}
                  className={`${
                    challenge.progress === 0 
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white" 
                      : challenge.completed
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-indigo-100 hover:bg-indigo-200 text-indigo-700"
                  } px-4 py-2 rounded-full text-sm font-medium transition-colors`}
                >
                  {challenge.progress === 0 ? "Join Challenge" : 
                   challenge.completed ? "Completed!" : `${challenge.progress}% Complete`}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No results message */}
      {filteredChallenges.length === 0 && (
        <div className="bg-white rounded-lg p-8 text-center shadow-md">
          <Target size={48} className="mx-auto text-gray-400 mb-3" />
          <h3 className="text-xl font-medium text-gray-700 mb-2">No Challenges Found</h3>
          <p className="text-gray-500">Try adjusting your filters or search criteria</p>
        </div>
      )}

      {/* Challenge Detail Modal */}
      {showModal && selectedChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{selectedChallenge.title}</h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="flex items-center mb-4">
                <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[selectedChallenge.difficulty]} mr-2`}>
                  {selectedChallenge.difficulty}
                </span>
                <span className="flex items-center text-sm text-gray-600">
                  {categoryIcons[selectedChallenge.category]}
                  {selectedChallenge.category}
                </span>
              </div>
              
              <p className="text-gray-700 mb-6">{selectedChallenge.description}</p>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Challenge Details</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{selectedChallenge.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Participants:</span>
                    <span className="font-medium">{selectedChallenge.participants}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Rewards:</span>
                    <span className="font-medium text-indigo-600">{selectedChallenge.rewards}</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Your Progress</h3>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div 
                    className={`h-3 rounded-full ${
                      selectedChallenge.completed ? 'bg-green-500' : 'bg-indigo-500'
                    }`}
                    style={{ width: `${selectedChallenge.progress}%` }}
                  ></div>
                </div>
                <div className="text-right text-sm text-gray-600">
                  {selectedChallenge.progress}% Complete
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Tips to Succeed</h3>
                <ul className="bg-blue-50 rounded-lg p-4 text-gray-700 space-y-2">
                  <li className="flex items-center">
                    <ThumbsUp size={16} className="mr-2 text-blue-500" />
                    Set a daily reminder to track your progress
                  </li>
                  <li className="flex items-center">
                    <ThumbsUp size={16} className="mr-2 text-blue-500" />
                    Connect with friends to stay motivated
                  </li>
                  <li className="flex items-center">
                    <ThumbsUp size={16} className="mr-2 text-blue-500" />
                    Break the challenge into smaller daily goals
                  </li>
                </ul>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    handleJoinChallenge(selectedChallenge.id);
                    setShowModal(false);
                  }}
                  className={`${
                    selectedChallenge.progress === 0 
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white" 
                      : selectedChallenge.completed
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-indigo-100 hover:bg-indigo-200 text-indigo-700"
                  } px-6 py-2 rounded-full font-medium transition-colors`}
                >
                  {selectedChallenge.progress === 0 ? "Join Challenge" : 
                   selectedChallenge.completed ? "Challenge Completed" : "Update Progress"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}