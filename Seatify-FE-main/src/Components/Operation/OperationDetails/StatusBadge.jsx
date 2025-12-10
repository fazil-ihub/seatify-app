import React from "react";

const statusColors = {
  "Payment Paid": "bg-green-100 text-green-800",
  "Document Upload Pending": "bg-blue-100 text-blue-800",
  "Document Uploaded": "bg-yellow-100 text-yellow-800",
  "Document Verified": "bg-purple-100 text-purple-800",
  Onhold: "bg-red-100 text-red-800",
  Rejected: "bg-red-100 text-red-800",
  Onboarded: "bg-teal-100 text-teal-800",
};

export const StatusBadge = ({ status }) => {
  return (
    <span
      className={`px-3 py-1 text-sm font-medium rounded-full ${statusColors[status]}`}
    >
      {status}
    </span>
  );
};
