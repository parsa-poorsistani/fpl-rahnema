import { Request, Response } from "express";
import {
  IFile,
  IFileController,
  IFileService,
} from "../Interface/file.interface";
import { FileService } from "../service/file.service";

export class FileController implements IFileController {
  fileService: IFileService;
  constructor() {
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
        return res.status(200).json(myFile);
      }
      return res.status(400).json({ msg: "no file was sent" });
    } catch (err) {
      return res.status(400);
    }
  };
}
