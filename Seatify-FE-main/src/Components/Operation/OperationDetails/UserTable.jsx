import React, { useEffect, useState } from "react";
import { StatusBadge } from "./StatusBadge";
import { ActionButtons } from "./ActionButton";
import { Button, Modal } from "antd";
import { DocumentVerificationModal } from "./DocumentVerificationModal";
import { format } from "date-fns";

const { confirm } = Modal;

export const UserTable = ({
  users,
  onStatusChange,
  updateVerifyStatus,
  isOpenDocsModal,
}) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isOpenDocsModal === true) {
      const apiData = selectedUser?.id;
      const resData = users?.filter((x) => x?.id === apiData);
      setSelectedUser(resData[0]);
    }
  }, [isOpenDocsModal, users, selectedUser]);

  const onSubmitStatus = (values1, values2) => {
    setIsModalOpen(false);
    onStatusChange(selectedUser?.admission_userid, "Document Verified");
  };

  const handleReject = (values1, values2, values3) => {
    confirm({
      title: "Are you sure you want to reject?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleVerify(values1, values2, values3);
      },
      onCancel() {
        // Cancelled
      },
    });
  };

  const showConfirm = (values1, values2, values3) => {
    confirm({
      title: "Are you sure you want to verify?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleVerify(values1, values2, values3);
      },
      onCancel() {
        // Cancelled
      },
    });
  };

  const handleVerify = (values1, values2, values3) => {
    console.log("selectedUser", selectedUser);
    const payload = {
      admission_userid: selectedUser?.admission_userid,
      verification_for: values1,
      statusVal: values3,
    };
    console.log("payload", payload);
    updateVerifyStatus(payload);
  };

  const capitalizeEachWord = (str) => {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="sticky top-0 z-10 bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-50">
              S.No.
            </th>
            <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-50">
              User Name
            </th>
            <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-50">
              Department
            </th>
            <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-50">
              Email
            </th>
            <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-50">
              College Name
            </th>
            <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-50">
              DOB
            </th>
            <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-50">
              Amount Paid
            </th>
            <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-50">
              Status
            </th>
            {users[0]?.status !== "Invoice Generated" && (
              <>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-50">
                  Actions
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users?.map((user, index) => (
            <tr key={user.id}>
              <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap hover:bg-gray-50">
                <div className="text-sm font-medium text-gray-900">
                  {user.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap hover:bg-gray-50">
                <div className="text-sm font-medium text-gray-900">
                  {capitalizeEachWord(user.department)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap hover:bg-gray-50">
                <div className="text-sm text-gray-900">{user.email}</div>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                {user.institution_name}
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                {format(new Date(user.dob), "dd/MM/yyyy")}
              </td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                {user.amount.toFixed(2)} INR
              </td>
              <td className="px-6 py-4 whitespace-nowrap hover:bg-gray-50">
                <StatusBadge status={user.status} />
              </td>
              {user?.status !== "Invoice Generated" && (
                <>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    <div className="flex space-x-2">
                      {user.status !== "Document Uploaded" && (
                        <>
                          <ActionButtons
                            status={user.status}
                            onStatusChange={(newStatus) =>
                              onStatusChange(user.admission_userid, newStatus)
                            }
                          />
                        </>
                      )}

                      {user.status === "Document Uploaded" && (
                        <>
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setIsModalOpen(true);
                            }}
                            className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Verify Documents
                          </button>
                          <button
                            onClick={() => onStatusChange("Rejected")}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md shadow-sm transition-colors duration-200 ease-in-out hover:bg-red-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <DocumentVerificationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          documents={selectedUser || {}}
          onVerify={showConfirm}
          onReject={handleReject}
          onSubmitStatus={onSubmitStatus}
        />
      )}
    </div>
  );
};
