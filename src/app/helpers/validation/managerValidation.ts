import { ManagerService } from "../../service/manager.service";
import { body } from "express-validator";
import mongoose from "mongoose";
const managerService = new ManagerService();

export function handleUpdateProfile() {
  return [
    body("email")
      .trim()
      .optional()
      .isEmail()
      .withMessage("Email format is not correct")
      .bail()
      .custom(async (value: any, { req }) => {
        let manager = await managerService.getManagerByEmail(value);

        if (
          manager &&
          !manager._id.equals(new mongoose.Types.ObjectId(req._id))
        ) {
          return Promise.reject("email is already taken");
        }
      }),

    body("username")
      .trim()
      .notEmpty()
      .withMessage("Send username")
      .bail()
      .custom(async (value, { req }) => {
        let manager = await managerService.getManagerByUsername(value);
        if (
          manager &&
          !manager._id.equals(new mongoose.Types.ObjectId(req._id))
        ) {
          return Promise.reject("username is already taken");
        }
      }),
  ];
}
