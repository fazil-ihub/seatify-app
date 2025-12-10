import React from "react";
import { Form, Input, Row, Card, Col, Button, Upload } from "antd";
import { StarOutlined, UploadOutlined } from "@ant-design/icons";
import ImageUpload from "./MarksheetFile";

const { TextArea } = Input;

const StudentDetailsPanel = ({ paymentInfo }) => {
  if (!paymentInfo) return null;

  return (
    <div className="bg-[#f2f2f2]">
      <Form
        layout="vertical"
        initialValues={{
          contact_id: paymentInfo?.contacts?.contact_id,
          contact_name: paymentInfo?.contacts?.contact_name,
          mobile: paymentInfo?.contacts?.mobile,

          address: paymentInfo?.invoices?.billing_address?.address,
          street2: paymentInfo?.invoices?.billing_address?.street2,
          city: paymentInfo?.invoices?.billing_address?.city,
          state: paymentInfo?.invoices?.billing_address?.state,
          zipcode: paymentInfo?.invoices?.billing_address?.zipcode,
          country: paymentInfo?.invoices?.billing_address?.country,

          shipping_address: paymentInfo?.invoices?.shipping_address?.address,
          shipping_street2: paymentInfo?.invoices?.shipping_address?.street2,
          shipping_city: paymentInfo?.invoices?.shipping_address?.city,
          shipping_state: paymentInfo?.invoices?.shipping_address?.state,
          shipping_zipcode: paymentInfo?.invoices?.shipping_address?.zipcode,
          shipping_country: paymentInfo?.invoices?.shipping_address?.country,

          transaction_id: paymentInfo?.banktransactions[0]?.transaction_id,
          account_name: paymentInfo?.banktransactions[0]?.account_name,
          total: paymentInfo?.invoices?.total,
          invoice_url: paymentInfo?.invoices?.invoice_url,
          currency_code: paymentInfo?.banktransactions[0]?.currency_code,
        }}
      >
        <Card title="Personal Information" variant="">
          <div className="p-1">
            <div className="grid grid-cols-2 gap-1">
              <Form.Item
                label="Zoho Customer ID"
                name="contact_id"
                rules={[
                  { required: true, message: "Please enter contact_id name!" },
                ]}
              >
                <Input placeholder="Enter contact id" readOnly />
              </Form.Item>

              <Form.Item
                label="Contact Name"
                name="contact_name"
                rules={[
                  { required: true, message: "Please enter contact name!" },
                ]}
              >
                <Input placeholder="Enter contact name" readOnly />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="mobile"
                rules={[{ required: true, message: "Please enter phone!" }]}
              >
                <Input placeholder="Enter phone" readOnly />
              </Form.Item>
            </div>
          </div>
        </Card>

        <Card title="Billing Information" variant="">
          <div className="p-1">
            <div className="grid grid-cols-2 gap-1">
              <Form.Item label="Address" name="address">
                <Input placeholder="Enter address" readOnly />
              </Form.Item>

              <Form.Item label="Street" name="street2">
                <Input placeholder="Enter last name" readOnly />
              </Form.Item>

              <Form.Item label="City" name="city">
                <Input placeholder="Enter city" readOnly />
              </Form.Item>

              <Form.Item label="State" name="state">
                <Input placeholder="Enter state" readOnly />
              </Form.Item>
              <Form.Item label="Postal Code" name="zipcode">
                <Input placeholder="Enter zipcode" readOnly />
              </Form.Item>
              <Form.Item label="Country Name" name="country">
                <Input placeholder="Enter country name" readOnly />
              </Form.Item>
            </div>
          </div>
        </Card>

        <Card title="Shipping Information" variant="">
          <div className="p-1">
            <div className="grid grid-cols-2 gap-1">
              <Form.Item label="Address" name="shipping_address">
                <Input placeholder="Enter address" readOnly />
              </Form.Item>

              <Form.Item label="Street" name="shipping_street2">
                <Input placeholder="Enter last name" readOnly />
              </Form.Item>

              <Form.Item label="City" name="shipping_city">
                <Input placeholder="Enter city" readOnly />
              </Form.Item>

              <Form.Item label="State" name="shipping_state">
                <Input placeholder="Enter state" readOnly />
              </Form.Item>
              <Form.Item label="Postal Code" name="shipping_zipcode">
                <Input placeholder="Enter zipcode" readOnly />
              </Form.Item>
              <Form.Item label="Country Name" name="shipping_country">
                <Input placeholder="Enter country name" readOnly />
              </Form.Item>
            </div>
          </div>
        </Card>

        <Card title="Transaction Information" className="mt-2">
          <div className="p-1">
            <div className="grid grid-cols-2 gap-2">
              <Form.Item label="Transaction ID" name="transaction_id">
                <Input placeholder="Enter Transaction ID" readOnly />
              </Form.Item>

              <Form.Item label="Payment Via" name="account_name">
                <Input placeholder="Enter Payment Via" readOnly />
              </Form.Item>

              <Form.Item label="Total Amount" name="total">
                <Input placeholder="Enter total_amount" rows={3} readOnly />
              </Form.Item>
              <Form.Item label="Currency Code" name="currency_code">
                <Input placeholder="Enter currency code" readOnly />
              </Form.Item>
              <Form.Item
                label="Invoice Payment Url"
                name="invoice_url"
                className="col-span-2"
              >
                <ImageUpload imageInfo={paymentInfo?.invoices?.invoice_url} />
              </Form.Item>
            </div>
          </div>
        </Card>
      </Form>
    </div>
  );
};

export default StudentDetailsPanel;
