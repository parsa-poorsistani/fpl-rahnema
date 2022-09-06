import { Request, Response } from "express";
const { validationResult } = require("express-validator");
import { GlobalError } from "../helpers/error/globalError";
const nodemailer = require("nodemailer");

function validationErrorHandler(req: Request, res: Response, status = 400) {
  if (validationResult(req, res).errors.length !== 0) {
    throw new GlobalError(validationResult(req, res).errors, 400);
  }
}

export function mailSender(receiver: string, subject: string, text: string) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rcdev.team2@gmail.com",
      pass: "xqpxkysdawyyivrf",
    },
  });
  let mailOptions = {
    from: "rcdev.team2@gmail.com",
    to: receiver,
    subject: subject,
    text: text,
  };

  transporter.sendMail(
    mailOptions,
    function (error: any, info: { response: string }) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
}

export { validationErrorHandler };
