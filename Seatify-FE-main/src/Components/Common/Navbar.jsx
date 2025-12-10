/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../../api/authApi";
import { SettingOutlined } from "@ant-design/icons";
import ChangePassword from "./ChangePassword";
import { AiOutlineBell } from "react-icons/ai";
import NotificationPanel from './NotificationPanel';

const Navbar = ({  showSettings = false }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [currentTask, setCurrentTask] = useState("");

  const [notificationOpen, setNotificationOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  const handleLogout = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    try {
      setLoading(true);
      await logoutUser(userId);
      localStorage.clear();
    } catch (error) {
      console.error("Error during logout:", error.message);
    } finally {
      navigate("/login");
      setLoading(false);
    }
  };

  const handleLogoClick = () => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");
    if (userRole === "superuser") {
      setProjectTitleState("Home");
      navigate("/subscription");
    } else {
      if (token) {
        localStorage.removeItem("project_details");
        localStorage.removeItem("selected_project_id");
        setProjectTitleState("Home");
        navigate("/projects");
      } else {
        navigate("/login");
      }
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setDropdownOpen(false);
  };


  const handlePasswordClick = () => {
    setShowPasswordModal(true);
    setDropdownOpen(true);
  };

  const hideCancel = () => {
    setShowPasswordModal(false);
  };

  const submitStatusUpdate = () => {
    setShowPasswordModal(false);
  };

  const handleSettingsClick = () => {
    navigate("/configuration");
  };

  const toggleNotification = () => {
    setNotificationOpen((prev) => !prev);
  };

  return (
    <>
      <NotificationPanel isOpen={notificationOpen} onClose={() => setNotificationOpen(false)} />
      <ChangePassword
        visible={showPasswordModal}
        title={`Change Password`}
        onCancel={hideCancel}
        handleSubmitStatus={submitStatusUpdate}
      />
      <nav
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-2 text-white bg-white border-gray-200 shadow-lg"
      >
        <div>
          <div className="flex gap-2 mr-2">
            <img
              src="logo-transparent.png"
              alt="App Logo"
              // style={{ width: "3%" }}
              style={{ width: "88px", cursor: "pointer" }}
              onClick={handleLogoClick}
            />
           {/* <div className="flex items-center ml-3 text-2xl font-bold text-[#374151]">Seatify</div> */}
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          {currentTask && (
            <div className="flex items-center gap-2">
              <p className="font-medium text-gray-800">You're at</p>
              <p className="font-bold text-gray-800">{currentTask}</p>
            </div>
          )}
          {showSettings && (
            <div
              className="flex items-center gap-2 text-gray-800 transition-colors duration-300 cursor-pointer hover:text-blue-600"
              onClick={handleSettingsClick}
            >
              <SettingOutlined className="text-2xl" />
              <span className="font-bold">Settings</span>
            </div>
          )}
          <div className="relative flex gap-3">
            <AiOutlineBell
              className="text-3xl text-gray-800 cursor-pointer"
              onClick={toggleNotification}
            />
            <CgProfile
              className="text-3xl text-gray-800 cursor-pointer"
              onClick={toggleDropdown}
            />
            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 z-10 w-48 mt-2 text-black bg-white rounded-md shadow-lg"
              >
                <button
                  onClick={handleProfileClick}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                >
                  Profile
                </button>
                <button
                  onClick={handlePasswordClick}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                >
                  ChangePassword
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                  disabled={loading}
                >
                  {loading ? "Logging out..." : "Logout"}
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
