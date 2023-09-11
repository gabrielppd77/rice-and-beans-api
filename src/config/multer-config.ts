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

const s3Config = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

const storageTypes = {
  dev: diskStorage({
    destination: './tmp/uploads',
    filename: (req, file, cb) => {
      const fileName = generateFileName(file.originalname);
      cb(null, fileName);
    },
  }),
  prod: multerS3({
    s3: s3Config,
    bucket: process.env.S3_NAME_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      const fileName = generateFileName(file.originalname);
      cb(null, 'product/' + fileName);
    },
  }),
};

// tenho que conseguir excluir a foto da aws, ao excluir um product
// preciso etiqueta o nome da foto talvez (verificar se vai precisar msmo, pois já esta separado por pasta na aws)
// melhorar a passagem de parametro de entidade
export class MulterConfig {
  static configImageUpload(): MulterOptions {
    return {
      // storage: storageTypes[process.env.NODE_ENV],
      storage: storageTypes['prod'],
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
