import React from 'react';
import { Bell, User } from 'lucide-react';
export default Headers = (title) => {
    return (
    <>
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
              </div>
              <div className="flex items-center">
                {/* Notification & Profile */}
                <div className="ml-4 flex items-center md:ml-6">
                  <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                    <span className="sr-only">Notifications</span>
                    <div className="relative">
                      <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-xs text-white">
                        3
                      </div>
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" 
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 
                          6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 
                          11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 
                          0v-1m6 0H9" />
                      </svg>
                    </div>
                  </button>
                  <div className="ml-3 relative">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        A
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-700">Admin</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </header> 
    </>);
}