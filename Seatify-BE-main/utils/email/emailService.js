import nodemailer from "nodemailer";
import { SESClient } from "@aws-sdk/client-ses";
import aws from "aws-sdk";


export const sendEmail = (to, subject, html, fromAddress, orgName) => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      SES: {
        ses: new aws.SES({
          region: "ap-south-1",
          apiVersion: "2012-10-17",
          credentials: {
            accessKeyId: "AKIAQLVQREW3W2663Y7J",
            secretAccessKey: "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",
          },
        }),
        aws,
      },
    });
    const emailList = to.split(",").map((email) => email.trim());
    const mailOptions = {
      from: {
        name: orgName,
        address: fromAddress,
      },
      to: emailList[0],
      bcc: emailList,
      subject,
      html,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject({ success: false, error: error.message });
      } else {
        resolve({
          success: true,
          response: info.response,
          messageId: info.messageId,
        });
      }
    });
  });
};
