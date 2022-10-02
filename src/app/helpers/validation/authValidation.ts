import { body } from "express-validator";
import { ManagerService } from "../../service/manager.service";
import models = require("../../models/path");
const managerService = new ManagerService();

function handleSignUp() {
  return [
    body(["first_name", "last_name", "password"])
      .trim()
      .notEmpty()
      .withMessage("please send requested data"),

    body("email")
      .trim()
      .notEmpty()
      .withMessage("Send email")
      .bail()
      .isEmail()
      .withMessage("Email format is not correct")
      .bail()
      .custom(async (value: any, { req }) => {
        return await models.managerModel
          .findOne({ email: value })
          .then((manager: any) => {
            if (manager) {
              return Promise.reject("email is already taken");
            }
          });
      }),

    body("username")
      .trim()
      .notEmpty()
      .withMessage("Send username")
      .bail()
      .custom(async (value, { req }) => {
        let manager = await managerService.getManagerByEmail(value);
        if (manager) {
          return Promise.reject("email is already taken");
        }

        return await models.managerModel
          .findOne({ username: value })
          .then((manager: any) => {
            if (manager) {
              return Promise.reject("username is already taken");
            }
          });
      }),
  ];
}

function handleLogin() {
  return [
    body(["password"]).trim().notEmpty().withMessage("please send password"),

    body("username")
      .trim()
      .notEmpty()
      .withMessage("Send username")
      .bail()
      .custom(async (value: any, { req }) => {
        return await models.managerModel
          .findOne({ username: value })
          .then((manager: any) => {
            if (!manager) {
              return Promise.reject("manager doesn't exist");
            }
          });
      }),
  ];
}

function handleVerify() {
  return [
    body("code").trim().notEmpty().withMessage("please send code"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Send email")
      .bail()
      .isEmail()
      .withMessage("Email format is not correct")
      .bail()
      .custom(async (value: string, { req }) => {
        let manager = await managerService.getManagerByEmail(value);
        if (manager) {
          return Promise.reject("email is already taken");
        }
        // .findOne({ email: value })
        // .then((manager: any) => {
        //   if (manager) {
        //     return Promise.reject("email is already taken");
        //   }
        // });
      }),
  ];
}

export { handleSignUp, handleLogin, handleVerify };
