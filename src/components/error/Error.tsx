import { CircleAlert } from "lucide-react";
import React from "react";

interface ErrorProps {
  message: string;
}

function returnToLogin() {
  window.location.href = "/login";
}
const Error: React.FC<ErrorProps> = ({ message = "Something went wrong" }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <div className="flex items-center justify-center mb-4">
          <CircleAlert className=" text-red-500 mr-2" />
          <h2 className="text-xl font-bold text-gray-800">Error</h2>
        </div>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="space-y-3">
          <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
          <button
            className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
            onClick={() => returnToLogin()}
          >
            Return to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
