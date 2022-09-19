import { Request } from "express";
import multer from "multer";
import utils = require("../utils/utils");
import { DestinationCallback, FileNameCallback } from "../../Types/file.type";

let storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ): void => {
    cb(null, "./uploads/profiles");
  },

  filename: async (
    req: Request,
    file: Express.Multer.File,
    cb: FileNameCallback
  ): Promise<void> => {
    cb(null, await utils.getFilename(file));
  },
});

export const upload: multer.Multer = multer({ storage: storage });
