import React from "react";
import { Eye } from "lucide-react";

export const DocumentVerificationModal = ({
  isOpen,
  onClose,
  documents,
  onVerify,
  onReject,
  onSubmitStatus,
}) => {
  if (!isOpen) return null;

  const document_details = documents?.document_details;

  const documentTypes = [
    {
      id: "passport_size_photo",
      label: "Passport Size Photo",
      url: document_details?.passport_size_photo?.url,
      isVerified: document_details?.passport_size_photo?.is_verified,
    },
    {
      id: "aadhaar_card",
      label: "Aadhaar Card",
      url: document_details?.aadhaar_card?.url,
      isVerified: document_details?.aadhaar_card?.is_verified,
    },
    {
      id: "sslc_mark_sheet",
      label: "SSLC Marksheet",
      url: document_details?.sslc_mark_sheet?.url,
      isVerified: document_details?.sslc_mark_sheet?.is_verified,
    },
    {
      id: "hse_mark_sheet",
      label: "HSE Marksheet",
      url: document_details?.hse_mark_sheet?.url,
      isVerified: document_details?.hse_mark_sheet?.is_verified,
    },
    {
      id: "hsc_mark_sheet",
      label: "HSC Marksheet",
      url: document_details?.hsc_mark_sheet?.url,
      isVerified: document_details?.hsc_mark_sheet?.is_verified,
    },
    {
      id: "diploma_mark_sheet",
      label: "Diploma Marksheet",
      url: document_details?.diploma_mark_sheet?.url,
      isVerified: document_details?.diploma_mark_sheet?.is_verified,
    },
    {
      id: "community_certificate",
      label: "Community Certificate Photo",
      url: document_details?.community_certificate?.url,
      isVerified: document_details?.community_certificate?.is_verified,
    },
  ];

  const keysToCheck = [
    "passport_size_photo",
    "aadhaar_card",
    "sslc_mark_sheet",
    "hse_mark_sheet",
    "hsc_mark_sheet",
    "diploma_mark_sheet",
    "community_certificate",
  ];

  let total = 0;
  let verified = 0;

  keysToCheck.forEach((key) => {
    const doc = document_details[key];
    if (doc && doc.url) {
      total++;
      if (doc.is_verified) {
        verified++;
      }
    }
  });

  const navigationCall = (values) => {
    window.open(values, "_blank");
  };

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
      <div className="p-6 w-full max-w-2xl bg-white rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Document Verification
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {documentTypes.map((docType) => (
            <div
              key={docType.id}
              className="p-4 rounded-lg border"
              hidden={docType?.url === ""}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {docType.label}
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    {docType.url !== ""
                      ? "Document uploaded"
                      : "No document uploaded"}
                    <Eye
                      className="text-blue-500"
                      size={20}
                      onClick={() => {
                        navigationCall(docType?.url);
                      }}
                    />
                  </p>
                </div>
                {docType?.url && (
                  <div className="flex space-x-2">
                    <button
                      hidden={docType?.isVerified === true}
                      onClick={() =>
                        onVerify(docType?.id, documents?.id, "Verified")
                      }
                      className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() =>
                        onReject(docType?.id, documents?.id, "Rejected")
                      }
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          {total === verified && (
            <>
              <button
                onClick={() =>
                  onSubmitStatus(documents?.id, "Document Verified")
                }
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Submit
              </button>
            </>
          )}

          <button
            onClick={onClose}
            className="ml-5 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
