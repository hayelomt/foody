import { nanoid } from 'nanoid';
import * as multer from 'multer';
import HttpError from '../error';

const IMAGE_UPLOAD_DIR = './public/uploads/imgs/';

const imageStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, IMAGE_UPLOAD_DIR);
  },
  filename: (_req, file, cb) => {
    const fileName = file.originalname
      .toLowerCase()
      .trim()
      .split(' ')
      .join('-');
    cb(null, `${nanoid()}${fileName}`);
  },
});

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: (_req, file, cb) => {
    if (!file) {
      return cb(null, true);
    }

    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(
        new HttpError(400, 'Bad Request', {
          [file.fieldname]: 'Image type should be: .jpeg, .jpg and .png',
        }),
      );
    }
  },
});

export { imageUpload };
