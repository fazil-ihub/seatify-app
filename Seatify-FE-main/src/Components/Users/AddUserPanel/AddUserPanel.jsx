import React from "react";
import {  Form, Input,  Card, Button } from "antd";

const AddUserPanel = ({ visible, onClose, onAddUser }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    onAddUser(values);
    form.resetFields();
    onClose();
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
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
                <Input placeholder="Enter first name" />
              </Form.Item>
              
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: "Please enter last name!" }]}
              >
                <Input placeholder="Enter last name" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please enter email!" }]}
              >
                <Input placeholder="Enter email" />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true, message: "Please enter phone!" }]}
              >
                <Input placeholder="Enter phone" />
              </Form.Item>

              <Form.Item
                label="Date of Birth"
                name="dob"
                rules={[{ required: true, message: "Please enter date of birth!" }]}
              >
                <Input placeholder="Enter date of birth" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please enter password!" }]}
              >
                <Input.Password placeholder="Enter password" />
              </Form.Item>
            </div>
          </div>
        </Card>
      </div>
      <Form.Item>
        <Button type="primary" className="w-full mt-4" htmlType="submit">
          Add User
        </Button>
      </Form.Item>
    </Form>
  );
};


export default AddUserPanel; 