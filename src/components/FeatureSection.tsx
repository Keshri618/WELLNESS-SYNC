"user client";
import React from 'react';
import { Heart, BarChart2, Calendar, Activity, UserCheck, Shield } from 'lucide-react';

const FeatureSection: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="block text-sm font-semibold text-teal-500 uppercase tracking-wider mb-3">Everything You Need</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Powerful Features for Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">Wellness Journey</span>
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600">
            Simple, intuitive tools designed to help you achieve balance and harmony in your daily life
          </p>
        </div>

        {/* Featured Highlight */}
        <div className="flex flex-col lg:flex-row items-center mb-24 bg-gradient-to-r from-teal-50 to-blue-50 rounded-3xl overflow-hidden shadow-xl">
          <div className="lg:w-1/2 p-10 lg:p-16">
            <span className="inline-block px-4 py-1 bg-teal-100 text-teal-600 rounded-full text-sm font-medium mb-6">Featured</span>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Personalized Wellness Dashboard</h3>
            <p className="text-lg text-gray-600 mb-8">
              Your customized command center for health monitoring, habit tracking, and wellness insights—all in one beautiful, easy-to-use interface.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center px-4 py-2 bg-white rounded-full shadow-sm">
                <div className="w-3 h-3 bg-teal-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium">Real-time Updates</span>
              </div>
              <div className="flex items-center px-4 py-2 bg-white rounded-full shadow-sm">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium">Smart Notifications</span>
              </div>
              <div className="flex items-center px-4 py-2 bg-white rounded-full shadow-sm">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-sm font-medium">Visual Progress</span>
              </div>
            </div>
            <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300">
              Explore Dashboard
            </button>
          </div>
          <div className="lg:w-1/2 p-8 flex justify-center">
            <div className="relative w-full max-w-md h-72 sm:h-80 bg-white rounded-xl shadow-inner overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-12 bg-white border-b border-gray-100 flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              <div className="pt-12 p-4 grid grid-cols-2 gap-3">
                <div className="bg-teal-50 rounded-lg p-3">
                  <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center mb-2">
                    <Heart size={16} className="text-white" />
                  </div>
                  <div className="h-3 bg-teal-200 rounded-full w-1/2 mb-1"></div>
                  <div className="h-2 bg-teal-100 rounded-full w-3/4"></div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mb-2">
                    <Activity size={16} className="text-white" />
                  </div>
                  <div className="h-3 bg-blue-200 rounded-full w-2/3 mb-1"></div>
                  <div className="h-2 bg-blue-100 rounded-full w-3/4"></div>
                </div>
                <div className="col-span-2 bg-purple-50 rounded-lg p-3">
                  <div className="h-24 bg-gradient-to-r from-teal-100 to-blue-100 rounded-lg mb-2 flex items-end px-2 pb-2">
                    <div className="h-12 w-6 bg-teal-400 rounded-t-sm mx-1"></div>
                    <div className="h-16 w-6 bg-teal-500 rounded-t-sm mx-1"></div>
                    <div className="h-10 w-6 bg-teal-400 rounded-t-sm mx-1"></div>
                    <div className="h-14 w-6 bg-teal-500 rounded-t-sm mx-1"></div>
                    <div className="h-20 w-6 bg-blue-500 rounded-t-sm mx-1"></div>
                    <div className="h-8 w-6 bg-blue-400 rounded-t-sm mx-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid - Cleaner Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
            <div className="mb-6 rounded-2xl p-2 inline-block bg-gradient-to-br from-teal-100 to-teal-50 group-hover:from-teal-200 group-hover:to-teal-100 transition-all duration-300">
              <Activity size={28} className="text-teal-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-teal-600 transition-colors duration-300">Health Tracking</h3>
            <p className="text-gray-600">
              Effortlessly monitor your vitals, exercise, sleep, and nutrition habits all in one intuitive interface.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
            <div className="mb-6 rounded-2xl p-2 inline-block bg-gradient-to-br from-blue-100 to-blue-50 group-hover:from-blue-200 group-hover:to-blue-100 transition-all duration-300">
              <Calendar size={28} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">Smart Planning</h3>
            <p className="text-gray-600">
              AI-powered recommendations create personalized wellness plans that adapt as your needs and goals evolve.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
            <div className="mb-6 rounded-2xl p-2 inline-block bg-gradient-to-br from-purple-100 to-purple-50 group-hover:from-purple-200 group-hover:to-purple-100 transition-all duration-300">
              <BarChart2 size={28} className="text-purple-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors duration-300">Visual Insights</h3>
            <p className="text-gray-600">
              Beautiful, easy-to-understand charts and reports that help you visualize your progress over time.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
            <div className="mb-6 rounded-2xl p-2 inline-block bg-gradient-to-br from-pink-100 to-pink-50 group-hover:from-pink-200 group-hover:to-pink-100 transition-all duration-300">
              <Heart size={28} className="text-pink-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-pink-600 transition-colors duration-300">Stress Management</h3>
            <p className="text-gray-600">
              Guided meditation, breathing exercises, and mood tracking to help you maintain mental and emotional balance.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
            <div className="mb-6 rounded-2xl p-2 inline-block bg-gradient-to-br from-amber-100 to-amber-50 group-hover:from-amber-200 group-hover:to-amber-100 transition-all duration-300">
              <UserCheck size={28} className="text-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-amber-600 transition-colors duration-300">Community Support</h3>
            <p className="text-gray-600">
              Connect with like-minded individuals and certified coaches who can provide guidance and accountability.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
            <div className="mb-6 rounded-2xl p-2 inline-block bg-gradient-to-br from-green-100 to-green-50 group-hover:from-green-200 group-hover:to-green-100 transition-all duration-300">
              <Shield size={28} className="text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors duration-300">Data Privacy</h3>
            <p className="text-gray-600">
              Enterprise-grade security keeps your health data private, with full control over what you share and with whom.
            </p>
          </div>
        </div>

        {/* Clean CTA Section */}
        <div className="mt-20 text-center">
          <div className="inline-block rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-teal-600 mb-6">Get Started Today</div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 max-w-2xl mx-auto">
            Ready to transform your approach to wellness?
          </h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <button className="px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300">
              Start Free Trial
            </button>
            <button className="px-8 py-3 bg-white text-gray-700 border border-gray-200 font-medium rounded-full hover:border-gray-300 transition-all duration-300">
              View Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;