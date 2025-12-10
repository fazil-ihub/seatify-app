import React from "react";

const index = ({ filteredStudents,downloadReport }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-4 text-left">Report ID</th>
            <th className="p-4 text-left">Student Name</th>
            <th className="p-4 text-left">Phone</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">DOB</th>
            <th className="p-4 text-left">Amount</th>
            <th className="p-4 text-left">Method</th>
            <th className="p-4 text-left">Enrollment Date</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Download</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.reportId} className="border-b">
              <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                {student.reportId}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                {student.studentName}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                {student.phone}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                {student.email}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                {student.dob}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                {student.amount.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                {student.method}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                {student.enrollmentDate}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                <span
                  className={`px-2 py-1 rounded ${
                    student.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : student.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {student.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm font-medium text-left">
                <button
                  onClick={() => downloadReport(student.reportId)}
                  className="text-blue-500 hover:underline"
                >
                  Download
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
