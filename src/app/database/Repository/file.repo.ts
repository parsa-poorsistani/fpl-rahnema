import { IFile, IFileRepo } from "../../Interface/file.interface";
import models = require("../../models/path");

export class FileRepo implements IFileRepo {
  public createFile = async (file: IFile): Promise<IFile> => {
    let finalFile: IFile = await models.fileModel.create(file);
    return finalFile;
  };
}
