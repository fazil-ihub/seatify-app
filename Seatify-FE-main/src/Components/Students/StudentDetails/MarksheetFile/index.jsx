import React from "react";
import { Form, Input, Row, Card, Col, Button, Upload } from "antd";
import { StarOutlined, DeleteOutlined } from "@ant-design/icons";

const index = ({ imageInfo }) => {
  const getFilenameFromUrl = (url) => {
    return url.split("/").pop();
  };

  const filename = getFilenameFromUrl(imageInfo || "");

  const props = {
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
    },
    defaultFileList: [
      {
        uid: "1",
        name: filename,
        // size: 1234567,
        status: "done",
        response: "Server Error 500",
        // custom error message to show
        url: imageInfo,
      },
    ],
    showUploadButton: false,
    showUploadList: {
      showDownloadIcon: true,
      downloadIcon: "Download",
      showRemoveIcon: true,
      removeIcon: (
        <DeleteOutlined
          onClick={(e) => console.log(e, "custom removeIcon event")}
        />
      ),
    },
  };

  return (
    <div>
      <Upload {...props} />
    </div>
  );
};

export default index;
