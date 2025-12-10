import React from "react";
import { Form, Input, Row, Card, Col, Button, Upload } from "antd";
import { StarOutlined, UploadOutlined } from "@ant-design/icons";
import ImageUpload from "./MarksheetFile";

const { TextArea } = Input;

const StudentDetailsPanel = ({ student }) => {
  if (!student) return null;

  return (
    <div className="bg-[#f2f2f2]">
      <Form
        layout="vertical"
        initialValues={{
          id: student?.id,
          currency: student?.currency,
          tax_amount: student?.tax_amount,
          total_amount: student?.total_amount,
          billing_date: student?.billing_date,
          payment_method: student?.payment_method,
          status: student?.status,
          transaction_id: student?.transaction_id,

          sslc_marksheet: student?.documents_info?.sslc_marksheet,
          hse_marksheet: student?.documents_info?.hse_marksheet,
          hsc_marksheet: student?.documents_info?.hsc_marksheet,
          diploma_marksheet: student?.documents_info?.diploma_marksheet,
          initiated_date: student?.documents_info?.initiated_date,
          initiated_time: student?.documents_info?.initiated_time,

          sslc_mark:
            student?.documents_info?.education_qualification?.sslc_mark,

          hsc_mark: student?.documents_info?.education_qualification?.hsc_mark,

          diploma_mark:
            student?.documents_info?.education_qualification?.diploma_mark,

          firstgraduate:
            student?.documents_info?.education_qualification?.firstgraduate,

          speclization:
            student?.documents_info?.education_qualification?.speclization,

          first_name: student?.customer_info?.first_name,
          last_name: student?.customer_info?.last_name,
          email: student?.customer_info?.email,
          phone: student?.billing_info?.phone,
          billingFirstname: student?.billing_info?.firstname,
          billingLastname: student?.billing_info?.lastname,
          billingEmail: student?.billing_info?.email,
          billingPhone: student?.billing_info?.phone,
          billingCity: student?.billing_info?.city,
          billingState: student?.billing_info?.state,
          billingCountry: student?.billing_info?.country,
          billingPostcode: student?.billing_info?.postcode,
          billingAddress_1: student?.billing_info?.address_1,
        }}
      >
        <Card title="Personal Information" variant="">
          <div className="p-1">
            <div className="grid grid-cols-2 gap-1">
              <Form.Item
                label="First Name"
                name="first_name"
                rules={[
                  { required: true, message: "Please enter first name!" },
                ]}
              >
                <Input placeholder="Enter first name" readOnly />
              </Form.Item>

              <Form.Item
                label="Last Name"
                name="last_name"
                rules={[{ required: true, message: "Please enter last name!" }]}
              >
                <Input placeholder="Enter last name" readOnly />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please enter email!" }]}
              >
                <Input placeholder="Enter email" readOnly />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true, message: "Please enter phone!" }]}
              >
                <Input placeholder="Enter phone" readOnly />
              </Form.Item>
            </div>
          </div>
        </Card>

        <Card
          title="Billing Information"
          variant=""
          hidden={student?.billing_info?.firstname === null}
        >
          <div className="p-1">
            <div className="grid grid-cols-2 gap-1">
              <Form.Item
                label="First Name"
                name="billingFirstname"
                rules={[
                  { required: true, message: "Please enter first name!" },
                ]}
              >
                <Input placeholder="Enter first name" readOnly />
              </Form.Item>

              <Form.Item
                label="Last Name"
                name="billingLastname"
                rules={[{ required: true, message: "Please enter last name!" }]}
              >
                <Input placeholder="Enter last name" readOnly />
              </Form.Item>

              <Form.Item
                label="Email"
                name="billingEmail"
                rules={[{ required: true, message: "Please enter email!" }]}
              >
                <Input placeholder="Enter email" readOnly />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="billingPhone"
                rules={[{ required: true, message: "Please enter phone!" }]}
              >
                <Input placeholder="Enter phone" readOnly />
              </Form.Item>
              <Form.Item
                label="Address"
                name="billingAddress_1"
                rules={[{ required: true, message: "Please enter phone!" }]}
              >
                <TextArea
                  rows="8"
                  cols="5"
                  placeholder="Enter Address"
                  readOnly
                />
              </Form.Item>
              <Form.Item
                label="City Name"
                name="billingCity"
                rules={[{ required: true, message: "Please enter city name!" }]}
              >
                <Input placeholder="Enter last name" readOnly />
              </Form.Item>
              <Form.Item
                label="State Name"
                name="billingState"
                rules={[
                  { required: true, message: "Please enter state name!" },
                ]}
              >
                <Input placeholder="Enter state name" readOnly />
              </Form.Item>
              <Form.Item
                label="Country Name"
                name="billingCountry"
                rules={[
                  { required: true, message: "Please enter country name!" },
                ]}
              >
                <Input placeholder="Enter country name" readOnly />
              </Form.Item>
              <Form.Item
                label="State Name"
                name="billingState"
                rules={[
                  { required: true, message: "Please enter state name!" },
                ]}
              >
                <Input placeholder="Enter state name" readOnly />
              </Form.Item>
              <Form.Item
                label="Pincode"
                name="billingPostcode"
                rules={[{ required: true, message: "Please enter postcode!" }]}
              >
                <Input placeholder="Enter postcode" readOnly />
              </Form.Item>
            </div>
          </div>
        </Card>

        <Card title="Transaction Information" className="mt-2">
          <div className="p-1">
            <div className="grid grid-cols-2 gap-2">
              <Form.Item
                label="Order ID"
                name="id"
                rules={[{ required: true, message: "Please enter Order ID!" }]}
              >
                <Input placeholder="Enter Order ID" readOnly />
              </Form.Item>

              <Form.Item
                label="Currency"
                name="currency"
                rules={[{ required: true, message: "Please enter currency!" }]}
              >
                <Input placeholder="Enter currency" readOnly />
              </Form.Item>

              <Form.Item
                label="Tax Amount"
                name="tax_amount"
                // className="col-span-2"
                rules={[{ required: true, message: "Please enter Tax!" }]}
              >
                <Input placeholder="Enter Tax" rows={3} readOnly />
              </Form.Item>

              <Form.Item
                label="Total Amount"
                name="total_amount"
                // className="col-span-2"
                rules={[
                  { required: true, message: "Please enter total_amount!" },
                ]}
              >
                <Input placeholder="Enter total_amount" rows={3} readOnly />
              </Form.Item>
              <Form.Item
                label="Payment Method"
                name="payment_method"
                rules={[
                  { required: true, message: "Please enter payment_method!" },
                ]}
              >
                <Input placeholder="Enter payment_method" readOnly />
              </Form.Item>
            </div>
          </div>
        </Card>

        <Card title="Academic Information" className="mt-2">
          <div className="p-1">
            <div className="grid grid-cols-2 gap-2">
              {student?.documents_info?.sslc_marksheet !== "" && (
                <>
                  <Form.Item
                    label="10th MarkSheet"
                    name="sslc_marksheet"
                    className="col-span-2"
                  >
                    <ImageUpload
                      imageInfo={student?.documents_info?.sslc_marksheet}
                    />
                  </Form.Item>
                </>
              )}
              {student?.documents_info?.hse_marksheet !== "" && (
                <>
                  <Form.Item
                    label="11th MarkSheet"
                    name="hse_marksheet"
                    className="col-span-2"
                  >
                    <ImageUpload
                      imageInfo={student?.documents_info?.hse_marksheet}
                    />
                  </Form.Item>
                </>
              )}

              {student?.documents_info?.hsc_marksheet !== "" && (
                <>
                  <Form.Item
                    label="12th MarkSheet"
                    name="hsc_marksheet"
                    className="col-span-2"
                  >
                    <ImageUpload
                      imageInfo={student?.documents_info?.hsc_marksheet}
                    />
                  </Form.Item>
                </>
              )}

              {student?.documents_info?.diploma_marksheet !== "" && (
                <>
                  <Form.Item
                    label="Diploma MarkSheet"
                    name="diploma_marksheet"
                    className="col-span-2"
                  >
                    <ImageUpload
                      imageInfo={student?.documents_info?.diploma_marksheet}
                    />
                  </Form.Item>
                </>
              )}

              <Form.Item label="10th Mark" name="sslc_mark">
                <Input placeholder="Enter 10th mark" readOnly />
              </Form.Item>

              <Form.Item label="12th Mark" name="hsc_mark">
                <Input placeholder="Enter 12th mark" readOnly />
              </Form.Item>

              <Form.Item label="Specialization" name="speclization">
                <Input placeholder="Enter speclization" readOnly />
              </Form.Item>
              {student?.documents_info?.education_qualification
                ?.diploma_mark !== "no" && (
                <>
                  <Form.Item label="Diplomo Mark" name="diploma_mark">
                    <Input placeholder="Enter diploma mark" readOnly />
                  </Form.Item>
                </>
              )}
            </div>
          </div>
        </Card>
      </Form>
    </div>
  );
};

export default StudentDetailsPanel;
