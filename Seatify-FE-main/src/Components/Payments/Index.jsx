import React, { useState } from "react";
import { Search } from "lucide-react";
import PaymentsList from "./PaymentsList/index.jsx";
import { Drawer, Divider, Flex, Tag } from "antd";
import PaymentDetails from "./PaymentDetails/Index.jsx";
import GooglePagination from "../Common/GooglePagination.jsx";

const PaymentDashboard = ({ apiRes }) => {
  const [selectedArrayData, setSelectedArrayData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("paid");
  const [selectedMethod, setSelectedMethod] = useState("UPI");
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [methodDropdownOpen, setMethodDropdownOpen] = useState(false);
  const [dateFilterType, setDateFilterType] = useState("all");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredStudents = (student) => {
    const matchesStatus = selectedStatus
      ? student.status === selectedStatus
      : "paid";
    const matchesSearch =
      searchTerm.trim() === ""
        ? true
        : Object.values(student).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
          );
    return matchesStatus && matchesSearch;
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when page size changes
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setStatusDropdownOpen(false);
  };

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    setMethodDropdownOpen(false);
  };

  const handleDateFilterChange = (e) => {
    setDateFilterType(e.target.value);
  };

  const handleCustomDateChange = (type, value) => {
    setDateRange({ ...dateRange, [type]: value });
  };

  const onCliCkGoPaymentDetail = (value) => {
    setSelectedArrayData(value);
    setIsDetailsPanelOpen(true);
  };

  const filteredPayments = apiRes?.filter((payment) => {
    const matchesStatus =
      selectedStatus === "paid"
        ? true
        : payment.invoices.status === selectedStatus;
    const matchesMethod =
      selectedMethod === "UPI" ? true : payment.payment_mode === selectedMethod;
    const matchesDate =
      dateFilterType === "all"
        ? true
        : dateRange.from && dateRange.to
        ? new Date(payment.invoices.date) >= new Date(dateRange.from) &&
          new Date(payment.invoices.date) <= new Date(dateRange.to)
        : true;

    const matchesSearch =
      searchTerm.trim() === ""
        ? true
        : Object.values(payment).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
          );

    return matchesStatus && matchesMethod && matchesDate && matchesSearch;
  });

  return (
    <div className="h-[91vh] p-4 bg-[#F7F8FA]">
      <div className="mt-4 mb-4 text-4xl font-bold">Manage Payment</div>
      <div className="flex flex-wrap items-center gap-4 mb-4">
        {(selectedStatus !== "TXN_SUCCESS" ||
          selectedMethod !== "UPI" ||
          dateFilterType !== "all" ||
          dateRange.from ||
          dateRange.to) && (
          <button
            onClick={() => {
              setSelectedStatus("paid");
              setSelectedMethod("UPI");
              setDateFilterType("all");
              setDateRange({ from: "", to: "" });
            }}
            className="px-1 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            Clear Filters
          </button>
        )}

        <div className="relative">
          <select
            className="px-3 py-2 text-gray-700 bg-white border rounded-md"
            onChange={handleDateFilterChange}
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

        <div className="relative">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm"
            onClick={() => setMethodDropdownOpen(!methodDropdownOpen)}
          >
            <span>
              {selectedMethod !== "UPI" ? selectedMethod : "Payment method"}
            </span>
            <span className="text-gray-400">▼</span>
          </button>
          {methodDropdownOpen && (
            <div className="absolute z-10 w-48 mt-2 bg-white border rounded-lg shadow-lg">
              {["paid"].map((method) => (
                <div
                  key={method}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                    selectedMethod === method ? "font-bold" : ""
                  }`}
                  onClick={() => handleMethodChange(method)}
                >
                  {method}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm"
            onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
          >
            <span>{selectedStatus !== "paid" ? selectedMethod : "Status"}</span>
            <span className="text-gray-400">▼</span>
          </button>
          {statusDropdownOpen && (
            <div className="absolute z-10 w-48 mt-2 bg-white border rounded-lg shadow-lg">
              {["paid", "failure"].map((status) => (
                <div
                  key={status}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                    selectedStatus === status ? "font-bold" : ""
                  }`}
                  onClick={() => handleStatusChange(status)}
                >
                  {status}
                </div>
              ))}
            </div>
          )}
        </div>
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

        <div className="flex-grow" />

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
      <PaymentsList
        filteredPayments={filteredPayments}
        onCliCkGoPaymentDetail={onCliCkGoPaymentDetail}
      />
      <GooglePagination
        current={currentPage}
        total={filteredStudents.length}
        pageSize={pageSize}
        onChange={handlePageChange}
      />
      <Drawer
        title={
          <span className="font-bold text-lg">
            {`Payment Details - ${selectedArrayData?.contacts?.contact_name}`}
          </span>
        }
        placement="right"
        width={600}
        onClose={() => setIsDetailsPanelOpen(false)}
        open={isDetailsPanelOpen}
        closable={true}
        className="student-details-drawer"
      >
        <PaymentDetails paymentInfo={selectedArrayData} />
      </Drawer>
    </div>
  );
};

export default PaymentDashboard;
