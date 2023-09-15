import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import * as multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

function generateFileName(originalname: string) {
  const fileName =
    path.parse(originalname).name.replace(/\s/g, '') + '-' + uuidv4();

  const extension = path.parse(originalname).ext;
  return `${fileName}${extension}`;
}

const basePublicPath = 'public/tmp/uploads/images';

const s3Config = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

interface MulterFile extends Express.Multer.File {
  location: string;
  key: string;
}

type PathsImage = 'product';

function configStorage(path: PathsImage) {
  return {
    local: diskStorage({
      destination: './' + basePublicPath + '/' + path,
      filename: (req, file: MulterFile, cb) => {
        const fileName = generateFileName(file.originalname);
        file.location = `${process.env.APP_URL}/${basePublicPath}/${path}/${fileName}`;
        file.key = `${basePublicPath}/${path}/${fileName}`;
        cb(null, fileName);
      },
    }),
    s3: multerS3({
      s3: s3Config,
      bucket: process.env.S3_NAME_BUCKET,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: 'public-read',
      key: (req, file, cb) => {
        const fileName = generateFileName(file.originalname);
        cb(null, 'images/' + path + '/' + fileName);
      },
    }),
  };
}

export class MulterConfig {
  static configImageUpload(path: PathsImage): MulterOptions {
    return {
      storage: configStorage(path)[process.env.STORAGE_TYPE],
      limits: {
        fileSize: 2 * 1024 * 1024, //2mb,
      },
      fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];

        if (allowedMimes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Invalid file type.'), false);
        }
      },
    };
  }
}
