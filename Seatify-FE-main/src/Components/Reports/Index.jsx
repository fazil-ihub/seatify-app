import React, { useState } from "react";
import { Search } from "lucide-react";
import ReportList from "./List";
import GooglePagination from "../Common/GooglePagination";

const StudentPaymentSystem = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilterType, setDateFilterType] = useState("all");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const students = [
    {
      reportId: "201",
      studentName: "John Doe",
      phone: "9876543210",
      email: "john.doe@email.com",
      dob: "2000-05-15",
      amount: 50000,
      method: "Credit Card",
      enrollmentDate: "2023-01-10",
      status: "Completed",
    },
    {
      reportId: "202",
      studentName: "Jane Smith",
      phone: "9876543211",
      email: "jane.smith@email.com",
      dob: "2000-06-20",
      amount: 35000,
      method: "UPI",
      enrollmentDate: "2022-09-05",
      status: "Pending",
    },
    // Add more student data as needed
  ];

  const downloadReport = (reportId) => {
    // Implement the download logic here
    console.log(`Downloading report with ID: ${reportId}`);
  };

  const handleCustomDateChange = (type, value) => {
    setDateRange({ ...dateRange, [type]: value });
  };

  const filteredStudents = students.filter((student) => {
    const matchesDate =
      dateFilterType === "all"
        ? true
        : dateRange.from && dateRange.to
        ? new Date(student.enrollmentDate) >= new Date(dateRange.from) &&
          new Date(student.enrollmentDate) <= new Date(dateRange.to)
        : true;

    const matchesSearch =
      searchTerm.trim() === ""
        ? true
        : Object.values(student).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
          );

    return matchesDate && matchesSearch;
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when page size changes
  };

  return (
    <div className="h-[91vh] p-4 bg-[#F7F8FA]">
      <div className="mt-4 mb-4 text-4xl font-bold">Manage Report</div>
      <div className="flex flex-wrap items-center justify-end gap-4 mb-4">
        {(dateFilterType !== "all" || dateRange.from || dateRange.to) && (
          <button
            onClick={() => {
              setDateFilterType("all");
              setDateRange({ from: "", to: "" });
            }}
            className="px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            Clear Filters
          </button>
        )}

        <div className="flex items-center">
          <span className="mr-2 text-gray-600">Show:</span>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="px-2 py-1 border rounded-md text-gray-600"
          >
            {[5, 10, 15, 20].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          {/* <span className="ml-2 text-gray-600">entries</span> */}
        </div>

        <div className="relative">
          <select
            className="px-3 py-2 text-gray-700 bg-white border rounded-md"
            onChange={(e) => setDateFilterType(e.target.value)}
            value={dateFilterType}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="thisWeek">This Week</option>
            <option value="thisMonth">This Month</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        {dateFilterType === "custom" && (
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="absolute text-xs text-gray-500 -top-4 left-1">
                From
              </span>
              <input
                type="date"
                className="px-3 py-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={dateRange.from}
                onChange={(e) => handleCustomDateChange("from", e.target.value)}
                aria-label="From Date"
              />
            </div>
            <div className="relative">
              <span className="absolute text-xs text-gray-500 -top-4 left-1">
                To
              </span>
              <input
                type="date"
                className="px-3 py-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={dateRange.to}
                onChange={(e) => handleCustomDateChange("to", e.target.value)}
                aria-label="To Date"
              />
            </div>
          </div>
        )}

        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="w-48 py-2 pl-4 pr-10 rounded-lg shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute text-gray-400 right-3" size={20} />
        </div>
      </div>

      <ReportList
        filteredStudents={filteredStudents}
        downloadReport={downloadReport}
      />
      <GooglePagination
        current={currentPage}
        total={filteredStudents.length}
        pageSize={pageSize}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default StudentPaymentSystem;
