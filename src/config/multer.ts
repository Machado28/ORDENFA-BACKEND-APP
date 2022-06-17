import multer from 'multer';
import { extname, resolve } from 'path';
import { randomBytes } from 'crypto';
import { diskStorage, Options } from 'multer';

export const multerconfig = {
  dest: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, resolve(__dirname, '..', '..', 'tmp', 'uploads'));
    },
    filename: (req, file, callback) => {
      randomBytes(16, (error, hash) => {
        if (error) {
          callback(error, file.originalname);
        }

        const originalname = callback(null, hash.toString('hex') + extname(file.originalname));
      });
    },
  }),

  limits: {
    fileSize: (100 * 1024) ^ 2, // 5MB
  },
  fileFilter: (req, file, callback) => {
    const formats = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf',".pdf","PDF"];

    if (formats.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Formato não suportado !❌'));
    }
  },
} as Options;
