import React from "react";

const index = ({ filteredPayments, onCliCkGoPaymentDetail }) => {
  const isArrayOfArrays =
    Array.isArray(filteredPayments) && filteredPayments.every(Array.isArray);

  if (isArrayOfArrays) {
    filteredPayments = [];
  } else {
    filteredPayments = filteredPayments.flat
      ? filteredPayments.flat()
      : filteredPayments;
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-4 text-left">S.No</th>
            <th className="p-4 text-left">Payment ID</th>
            <th className="p-4 text-left">Student Name</th>
            <th className="p-4 text-left">Invoice No</th>
            <th className="p-4 text-left">Payment Date</th>
            <th className="p-4 text-left">Amount</th>
            <th className="p-4 text-left">Method</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments?.map((payment, index) => (
            <tr key={payment?.paymentId} className="border-b">
              <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                {index + 1}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                {payment?.banktransactions[0]?.reference_number}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                {" "}
                {payment?.contacts?.contact_name}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                {payment?.invoices?.invoice_number}
              </td>

              <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                {payment?.invoices?.date}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                {payment?.invoices?.total?.toFixed(2)}{" "}
                {payment?.invoices?.currency_code}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-left text-gray-700"></td>
              <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                <span
                  className={`px-2 py-1 rounded ${
                    payment.invoices?.status === "paid"
                      ? "bg-green-100 text-green-800"
                      : payment.invoices?.status !== "paid"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                  style={{ textTransform: "capitalize" }}
                >
                  {payment.invoices?.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm font-medium text-left text-gray-700">
                <button
                  onClick={() => {
                    onCliCkGoPaymentDetail(payment);
                  }}
                  className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default index;
