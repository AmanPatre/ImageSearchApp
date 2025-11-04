import React from 'react';

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-10 bg-white shadow-xl rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">Image Search App</h2>
        <p className="text-gray-600 mb-8">Please log in to begin searching.</p>
        <a
          href="/auth/google"
          className="inline-block px-7 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Login with Google
        </a>
      </div>
    </div>
  );
};

export default LoginPage;