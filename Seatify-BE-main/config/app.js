require("dotenv/config");

const appConfig = {
  app_name: "app-name",
  key: "2a89502df9",
  expiry: 10,
  s3BucketName: "",
  s3upload: {
    accessKeyId: "",
    secretAccessKey: "",
  },
};

module.exports = appConfig;
