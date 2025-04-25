"use client";
import React, { useState, useEffect } from 'react';
import { Calendar, Award, Battery, TrendingUp, CheckCircle, Activity } from 'lucide-react';

interface QuickWin {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  icon: string;
  points: number;
  category: 'daily' | 'weekly' | 'challenge';
}

const mockQuickWins: QuickWin[] = [
  {
    id: '1',
    title: 'Drink 8 glasses of water',
    description: 'Stay hydrated throughout the day',
    completed: false,
    icon: 'battery',
    points: 10,
    category: 'daily',
  },
  {
    id: '2',
    title: 'Meditate for 10 minutes',
    description: 'Focus on your breath and clear your mind',
    completed: false,
    icon: 'activity',
    points: 15,
    category: 'daily',
  },
  {
    id: '3',
    title: 'Complete 7,000 steps',
    description: 'Get active and reach your step goal',
    completed: false,
    icon: 'trendingUp',
    points: 20,
    category: 'daily',
  },
  {
    id: '4',
    title: 'Weekly challenge: No sugar',
    description: 'Avoid added sugars for the entire week',
    completed: false,
    icon: 'award',
    points: 50,
    category: 'weekly',
  },
  {
    id: '5',
    title: 'Sleep 7-8 hours',
    description: 'Maintain a healthy sleep schedule',
    completed: false,
    icon: 'battery',
    points: 15,
    category: 'daily',
  },
  {
    id: '6',
    title: 'Community challenge',
    description: 'Join 5 group activities this month',
    completed: false,
    icon: 'award',
    points: 100,
    category: 'challenge',
  },
];

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'calendar':
      return <Calendar className="h-5 w-5" />;
    case 'award':
      return <Award className="h-5 w-5" />;
    case 'battery':
      return <Battery className="h-5 w-5" />;
    case 'trendingUp':
      return <TrendingUp className="h-5 w-5" />;
    case 'checkCircle':
      return <CheckCircle className="h-5 w-5" />;
    case 'activity':
      return <Activity className="h-5 w-5" />;
    default:
      return <CheckCircle className="h-5 w-5" />;
  }
};

const QuickWins: React.FC = () => {
  const [quickWins, setQuickWins] = useState<QuickWin[]>(mockQuickWins);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'daily' | 'weekly' | 'challenge'>('all');
  const [score, setScore] = useState<number>(0);
  const [streakDays, setStreakDays] = useState<number>(0);
  const [congratsVisible, setCongratsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Calculate total score from completed quick wins
    const totalScore = quickWins.reduce((total, win) => {
      return win.completed ? total + win.points : total;
    }, 0);
    setScore(totalScore);
  }, [quickWins]);

  const toggleComplete = (id: string) => {
    setQuickWins(prevWins => 
      prevWins.map(win => {
        if (win.id === id) {
          const newCompleted = !win.completed;
          
          // Show congrats message when completing a task
          if (newCompleted) {
            setCongratsVisible(true);
            setTimeout(() => setCongratsVisible(false), 3000);
            
            // Increase streak for daily tasks
            if (win.category === 'daily') {
              setStreakDays(prev => prev + 1);
            }
          } else {
            // Decrease streak if uncompleting a daily task
            if (win.category === 'daily') {
              setStreakDays(prev => Math.max(0, prev - 1));
            }
          }
          
          return { ...win, completed: newCompleted };
        }
        return win;
      })
    );
  };

  const filteredWins = selectedCategory === 'all' 
    ? quickWins 
    : quickWins.filter(win => win.category === selectedCategory);

  const percentComplete = quickWins.length > 0 
    ? Math.round((quickWins.filter(win => win.completed).length / quickWins.length) * 100) 
    : 0;

  const addNewQuickWin = () => {
    const newId = String(quickWins.length + 1);
    const newWin: QuickWin = {
      id: newId,
      title: "New Quick Win",
      description: "Add your description here",
      completed: false,
      icon: "checkCircle",
      points: 10,
      category: "daily"
    };
    
    setQuickWins([...quickWins, newWin]);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header section */}
      <div className="bg-white shadow p-6 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Quick Wins</h1>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">Current Score</p>
              <p className="text-xl font-bold text-indigo-600">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Streak</p>
              <p className="text-xl font-bold text-green-600">{streakDays} days</p>
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-500">Progress</span>
            <span className="text-sm font-medium">{percentComplete}%</span>
          </div>
          <div className="w-full bg-gray-200 h-2">
            <div 
              className="bg-indigo-600 h-2" 
              style={{ width: `${percentComplete}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Category filters */}
      <div className="flex space-x-2 mb-6">
        <button 
          onClick={() => setSelectedCategory('all')} 
          className={`px-4 py-2 text-sm font-medium ${
            selectedCategory === 'all' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          All
        </button>
        <button 
          onClick={() => setSelectedCategory('daily')} 
          className={`px-4 py-2 text-sm font-medium ${
            selectedCategory === 'daily' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Daily
        </button>
        <button 
          onClick={() => setSelectedCategory('weekly')} 
          className={`px-4 py-2 text-sm font-medium ${
            selectedCategory === 'weekly' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Weekly
        </button>
        <button 
          onClick={() => setSelectedCategory('challenge')} 
          className={`px-4 py-2 text-sm font-medium ${
            selectedCategory === 'challenge' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Challenges
        </button>
      </div>
      
      {/* Quick wins grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWins.map((win) => (
          <div key={win.id} className={`bg-white shadow p-5 hover:shadow-md transition-shadow ${win.completed ? 'border-l-4 border-green-500' : ''}`}>
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className={`p-2 ${win.completed ? 'bg-green-100 text-green-600' : 'bg-indigo-100 text-indigo-600'}`}>
                  {getIcon(win.icon)}
                </div>
                <div className="ml-4">
                  <h3 className={`font-semibold ${win.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                    {win.title}
                  </h3>
                  <p className="text-sm text-gray-500">{win.description}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 mb-2">
                  {win.points} pts
                </span>
                <button
                  onClick={() => toggleComplete(win.id)}
                  className={`h-6 w-6 flex items-center justify-center ${
                    win.completed
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                  }`}
                >
                  {win.completed ? '✓' : ''}
                </button>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs uppercase text-gray-500 font-medium">
                {win.category}
              </span>
              {win.completed && (
                <span className="text-xs text-green-600">Completed</span>
              )}
            </div>
          </div>
        ))}
        
        {/* Add new quick win card */}
        <div 
          className="bg-white shadow p-5 flex items-center justify-center cursor-pointer hover:bg-gray-50"
          onClick={addNewQuickWin}
        >
          <div className="text-center">
            <div className="h-10 w-10 bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">+</span>
            </div>
            <p className="text-gray-600">Add Quick Win</p>
          </div>
        </div>
      </div>
      
      {/* Congratulations toast notification */}
      {congratsVisible && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white py-3 px-6 shadow-lg">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-3" />
            <div>
              <p className="font-medium">Great job!</p>
              <p className="text-sm">You're making progress on your wellness journey.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickWins;