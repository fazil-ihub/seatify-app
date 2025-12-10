import React from "react";
import { Form, Input, Card } from "antd";

const UserDetailsPanel = ({ user }) => {
  if (!user) return null;

  return (
    <>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">User Details</h2>
      </div>

      <div>
        <Card title="Personal Information" variant="">
          <div className="p-1">
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: "Please enter first name!" }]}
              >
                <Input placeholder="Enter first name" defaultValue={user.firstName} />
              </Form.Item>
              
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: "Please enter last name!" }]}
              >
                <Input placeholder="Enter last name" defaultValue={user.lastName} />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please enter email!" }]}
              >
                <Input placeholder="Enter email" defaultValue={user.email} />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true, message: "Please enter phone!" }]}
              >
                <Input placeholder="Enter phone" defaultValue={user.phone} />
              </Form.Item>

              <Form.Item
                label="Date of Birth"
                name="dob"
                rules={[{ required: true, message: "Please enter date of birth!" }]}
              >
                <Input placeholder="Enter date of birth" defaultValue={user.dob} />
              </Form.Item>

              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: "Please enter status!" }]}
              >
                <Input placeholder="Enter status" defaultValue={user.status} />
              </Form.Item>
            </div>
          </div>
        </Card>

        {/* <Card title="Additional Information" className="mt-4">
          <div className="p-1">
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                label="Enrollment Date"
                name="enrollmentDate"
                rules={[{ required: true, message: "Please enter enrollment date!" }]}
              >
                <Input placeholder="Enter enrollment date" defaultValue={user.enrollmentDate} />
              </Form.Item>

              <Form.Item
                label="Total Payment"
                name="totalPayment"
                rules={[{ required: true, message: "Please enter total payment!" }]}
              >
                <Input placeholder="Enter total payment" defaultValue={user.totalPayment} />
              </Form.Item>

              <Form.Item
                label="Address"
                name="address"
                className="col-span-2"
                rules={[{ required: true, message: "Please enter address!" }]}
              >
                <Input.TextArea placeholder="Enter address" rows={3} defaultValue={user.address} />
              </Form.Item>
            </div>
          </div>
        </Card> */}
      </div>
    </>
  );
};

export default UserDetailsPanel; 