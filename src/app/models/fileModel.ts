import mongoose from "mongoose";
import { IFile } from "../interface/file.interface";

const fileSchema = new mongoose.Schema<IFile>(
  {
    name: { type: String, trim: true, default: null },
    url: { type: String, trim: true, default: null },
    mimetype: { type: String, trim: true, default: null },
    size: { type: Number, trim: true, default: 0 },
    destination: { type: String, trim: true, default: null },
    path: { type: String, trim: true, default: null },
  },
  { versionKey: false }
);

module.exports = mongoose.model("File", fileSchema);
