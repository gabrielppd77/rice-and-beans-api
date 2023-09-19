import { Injectable } from '@nestjs/common';

import * as AWS from 'aws-sdk';

import * as fs from 'fs';
import { resolve } from 'path';
import { path } from 'app-root-path';

process.env.AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE = '1';

@Injectable()
export class FileService {
  private readonly s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      region: process.env.S3_REGION,
    });
  }

  async deleteObject(key: string): Promise<void> {
    if (process.env.STORAGE_TYPE === 's3') {
      const params = {
        Bucket: process.env.S3_NAME_BUCKET,
        Key: key,
      };
      await this.s3.deleteObject(params).promise();
    } else {
      await fs.unlinkSync(resolve(path, key));
    }
  }
}
