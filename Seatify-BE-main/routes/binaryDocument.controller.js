import express from "express";
import axios from "axios";
import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

const baseUrl = "https://k12.velzx.com/apicall";

// const GEMINI_API_KEY = "AIzaSyB_QM4ickU1TFEeKxj1cxD_gZnhb5qsYPo";
// const GEMINI_API_KEY = "AIzaSyB_QM4ickU1TFEeKxj1cxD_gZnhb5qsYP1";

const PROMPTS = {
  ACADEMIC: `Extract ONLY the following in JSON format:
{
  "student_name": "[Full name]",
  "marks_obtained": "[Marks/Percentage]" ,
   "passed_out_year": "[Year of Issue]" ,
   "total_subject":"[theory count]"
}
Return ONLY JSON, no extra text.`,
  SSLC: `Extract ONLY the following in JSON format:
{
  "student_name": "[Full name]",
  "marks_obtained": "[Marks/Percentage]" ,
  "passed_out_year": "[Year of Issue]" ,
  "total_subject":"[subject count]"
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

async function processImage(file, prompt, GEMINI_API_KEY) {
  try {
    console.log("GEMINI_API_KEY", GEMINI_API_KEY);
    console.log("file", file);
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const imagePart = await urlToBinaryInlineData(file);
    const result = await model.generateContent([prompt, imagePart]);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : { error: "No JSON found" };
  } catch (error) {
    console.log("error 55", error);
    throw new Error(`Processing failed: ${error}`);
  }
}

async function urlToBinaryInlineData(imageUrl) {
  const res = await fetch(imageUrl);
  const contentType = res.headers.get("content-type");
  const buffer = await res.arrayBuffer();
  // console.log("contentType", contentType);
  // if (!contentType.startsWith("application/pdf")) {
  //   throw new Error("Unsupported file type");
  // }

  return {
    inlineData: {
      data: Buffer.from(buffer).toString("base64"),
      mimeType: contentType,
    },
  };
}

export const aadhaarCardUpload = async (req, res) => {
  try {
    const fileData = req?.body?.billing_upload_aadhar;
    if (!fileData) return res.status(400).json({ error: "No file uploaded" });
    const result = await processImage(fileData, PROMPTS.AADHAAR);
    // res.json(result);
    const successResponse = {
      status: 200,
      message: "Success",
      data: result,
    };
    return res?.status(200).json(successResponse);
  } catch (error) {
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
    const fileData = req?.body?.billing_upload_community_certificate;
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
    const fileData = req?.body?.billing_upload_12thmarksheet;
    if (!fileData) return res.status(400).json({ error: "No file uploaded" });
    const result = await processImage(fileData, PROMPTS.ACADEMIC);
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

export const sslcCertificate = async (req, res) => {
  try {
    const fileData = req?.body?.billing_upload_10th_marksheet;
    if (!fileData) return res.status(400).json({ error: "No file uploaded" });
    const result = await processImage(fileData, PROMPTS.SSLC);
    const successResponse = {
      status: 200,
      message: "Success",
      data: result,
    };
    return res?.status(200).json(successResponse);
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

export const checkDocumentsCopy = async (req, res) => {
  try {
    console.log("filesInfo", req?.body?.filesInfo[0]);

    let CheckAadhaar = false;
    let aadhaarCardData = [];

    let communityCertificate = false;
    let communityCertificateData = [];

    if (req?.body?.filesInfo[0]?.billing_upload_aadhar) {
      const fileData = req?.body?.filesInfo[0]?.billing_upload_aadhar;
      const result = await processImage(fileData, PROMPTS.AADHAAR);
      if (result?.aadhaar_number) {
        CheckAadhaar = true;
        aadhaarCardData?.push(result);
      } else {
        const failureResponseInfo = {
          status: 500,
          message: "Aadhaar Number is Not Fetched",
        };
        return res.status(200).json(failureResponseInfo);
      }

      if (CheckAadhaar === true) {
        console.log("running up 172");
        const fileData2 =
          req?.body?.filesInfo[0]?.billing_upload_community_certificate;
        const result2 = await processImage(fileData2, PROMPTS.COMMUNITY);
        if (result2?.student_name) {
          communityCertificate = true;
          communityCertificateData?.push(result2);
        } else {
          const failureResponseInfo = {
            status: 500,
            message: "Community certificate is Not Fetched",
          };
          return res.status(200).json(failureResponseInfo);
        }
      }

      console.log("CheckAadhaar", CheckAadhaar);

      console.log("communityCertificate", communityCertificate);
    }
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

export const checkDocuments = async (req, res) => {
  try {
    const fileDataInfo = req?.body;

    const aadhaarUrl = fileDataInfo?.billing_upload_aadhar;

    const communityUrl = fileDataInfo?.billing_upload_community_certificate;

    const academicUrl = fileDataInfo?.billing_upload_10th_marksheet;

    const sslcUrl = fileDataInfo?.billing_upload_12thmarksheet;

    const GEMINI_API_KEY = req?.body?.google_api_key;

    // const GEMINI_API_KEY = "AIzaSyAfBjO5gXpgHHOoEhTdFZN-U5j2R96piE4";

    console.log("GEMINI_API_KEY", GEMINI_API_KEY);

    if (!aadhaarUrl || !communityUrl || !academicUrl || !sslcUrl) {
      return res.status(400).json({ error: "All 4 image URLs are required." });
    }

    const [aadhaarData, communityData, academicData, sslcData] =
      await Promise.all([
        processImage(aadhaarUrl, PROMPTS.AADHAAR, GEMINI_API_KEY),
        processImage(communityUrl, PROMPTS.COMMUNITY, GEMINI_API_KEY),
        processImage(academicUrl, PROMPTS.ACADEMIC, GEMINI_API_KEY),
        processImage(sslcUrl, PROMPTS.SSLC, GEMINI_API_KEY),
      ]);

    console.log("234");
    console.log("aadhaarData", aadhaarData);
    console.log("communityData", communityData);
    console.log("academicData", academicData);
    console.log("sslcData", sslcData);
    res.json({
      aadhaar: aadhaarData,
      community: communityData,
      academic: sslcData,
      sslc: academicData,
      status: 200,
    });
  } catch (error) {
    console.log("error", error);
    const failureResponseInfo = {
      error: error,
      status: 500,
      message: "Technical Issues occurred, Please contact support",
    };
    return res.status(500).json(failureResponseInfo);
  }
};
