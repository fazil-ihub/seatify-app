import express from "express";
// import multer from "multer";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { sendEmail } from "../utils/email/emailService.js";
import { loadTemplate } from "../utils/email/loadTemplate.js";
import asyncHandler from "express-async-handler";
import multiparty from "connect-multiparty";

// import {
//   aadhaarCardUpload,
//   communityCertificate,
//   sslcCertificate,
//   hscCertificate,
//   testAadhaarCardUpload
// } from "./cronjob.controller.js";

import { performPaymentCheck } from "./cronjob.controller.js";

import {
  aadhaarCardUpload,
  communityCertificate,
  sslcCertificate,
  hscCertificate,
  checkDocuments,
} from "./binaryDocument.controller.js";

const multipartyMiddleware = multiparty();

const baseUrl = "https://seatifyai.com/apicall";

var router = express.Router();

const GEMINI_API_KEY = "AIzaSyDIjzH1W3ZHVRI3G3OcudxvAr__RwvzOY8";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const genAI = new GoogleGenerativeAI({
//   model: "gemini-1.5-flash",
//   apikey: GEMINI_API_KEY,
// });

const PROMPTS = {
  ACADEMIC: `Extract ONLY the following in JSON format:
{
  "student_name": "[Full name]",
  "marks_obtained": "[Marks/Percentage]"
}
Return ONLY JSON, no extra text.`,

  AADHAAR: `Extract ONLY the following in JSON:
{
  "aadhaar_number": "[12-digit number]",
  "student_name": "[Full name]"
}
Return ONLY JSON, no extra text.`,

  COMMUNITY: `Extract ONLY the following in JSON:
{
  "student_name": "[Full name]",
  "community_category": "[Category]"
}
Return ONLY JSON, no extra text.`,
};

async function processImage(file, prompt) {
  try {
    console.log("prompt", prompt);
    console.log("file", file);
    // const prompt = "List 3 benefits of using AI in healthcare.";

    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // const result = await model.generateContent(prompt);
    const imagePart = {
      inlineData: {
        data: file.buffer.toString("base64"),
        mimeType: file.mimetype,
      },
    };
    const result = await model.generateContent([prompt, imagePart]);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : { error: "No JSON found" };
  } catch (error) {
    throw new Error(`Processing failed: ${error.message}`);
  }
}

router.get("/get-students", function (req, res, next) {
  try {
    const { authorization } = req.headers;
    const [authType, authToken] = authorization.split(" ");
    let data = JSON.stringify({
      token: authorization,
    });
    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: `${baseUrl}/get_students.php`,
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

router.get("/get-users", function (req, res, next) {
  try {
    const { authorization } = req.headers;
    const [authType, authToken] = authorization.split(" ");
    let data = JSON.stringify({
      token: authorization,
    });
    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: `${baseUrl}/get_users.php`,
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

router.post("/user-login", function (req, res, next) {
  try {
    let data = JSON.stringify({
      username: req?.body?.username,
      password: req?.body?.password,
    });

    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: `${baseUrl}/check_login.php`,
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
