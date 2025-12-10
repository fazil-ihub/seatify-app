import React, { useState } from "react";
import { Search } from "lucide-react";
import UserDetailsPanel from "./UserDetailsPanel/index";
import UserList from "./UserList/index";
import { Drawer, Button } from "antd";
import AddUserPanel from "./AddUserPanel/AddUserPanel";

const ManageUser = ({ apiRes }) => {
  const [students, setStudents] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@email.com",
      phone: "9876543210",
      dob: "2000-05-15",
      address: "123 Main St, NY",
      enrollmentDate: "2023-01-10",
      status: "Active",
      totalPayment: 50000,
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@email.com",
      phone: "9876543210",
      dob: "2000-05-15",
      address: "456 Elm St, CA",
      enrollmentDate: "2022-09-05",
      status: "Active",
      totalPayment: 35000,
    },
    {
      id: 3,
      firstName: "Mark",
      lastName: "Taylor",
      email: "mark.tylor@email.com",
      phone: "9876543210",
      dob: "2000-05-15",
      address: "123 Main St, NY",
      enrollmentDate: "2022-09-05",
      status: "Inactive",
      totalPayment: 20000,
    },
    {
      id: 4,
      firstName: "Smith",
      lastName: "Jane",
      email: "smith.jane@email.com",
      phone: "9876543210",
      dob: "2000-05-15",
      address: "456 Elm St, CA",
      enrollmentDate: "2023-01-10",
      status: "Active",
      totalPayment: 50000,
    },
  ]);

  const [selectedStatus, setSelectedStatus] = useState("superadmin");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddUserPanelOpen, setIsAddUserPanelOpen] = useState(false);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const filteredStudents = apiRes?.filter((student) => {
    const matchesStatus = selectedStatus
      ? student.role === selectedStatus
      : true;

    const matchesSearch =
      searchTerm.trim() === ""
        ? true
        : Object.values(student).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
          );

    return matchesStatus && matchesSearch;
  });

  const handleUpdateUser = (updatedUser) => {
    setStudents((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const handleAddUser = (newUser) => {
    setStudents((prevStudents) => [
      ...prevStudents,
      { id: Date.now(), ...newUser },
    ]);
  };

  return (
    <div className="h-[91vh] p-4 bg-[#F7F8FA]">
      <div className="mt-4 mb-4 text-4xl font-bold">Manage User</div>

      <div className="flex items-center gap-4 mb-4">
        {(selectedStatus || searchTerm) && (
          <button
            onClick={() => {
              setSelectedStatus("");
              setSearchTerm("");
            }}
            className="px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            Clear Filters
          </button>
        )}

        <div className="relative">
          <select
            className="px-3 py-2 text-gray-700 bg-white border rounded-md"
            onChange={handleStatusChange}
            value={selectedStatus}
          >
            <option value="">Role</option>
            <option value="superadmin">Super Admin</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="flex items-center justify-between w-full">
          <div className="relative flex items-center ml-auto gap-4">
            <Button type="primary" onClick={() => setIsAddUserPanelOpen(true)}>
              Add User
            </Button>
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

      <UserList
        setIsDetailsPanelOpen={setIsDetailsPanelOpen}
        setSelectedUser={setSelectedUser}
        filteredStudents={filteredStudents}
      />
      <Drawer
        open={isDetailsPanelOpen}
        onClose={() => setIsDetailsPanelOpen(false)}
        width={600}
      >
        <UserDetailsPanel
          user={selectedUser}
          isOpen={isDetailsPanelOpen}
          onClose={() => setIsDetailsPanelOpen(false)}
          onUpdate={handleUpdateUser}
        />
      </Drawer>
      <Drawer
        open={isAddUserPanelOpen}
        onClose={() => setIsAddUserPanelOpen(false)}
        width={600}
      >
        <AddUserPanel
          visible={isAddUserPanelOpen}
          onClose={() => setIsAddUserPanelOpen(false)}
          onAddUser={handleAddUser}
        />
      </Drawer>
    </div>
  );
};

export default ManageUser;
