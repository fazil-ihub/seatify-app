/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { Modal } from "antd";
import { useParams } from "react-router-dom";

const ChangePassword = ({ currentInfo, visible, title, onCancel }) => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [loading, setLoading] = useState(true);

  return (
    <Modal title={title} visible={visible} footer={false} onCancel={onCancel}>
      <div className="">
        <div className="">
          <div className="flex z-10 flex-col justify-center items-center w-[500px]">
            <div className="mx-auto w-full max-w-md">
              <div className="space-y-6">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-400">
                    Current Fees
                  </label>
                  <input
                    type="text"
                    placeholder="Enter the amount for income"
                    value={currentInfo?.course_info?.current_fees}
                    className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-400">
                    Advance Fees
                  </label>
                  <input
                    type="text"
                    value={currentInfo?.course_info?.advance_fees}
                    className="px-3 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter the amount for other current liability"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ChangePassword;
