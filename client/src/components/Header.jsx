import React from 'react';

const Header = ({ user }) => {
  return (
    <nav className="bg-white shadow-md w-full mb-8">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          ImageSearch
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 hidden sm:block">
            Welcome, {user.displayName}
          </span>
          <a
            href="/api/logout"
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
          >
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;