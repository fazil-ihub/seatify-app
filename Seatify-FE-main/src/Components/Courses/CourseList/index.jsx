import React, { useState } from "react";
import DetailInfo from "../DetailInfo/index";

const Index = ({ filteredCourses }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState(null);

  const showZohoInfo = (values) => {
    setSelectedInfo(values);
    setShowDetailsModal(true);
  };

  const hideCancel = () => {
    setShowDetailsModal(false);
  };

  return (
    <div className="overflow-hidden bg-white rounded-lg shadow">
      <DetailInfo
        currentInfo={selectedInfo}
        visible={showDetailsModal}
        title={`View Zoho Details`}
        onCancel={hideCancel}
      />
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-4 text-left">S.No</th>
            <th className="p-4 text-left">Course ID</th>
            <th className="p-4 text-left">Course Name</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredCourses.map((course, index) => (
            <tr key={course.id}>
              <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                {index + 1}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                {course.id}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                {course.course_name}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                ₹{course.course_info.regular_price}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                <span
                  className={`px-2 py-1 rounded ${
                    course.course_info._stock_status === "instock"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {course.course_info._stock_status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm font-medium text-left">
                <button
                  onClick={() => {
                    showZohoInfo(course);
                  }}
                  className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  View Zoho Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
