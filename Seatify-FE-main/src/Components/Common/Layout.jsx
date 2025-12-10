import PropTypes from "prop-types";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Fixed Sidebar */}
      <div className={`fixed left-0 h-screen transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Fixed Navbar */}
        <div className={`fixed top-0 right-0 z-10 transition-all duration-300 ${isSidebarOpen ? 'left-64' : 'left-20'}`}>
          <Navbar />
        </div>
        
        {/* Scrollable Content */}
        <div className="mt-[60px] h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
