import express from "express";
// import multer from "multer";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { sendEmail } from "../utils/email/emailService.js";
import { loadTemplate } from "../utils/email/loadTemplate.js";
import asyncHandler from "express-async-handler";
import multiparty from "connect-multiparty";
import db from "../config/db.js";
import bcrypt from "bcryptjs";
import {
  aadhaarCardUpload,
  communityCertificate,
  hscCertificate,
  sslcCertificate,
  checkDocuments,
} from "./binaryDocument.controller.js";

const multipartyMiddleware = multiparty();

const baseUrl = "https://k12.seatifyai.com/apicall";

var router = express.Router();

const GEMINI_API_KEY = "AIzaSyDIjzH1W3ZHVRI3G3OcudxvAr__RwvzOY8";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post("/user-login", async function (req, res, next) {
  try {
    const { username, password } = req.body;

    // Query database for user
    const [users] = await db.query(
      "SELECT * FROM user_login WHERE email_id = ?",
      [username]
    );

    if (users.length === 0) {
      return res.status(401).json({
        status: "error",
        status_code: 401,
        message: "Invalid User"
      });
    }

    const user = users[0];
    let dbPassword = user.password;

    // 🔥 Fix PHP $2y$ hashes
    if (dbPassword.startsWith("$2y$")) {
      dbPassword = dbPassword.replace("$2y$", "$2a$");
    }

    const isMatch = await bcrypt.compare(password, dbPassword);

    if (!isMatch) {
      return res.status(401).json({
        status: "error",
        status_code: 401,
        message: "Invalid Password"
      });
    }

    // OPTIONAL: rehash to native Node bcrypt to update old PHP hashes
    if (user.password.startsWith("$2y$")) {
      const newHash = await bcrypt.hash(password, 10);
      await db.query(
        "UPDATE user_login SET password=? WHERE id=?",
        [newHash, user.id]
      );
    }

    // Success response - return the exact structure the frontend expects
    // Frontend expects: response.data.data.token, .email, .user_id, .username, .role
    // We'll generate a dummy token or use JWT if you have it setup, but for now matching the structure:

    // Note: The previous PHP backend returned a token. Since we are moving to Node, 
    // we should ideally generate a JWT here. For now, passing a placeholder or existing token logic if available.
    // If you don't have JWT setup yet, we can return the user ID as token or a simple string string.

    // Let's create a basic JWT if 'jsonwebtoken' is available or just return success key data.
    // I noticed 'jsonwebtoken' in package.json.

    const token = "mock_token_until_jwt_implemented__" + user.id;

    return res.status(200).json({
      status: "success",
      status_code: 200,
      message: "Login successful",
      data: {
        token: token,
        email: user.email_id,
        user_id: user.id,
        username: user.username || user.email_id, // Fallback if username column isn't there
        role: user.role || 'user' // Fallback
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    const failureResponseInfo = {
      error: error,
      status: 500,
      message: "Something went wrong",
    };
    return res.status(500).json(failureResponseInfo);
  }
});

router.post("/get-order-details", function (req, res, next) {
  try {
    const { authorization } = req.headers;
    const [authType, authToken] = authorization.split(" ");
    let data = JSON.stringify({
      token: authorization,
      customerId: req.body.customerId,
    });
    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: `${baseUrl}/get_order_by_student_id.php`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        // const jsonRes = response?.data[0];
        // const resData = jsonRes?.filter((x) => x?.status === "wc-completed");
        return res.status(200).json(response?.data);
      })
      .catch((error) => {
        return res.status(500).json(JSON.stringify(error));
      });
  } catch (error) {
    const failureResponseInfo = {
      error: error,
      status: 200,
      message: "Something went wrong",
    };
    return res.status(200).json(failureResponseInfo);
  }
});

router.post("/get-form-entries", function (req, res, next) {
  try {
    const { authorization } = req.headers;
    const [authType, authToken] = authorization.split(" ");
    let data = JSON.stringify({
      token: authorization,
      customerId: req.body.customerId,
    });
    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: `${baseUrl}/get_form_entries.php`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        const resData = JSON?.stringify(response?.data);
        return res.status(200).json(response?.data);
      })
      .catch((error) => {
        return res.status(500).json(JSON.stringify(error));
      });
  } catch (error) {
    const failureResponseInfo = {
      error: error,
      status: 200,
      message: "Something went wrong",
    };
    return res.status(200).json(failureResponseInfo);
  }
});

router.get("/get-payment-list", function (req, res, next) {
  try {
    const { authorization } = req.headers;
    const [authType, authToken] = authorization.split(" ");
    let data = JSON.stringify({
      token: authorization,
    });
    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: `${baseUrl}/getpayments.php`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        console.log("response 203", response);
        return res.status(200).json(response?.data);
      })
      .catch((error) => {
        console.log("error 206", error);
        return res.status(500).json(JSON.stringify(error));
      });
  } catch (error) {
    console.log("error", error);
    const failureResponseInfo = {
      error: error,
      status: 200,
      message: "Something went wrong",
    };
    return res.status(200).json(failureResponseInfo);
  }
});

router.get("/get-courses-list", function (req, res, next) {
  try {
    const { authorization } = req.headers;
    const [authType, authToken] = authorization.split(" ");
    let data = JSON.stringify({
      token: authorization,
    });
    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: `${baseUrl}/get_courses_list.php`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        return res.status(200).json(response?.data);
      })
      .catch((error) => {
        return res.status(500).json(JSON.stringify(error));
      });
  } catch (error) {
    const failureResponseInfo = {
      error: error,
      status: 200,
      message: "Something went wrong",
    };
    return res.status(200).json(failureResponseInfo);
  }
});

router.get("/get-operations", function (req, res, next) {
  try {
    const { authorization } = req.headers;
    const [authType, authToken] = authorization.split(" ");
    let data = JSON.stringify({
      token: authorization,
    });
    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: `${baseUrl}/get_operations.php`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        return res.status(200).json(response?.data);
      })
      .catch((error) => {
        return res.status(500).json(JSON.stringify(error));
      });
  } catch (error) {
    const failureResponseInfo = {
      error: error,
      status: 200,
      message: "Something went wrong",
    };
    return res.status(200).json(failureResponseInfo);
  }
});

router.post("/update-status-details", function (req, res, next) {
  try {
    const { authorization } = req.headers;
    const [authType, authToken] = authorization.split(" ");
    let data = JSON.stringify({
      token: authorization,
      bodyPayload: req.body,
    });
    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: `${baseUrl}/get_update_status_details.php`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then(async (response) => {
        const resData = JSON?.stringify(response?.data);
        if (resData) {
          const replacements = {
            customer_name: response?.data?.data[0]?.customer_name,
            order_id: response?.data?.data[0]?.order_id,
            order_status: response?.data?.data[0]?.status,
            order_link: "",
            year: "2025",
            company_name: "SEATIFY",
          };
          const templatePath = "document_status";
          const fromAddress = "pf4.ihub@snsgroups.com";
          const htmlContent = loadTemplate(templatePath, replacements);
          const email = await sendEmail(
            response?.data?.data[0]?.customer_email,
            "Document Status Update",
            htmlContent,
            fromAddress,
            "SEATIFY"
          );
          if (email) {
            return res.status(200).json(response?.data);
          }
        }
      })
      .catch((error) => {
        return res.status(500).json(JSON.stringify(error));
      });
  } catch (error) {
    const failureResponseInfo = {
      error: error,
      status: 200,
      message: "Something went wrong",
    };
    return res.status(200).json(failureResponseInfo);
  }
});

router.post("/update-document-status", function (req, res, next) {
  try {
    const { authorization } = req.headers;
    const [authType, authToken] = authorization.split(" ");
    let data = JSON.stringify({
      token: authorization,
      bodyPayload: req.body,
    });
    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: `${baseUrl}/get_update_document_details.php`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        const resData = JSON?.stringify(response?.data);
        return res.status(200).json(response?.data);
      })
      .catch((error) => {
        return res.status(500).json(JSON.stringify(error));
      });
  } catch (error) {
    const failureResponseInfo = {
      error: error,
      status: 200,
      message: "Something went wrong",
    };
    return res.status(200).json(failureResponseInfo);
  }
});

router.get("/get-dashboard-list", function (req, res, next) {
  try {
    const { authorization } = req.headers;
    const [authType, authToken] = authorization.split(" ");
    let data = JSON.stringify({
      token: authorization,
    });
    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: `${baseUrl}/get_dashboard_info.php`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        return res.status(200).json(response?.data);
      })
      .catch((error) => {
        return res.status(500).json(JSON.stringify(error));
      });
  } catch (error) {
    const failureResponseInfo = {
      error: error,
      status: 200,
      message: "Something went wrong",
    };
    return res.status(200).json(failureResponseInfo);
  }
});

router.post(
  "/check-aadhaar-card",
  multipartyMiddleware,
  asyncHandler(aadhaarCardUpload)
);

router.post(
  "/check-community-certificate",
  multipartyMiddleware,
  asyncHandler(communityCertificate)
);

router.post(
  "/hsc-certificate",
  multipartyMiddleware,
  asyncHandler(hscCertificate)
);

router.post(
  "/sslc-certificate",
  multipartyMiddleware,
  asyncHandler(sslcCertificate)
);

router.post(
  "/check-documents",
  multipartyMiddleware,
  asyncHandler(checkDocuments)
);

// router.get("/check-cronjob", asyncHandler(performPaymentCheck));

export default router;
