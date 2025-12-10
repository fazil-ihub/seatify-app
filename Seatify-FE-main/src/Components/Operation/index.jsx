import React, { useEffect, useState, useMemo } from "react";
import { DataGraph } from "./OperationDetails/DataGraph";
import { UserTable } from "./OperationDetails/UserTable";
import { Filter, Search, Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Modal } from "antd";

function App({
  courseApi = [],
  institutionApi = [],
  commonInstitutionApi = [],
  operationsApi,
  handleOkStatus = (id, status) =>
    console.log(`Mock status update for ID ${id}: ${status}`),
  updateVerifyStatus = () => {},
  isOpenDocsModal,
}) {
  const [users, setUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("Invoice Generated");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [institutionFilter, setInstitutionFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startFilter, setStartFilter] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    if (startFilter === true) {
      if (institutionFilter) {
        const filterInst = commonInstitutionApi?.filter(
          (x) => x?.name === institutionFilter
        );

        const postIds = filterInst?.map((item) => item?.post_id);
        const filtered = courseApi?.filter((course) =>
          postIds.includes(course?.id)
        );
        setFilteredCourses(filtered);
        setStartFilter(false);
      }
    }
  }, [institutionFilter, startFilter, commonInstitutionApi, courseApi]);

  useEffect(() => {
    if (operationsApi?.length > 0) {
      setUsers(operationsApi);
    }
  }, [operationsApi]);

  const handleStatusChange = (userId, newStatus) => {
    const titleMessage = `Are you sure you want to move this status to ${newStatus}`;
    Modal.confirm({
      title: titleMessage,
      content: "Do you want to proceed with this action?",
      okText: "Confirm",
      cancelText: "Cancel",
      onOk() {
        handleOkStatus(userId, newStatus);
      },
      onCancel() {
        // Cancelled
      },
    });
  };

  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => {
        const matchesStatus =
          statusFilter === "all" || user.status === statusFilter;

        const matchedInstitution =
          institutionFilter === "all" ||
          user.institution_name === institutionFilter;
        const matchesDepartment =
          departmentFilter === "all" || user.post_name === departmentFilter;
        const matchesSearch =
          searchQuery === "" ||
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.mobile.includes(searchQuery);

        const userDate = new Date(user.dob);
        const matchesDateRange =
          (!startDate || userDate >= startDate) &&
          (!endDate || userDate <= endDate);

        return (
          matchesStatus &&
          matchedInstitution &&
          matchesDepartment &&
          matchesSearch &&
          matchesDateRange
        );
      })
      .sort((a, b) => {
        const dateA = new Date(a.dob);
        const dateB = new Date(b.dob);
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      });
  }, [
    users,
    statusFilter,
    institutionFilter,
    departmentFilter,
    searchQuery,
    startDate,
    endDate,
    sortOrder,
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="px-2 py-8 mx-auto max-w-7xl sm:px-2 lg:px-2">
        <div className="mb-8">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">Operation</h1>

          {/* Table Section */}
          <div className="overflow-hidden bg-white rounded-lg shadow">
            <div className="flex flex-col justify-between items-start p-4 space-y-4 bg-gray-50 border-b border-gray-200 sm:flex-row sm:items-center sm:space-y-0">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search by name, email or mobile"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="py-2 pr-4 pl-10 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 px-4 py-2">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={institutionFilter}
                  onChange={(e) => {
                    setInstitutionFilter(e.target.value);
                    setStartFilter(true);
                  }}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="all">All Institutions</option>
                  {institutionApi
                    ?.slice()
                    .sort((a, b) =>
                      a.institution_name.localeCompare(b.institution_name)
                    )
                    .map((inst) => (
                      <option
                        key={inst?.institution_name}
                        value={inst?.institution_name}
                      >
                        {inst?.institution_name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="all">All Departments</option>
                  {filteredCourses.map((dept) => (
                    <option key={dept?.course_slug} value={dept?.course_slug}>
                      {dept?.course_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="Invoice Generated">Invoice Generated</option>
                  <option value="Payment Paid">Payment Paid</option>
                  <option value="Document Upload Pending">
                    Document Upload Pending
                  </option>
                  <option value="Document Uploaded">Document Uploaded</option>
                  <option value="Document Verified">Document Verified</option>
                  <option value="Onhold">On Hold</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Onboarded">Onboarded</option>
                </select>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Start Date"
                    className="px-2 py-1 w-32 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="End Date"
                    className="px-2 py-1 w-32 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
                <button
                  onClick={() =>
                    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"))
                  }
                  className="px-3 py-1 text-sm text-gray-600 rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {sortOrder === "desc" ? "Latest First" : "Oldest First"}
                </button>
              </div>
            </div>

            <UserTable
              users={filteredUsers}
              onStatusChange={handleStatusChange}
              updateVerifyStatus={updateVerifyStatus}
              isOpenDocsModal={isOpenDocsModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
