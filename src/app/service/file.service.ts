import multer from "multer";
export class fileService {
  public setStorage = (): multer.StorageEngine => {
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "uploads");
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now());
      },
    });
    return storage;
  };
}
