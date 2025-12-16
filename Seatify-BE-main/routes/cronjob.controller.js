import express from "express";
import axios from "axios";
import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

const baseUrl = "https://k12.seatifyai.com/apicall";

const GEMINI_API_KEY = "AIzaSyDIjzH1W3ZHVRI3G3OcudxvAr__RwvzOY8";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const PROMPTS = {
  ACADEMIC: `Extract ONLY the following in JSON format:
{
  "student_name": "[Full name]",
  "marks_obtained": "[Marks/Percentage]" 
}
Return ONLY JSON, no extra text.`,
  SSLC: `Extract ONLY the following in JSON format:
{
  "student_name": "[Full name]",
  "marks_obtained": "[Marks/Percentage]" 
}
Return ONLY JSON, no extra text.`,

  AADHAAR: `Extract ONLY the following in JSON:
{
  "aadhaar_number": "[12-digit number]",
  "student_name": "[Full name]",
   "date_of_birth": "[DOB]"
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
    const pdfBuffer = fs.readFileSync(file?.path);
    let mimetypeVal = file?.type || "application/pdf";
    if (!mimetypeVal) throw new Error("Missing or invalid mimeType for file.");
    const imagePart = {
      inlineData: {
        data: pdfBuffer?.toString("base64"),
        mimeType: mimetypeVal,
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

async function convertImageToBase64(url) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const base64String = btoa(String.fromCharCode(...new Uint8Array(buffer)));
  return base64String;
}

async function processTestImage(file, prompt) {
  try {
    console.log("file", file);
    const imagePart = await urlToBinaryInlineData(file);

    const result = await model.generateContent([prompt, imagePart]);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : { error: "No JSON found" };
  } catch (error) {
    throw new Error(`Processing failed: ${error}`);
  }
}

async function urlToBinaryInlineData(imageUrl) {
  const res = await fetch(imageUrl);
  const contentType = res.headers.get("content-type");
  const buffer = await res.arrayBuffer();

  if (!contentType.startsWith("application/pdf")) {
    throw new Error("Unsupported file type");
  }

  return {
    inlineData: {
      data: Buffer.from(buffer).toString("base64"),
      mimeType: contentType,
    },
  };
}

export const performPaymentCheck = async (req, res) => {
  try {
    let config = {
      method: "GET",
      maxBodyLength: Infinity,
      url: `${baseUrl}/get_cron_details.php`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .request(config)
      .then((response) => {
        // console.log("response",response)
        return res?.status(200).json(response);
      })
      .catch((error) => {
        return res?.status(500).json(JSON.stringify(error));
      });
  } catch (error) {
    const failureResponseInfo = {
      error: error,
      status: 200,
      message: "Something went wrong",
    };
    return res?.status(200).json(failureResponseInfo);
  }
};

export const updateDocumentStatus = async (req, res) => {
  try {
    let config = {
      method: "GET",
      maxBodyLength: Infinity,
      url: `${baseUrl}/get_document_update.php`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .request(config)
      .then((response) => {
        return res?.status(200).json(response);
      })
      .catch((error) => {
        return res?.status(500).json(JSON.stringify(error));
      });
  } catch (error) {
    const failureResponseInfo = {
      error: error,
      status: 200,
      message: "Something went wrong",
    };
    return res?.status(200).json(failureResponseInfo);
  }
};

export const aadhaarCardUpload = async (req, res) => {
  try {
    const fileData = req?.files?.fileInfo;
    if (!fileData) return res.status(400).json({ error: "No file uploaded" });
    const result = await processImage(fileData, PROMPTS.AADHAAR);
    res.json(result);
  } catch (error) {
    console.log("error", error);
    const failureResponseInfo = {
      error: error,
      status: 200,
      message: "Something went wrong",
    };
    return res.status(200).json(failureResponseInfo);
  }
};

export const testAadhaarCardUpload = async (req, res) => {
  try {
    console.log("req?.body?.pathName", req?.body?.pathName);
    const fileData = req?.body?.pathName;
    if (!fileData) return res.status(400).json({ error: "No file uploaded" });
    const result = await processTestImage(fileData, PROMPTS.AADHAAR);
    res.json(result);
  } catch (error) {
    console.log("error", error);
    const failureResponseInfo = {
      error: error,
      status: 200,
      message: "Something went wrong",
    };
    return res.status(200).json(failureResponseInfo);
  }
};

export const communityCertificate = async (req, res) => {
  try {
    const fileData = req?.files?.fileInfo;
    if (!fileData) return res.status(400).json({ error: "No file uploaded" });
    const result = await processImage(fileData, PROMPTS.COMMUNITY);
    res.json(result);
  } catch (error) {
    const failureResponseInfo = {
      error: error,
      status: 200,
      message: "Something went wrong",
    };
    return res.status(200).json(failureResponseInfo);
  }
};

export const hscCertificate = async (req, res) => {
  try {
    const fileData = req?.files?.fileInfo;
    if (!fileData) return res.status(400).json({ error: "No file uploaded" });
    const result = await processImage(fileData, PROMPTS.ACADEMIC);
    res.json(result);
  } catch (error) {
    const failureResponseInfo = {
      error: error,
      status: 200,
      message: "Something went wrong",
    };
    return res.status(200).json(failureResponseInfo);
  }
};

export const sslcCertificate = async (req, res) => {
  try {
    const fileData = req?.files?.fileInfo;
    if (!fileData) return res.status(400).json({ error: "No file uploaded" });
    const result = await processImage(fileData, PROMPTS.SSLC);
    res.json(result);
  } catch (error) {
    const failureResponseInfo = {
      error: error,
      status: 200,
      message: "Something went wrong",
    };
    return res.status(200).json(failureResponseInfo);
  }
};
