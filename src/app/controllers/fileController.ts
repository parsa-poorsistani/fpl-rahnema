import { Request, Response } from "express";
import errors = require("../helpers/error/path");
import {
  IFile,
  IFileController,
  IFileService,
} from "../interface/file.interface";
import { ApiGeneralService } from "../service/api.general.service";
import { FileService } from "../service/file.service";

export class FileController
  extends ApiGeneralService
  implements IFileController
{
  fileService: IFileService;
  constructor() {
    super();
    this.fileService = new FileService();
  }

  public createFile = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      let myFile: IFile;
      if (req.file) {
        myFile = await this.fileService.createFile(req.file);
        if (myFile) {
          return await this.createSuccessfulResponse(
            res,
            "file successfully created",
            myFile
          );
        }
        throw "creating file failed";
      }
      return this.sendFailedResponse(
        res,
        new errors.BadRequestError("no file was sent")
      );
    } catch (err) {
      return this.sendFailedResponse(res, new errors.InternalServerError(err));
    }
  };
}
