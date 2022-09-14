import { validationResult } from "express-validator";
import { IPlayer } from "../../Interface/player.interface";
import {
  paginateResponseToFrontType,
  paginateResponseType,
} from "../../Types/response.type";
import { ValidationError } from "../error/validationError";
import nodemailer from "nodemailer";
import { Request, Response } from "express";

export const paginationResponseToFront = async (
  response: paginateResponseType
): Promise<paginateResponseToFrontType> => {
  let newResponse: paginateResponseToFrontType = {
    data: response.docs as IPlayer[],
    total: response.total,
    limit: response.limit,
    page: response.page,
    pages: response.pages,
  };
  return newResponse;
};

export const validationErrorHandler = async (req: Request, status = 400) => {
  if (!validationResult(req).isEmpty()) {
    throw new ValidationError(validationResult(req).array(), status);
  }
};

export const mailSender = async (
  receiver: string,
  subject: string,
  text: string
) => {
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
};

export const confirmationCodeGenerator = async (): Promise<Number> => {
  const val: Number = await Math.floor(1000 + Math.random() * 9000);
  return val;
};
