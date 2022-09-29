import { Request, Response } from "express";

export interface IFile {
  name: string;
  url: string;
  mimetype: string;
  size: number;
  destination: string;
  path: string;
}

export interface IFileController {
  fileService: IFileService;
  createFile(req: Request, res: Response): Promise<Response>;
}

export interface IFileService {
  fileRepo: IFileRepo;
  createFile(file: Express.Multer.File): Promise<IFile>;
}

export interface IFileRepo {
  createFile(file: IFile): Promise<IFile>;
}
