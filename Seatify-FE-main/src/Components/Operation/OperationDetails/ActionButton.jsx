import React from "react";

export const ActionButtons = ({ status, onStatusChange }) => {
  const renderButtons = () => {
    switch (status) {
      case "Payment Paid":
        return (
          <button
            onClick={() => onStatusChange("Document Upload Pending")}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md shadow-sm transition-colors duration-200 ease-in-out hover:bg-blue-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Initiate Document Upload
          </button>
        );
      case "Document Uploaded":
        return (
          <div className="space-x-2">
            <button
              onClick={() => onStatusChange("Document Verified")}
              className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md shadow-sm transition-colors duration-200 ease-in-out hover:bg-green-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Verify
            </button>
            <button
              onClick={() => onStatusChange("Rejected")}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md shadow-sm transition-colors duration-200 ease-in-out hover:bg-red-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Reject
            </button>
          </div>
        );
      case "Document Verified":
        return (
          <button
            onClick={() => onStatusChange("Onboarded")}
            className="px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-md shadow-sm transition-colors duration-200 ease-in-out hover:bg-teal-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Onboard User
          </button>
        );
      case "Onhold":
        return (
          <button
            onClick={() => onStatusChange("Document Upload Pending")}
            className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-md shadow-sm transition-colors duration-200 ease-in-out hover:bg-yellow-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Request Re-upload
          </button>
        );
      default:
        return null;
    }
  };

  return <div>{renderButtons()}</div>;
};
