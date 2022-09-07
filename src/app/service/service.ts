import { Request, Response } from "express";
import { Result, validationResult } from "express-validator";
import { ValidationError } from "../helpers/error/validationError";
import nodemailer from "nodemailer";

async function validationErrorHandler(req: Request, status = 400) {
  if (!validationResult(req).isEmpty()) {
    throw new ValidationError(validationResult(req).array(), status);
  }
}

function mailSender(receiver: string, subject: string, text: string) {
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

export { validationErrorHandler, mailSender };
