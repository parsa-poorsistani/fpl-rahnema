import { body } from "express-validator";
const models = require("../../models/path");

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
    body(["code", "email"]).trim().notEmpty().withMessage("please send code"),
  ];
}

export { handleSignUp, handleLogin, handleVerify };
