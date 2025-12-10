import React, { useState } from "react";
import { Search } from "lucide-react";
import CourseList from "./CourseList";
import GooglePagination from "../Common/GooglePagination";

const Course = ({ apiRes }) => {
  const [selectedStatus, setSelectedStatus] = useState("publish");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Changed from const to state
  const [searchTerm, setSearchTerm] = useState("");

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when page size changes
  };

  const handleCustomDateChange = (type, value) => {
    setDateRange((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const filteredCourses = apiRes?.filter((course) => {
    const matchesStatus = selectedStatus
      ? course?.post_status === selectedStatus
      : "publish";

    const matchesSearch =
      searchTerm.trim() === ""
        ? true
        : Object.values(course).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
          );
    return matchesStatus && matchesSearch;
  });

  // Calculate paginated data
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredCourses?.slice(startIndex, endIndex) || [];
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4 bg-[#F7F8FA] mb-20">
      <div className="mt-2 mb-4 text-2xl font-bold">Manage Courses</div>
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <select
            className="px-3 py-2 text-gray-700 bg-white border rounded-md"
            onChange={handleStatusChange}
            value={selectedStatus}
          >
            <option value="publish">Active</option>
            <option value="unpublish">Inactive</option>
          </select>
        </div>
        {selectedStatus !== "publish" && (
          <button
            onClick={() => {
              setSelectedStatus("publish");
            }}
            style={{ width: "150px" }}
            className="px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            Clear Filters
          </button>
        )}

        <div className="flex items-center justify-between w-full">
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
          <div className="relative flex items-center ml-auto">
            <input
              type="text"
              placeholder="Search"
              className="w-48 py-2 pl-4 pr-10 rounded-lg shadow-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
            />
            <Search className="absolute text-gray-400 right-3" size={20} />
          </div>
        </div>
      </div>

      <div className="overflow-hidden bg-white rounded-lg shadow">
        <CourseList filteredCourses={getPaginatedData()} />

        <GooglePagination
          current={currentPage}
          total={filteredCourses?.length || 0}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Course;
