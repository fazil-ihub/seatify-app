import React from "react";

const index = ({
  setIsDetailsPanelOpen,
  setSelectedUser,
  filteredStudents,
}) => {
  return (
    <div className="overflow-hidden bg-white rounded-lg shadow">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-4 text-left">S No.</th>
            <th className="p-4 text-left">Username</th>
            <th className="p-4 text-left">First Name</th>
            <th className="p-4 text-left">Last Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                {student.id}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                {student.username}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                {student.first_name}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-left text-gray-500">
                {student.last_name}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                {student.email_id}
              </td>

              <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                <span
                  className={`px-2 py-1 rounded ${
                    student.role === "superadmin"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {student.role}
                </span>
              </td>
              <td className="px-4 py-3 text-sm font-medium text-left">
                <button
                  onClick={() => {
                    setSelectedUser(student);
                    setIsDetailsPanelOpen(true);
                  }}
                  className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default index;
