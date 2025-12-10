import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button, Modal } from "antd";
import StudentDetailsPanel from "./StudentDetails/Index.jsx";
import { Drawer, Divider, Flex, Tag } from "antd";
import GooglePagination from "../Common/GooglePagination.jsx";
import { StarOutlined, DeleteOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const ManageUser = ({ apiRes, getOrderDetails, deleteStudentApi }) => {
  const [placement, setPlacement] = useState("right");
  const [selectedStatus, setSelectedStatus] = useState("active");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const deleteStudent = async (values) => {
    confirm({
      title: "Are you sure you want to delete this student details?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteStudentApi(values?.id);
      },
      onCancel() {
        // cancelled
      },
    });
  };

  const filteredStudents = apiRes?.filter((student) => {
    const matchesStatus = selectedStatus
      ? student.status === selectedStatus
      : "active";

    const matchesSearch =
      searchTerm.trim() === ""
        ? true
        : Object.values(student).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
          );

    return matchesStatus && matchesSearch;
  });

  const handleUpdateStudent = (updatedStudent) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
  };

  // Calculate paginated data
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredStudents.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when page size changes
  };

  const onCliCkGoStudentDetail = async (values) => {
    const apiId = values?.id;
    const response = await getOrderDetails(apiId);
    setSelectedStudent(response[0]);
    setIsDetailsPanelOpen(true);
  };

  return (
    <div className="h-[91vh] p-4 bg-[#F7F8FA]">
      <div className="mt-4 mb-4 text-2xl font-bold">Manage Student</div>
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <select
            className="px-3 py-2 text-gray-700 bg-white border rounded-md"
            onChange={handleStatusChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {selectedStatus !== "active" && (
          <button
            onClick={() => {
              setSelectedStatus("active");
            }}
            className="px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
            style={{ width: "150px" }}
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

        <div className="flex items-center justify-between w-full">
          <div className="relative flex items-center ml-auto">
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
      </div>

      <div className="overflow-hidden bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-4 text-left">S.No</th>
              <th className="p-4 text-left">First Name</th>
              <th className="p-4 text-left">Last Name</th>
              <th className="p-4 text-left">Speclization</th>
              <th className="p-4 text-left">Order Id</th>
              <th className="p-4 text-left">Contact</th>
              <th className="p-4 text-left">Payment Status</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {getPaginatedData().map((student, index) => (
              <tr key={student.id}>
                <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                  {index + 1}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                  {student.first_name}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                  {student.last_name}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-left text-gray-500">
                  {student.speclization}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                  {student.order_id}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                  {student?.billing_phone}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                  <center>
                    <Flex
                      gap="4px 0"
                      hidden={student?.studentstatus === ""}
                      wrap
                    >
                      {student?.studentstatus === "wc-pending" && (
                        <>
                          <Tag color="#f50"> Pending</Tag>
                        </>
                      )}
                      {student?.studentstatus === "wc-processing" && (
                        <>
                          <Tag color="#0A8ABD"> Processing</Tag>
                        </>
                      )}
                      {student?.studentstatus === "wc-on-hold" && (
                        <>
                          <Tag color="#fc9402"> On Hold</Tag>
                        </>
                      )}
                      {student?.studentstatus === "wc-partially-paid" && (
                        <>
                          <Tag color="#2db7f5"> Partially Paid</Tag>
                        </>
                      )}
                      {student?.studentstatus === "trash" && (
                        <>
                          <Tag color="#87d068"> Trash</Tag>
                        </>
                      )}
                      {student?.studentstatus === "wc-cancelled" && (
                        <>
                          <Tag color="#e06d97"> Cancelled</Tag>
                        </>
                      )}
                      {student?.studentstatus === "wc-failed" && (
                        <>
                          <Tag color="#f20e0e"> Failed</Tag>
                        </>
                      )}
                      {student?.studentstatus === "wc-completed" && (
                        <>
                          <Tag color="#108ee9"> Completed</Tag>
                        </>
                      )}
                    </Flex>
                  </center>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                  <span
                    className={`px-2 py-1 rounded ${
                      student.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-sm font-medium text-left">
                  <button
                    onClick={() => {
                      // setSelectedStudent(student);
                      // setIsDetailsPanelOpen(true);
                      onCliCkGoStudentDetail(student);
                    }}
                    className="mr-5 px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    View Details
                  </button>
                  <DeleteOutlined
                    style={{ color: "red" }}
                    onClick={() => deleteStudent(student)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <GooglePagination
          current={currentPage}
          total={filteredStudents.length}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </div>

      <Drawer
        title={
          <span className="font-bold text-lg">
            {`Student Details - ${selectedStudent?.customer_info?.first_name} ${selectedStudent?.customer_info?.last_name}`}
          </span>
        }
        placement="right"
        width={600}
        onClose={() => setIsDetailsPanelOpen(false)}
        open={isDetailsPanelOpen}
        closable={true}
        className="student-details-drawer"
      >
        <StudentDetailsPanel student={selectedStudent} />
      </Drawer>
    </div>
  );
};

export default ManageUser;
