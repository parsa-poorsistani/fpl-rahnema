import multer from "multer";
import utils = require("../helpers/utils/utils");
import models = require("../../app/models/path");
import { IFile, IFileRepo, IFileService } from "../Interface/file.interface";
import { FileRepo } from "../database/Repository/file.repo";

export class FileService implements IFileService {
  fileRepo: IFileRepo;
  constructor() {
    this.fileRepo = new FileRepo();
  }

  public createFile = async (file: Express.Multer.File): Promise<IFile> => {
    let finalFile: IFile = {
      name: file!.filename,
      url: await utils.urlFormatter(file!.path),
      mimetype: file!.mimetype,
      size: file!.size,
      destination: file!.destination,
      path: file!.path,
    };
    finalFile = await this.fileRepo.createFile(finalFile);
    return finalFile;
  };
}
