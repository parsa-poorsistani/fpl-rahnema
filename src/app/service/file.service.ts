import utils = require("../helpers/utils/utils");
import { IFile, IFileRepo, IFileService } from "../interface/file.interface";
import { FileRepo } from "../database/repository/file.repo";

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
