import { useState } from "react";
import {
  Home,
  Layers,
  Menu,
  User,
  CreditCard,
  FileText,
  Users,
  Settings,
  Book,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleManageStudentsClick = () => {
    navigate("/manage-student");
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  const handleOperationsClick = () => {
    navigate("/operation");
  };

  const handleManagePaymentsClick = () => {
    navigate("/manage-payment");
  };

  const handleManageReportsClick = () => {
    navigate("/manage-report");
  };

  const handleManageUsersClick = () => {
    navigate("/manage-user");
  };

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  const handleManageCoursesClick = () => {
    navigate("/course");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`h-screen bg-gray-900 text-white transition-all duration-300 flex flex-col mt-[60px]`}
    >
      {/* Toggle Button */}
      <div
        className={`flex items-center p-4 ${
          !isOpen ? "justify-center" : "justify-between"
        }`}
      >
        <h1 className={`text-lg font-bold ${!isOpen && "hidden"}`}>Seatify</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`text-white ${!isOpen ? "mx-auto" : ""}`}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar Links */}
      <nav className="flex-grow mt-4">
        <SidebarItem
          icon={<Home size={24} />}
          label="Dashboard"
          isOpen={isOpen}
          onClick={handleDashboardClick}
          className={isActive("/dashboard") ? "bg-white text-black" : ""}
        />
        <SidebarItem
          icon={<Layers size={24} />}
          label="Operations"
          isOpen={isOpen}
          onClick={handleOperationsClick}
          className={isActive("/operation") ? "bg-white text-black" : ""}
        />
        <SidebarItem
          icon={<User size={24} />}
          label="Manage Students"
          isOpen={isOpen}
          onClick={handleManageStudentsClick}
          className={isActive("/manage-student") ? "bg-white text-black" : ""}
        />
        <SidebarItem
          icon={<CreditCard size={24} />}
          label="Manage Payments"
          isOpen={isOpen}
          onClick={handleManagePaymentsClick}
          className={isActive("/manage-payment") ? "bg-white text-black" : ""}
        />
        <SidebarItem
          icon={<FileText size={24} />}
          label="Manage Reports"
          isOpen={isOpen}
          onClick={handleManageReportsClick}
          className={isActive("/manage-report") ? "bg-white text-black" : ""}
        />
        <SidebarItem
          icon={<Users size={24} />}
          label="Manage Users"
          isOpen={isOpen}
          onClick={handleManageUsersClick}
          className={isActive("/manage-user") ? "bg-white text-black" : ""}
        />
        <SidebarItem
          icon={<Book size={24} />}
          label="Manage Courses"
          isOpen={isOpen}
          onClick={handleManageCoursesClick}
          className={isActive("/course") ? "bg-white text-black" : ""}
        />
      </nav>

      {/* Settings at bottom */}
      <div className="mt-auto mb-16">
        <SidebarItem
          icon={<Settings size={24} />}
          label="Settings"
          isOpen={isOpen}
          onClick={handleSettingsClick}
          className={isActive("/settings") ? "bg-white text-black" : ""}
        />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, isOpen, onClick, className }) => (
  <div
    className={`flex items-center p-3 cursor-pointer hover:bg-gray-700 ${className} ${
      !isOpen ? "justify-center" : ""
    }`}
    onClick={onClick}
    title={!isOpen ? label : ""}
  >
    {icon}
    <span
      className={`ml-3 text-sm transition-all duration-300 ${
        !isOpen ? "hidden" : "block"
      }`}
    >
      {label}
    </span>
  </div>
);

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default Sidebar;
