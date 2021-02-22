import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { File } from './models/file.model';
import { MongoGridFS } from 'mongo-gridfs';
import { GridFSBucketReadStream } from 'mongodb';
import { Connection } from 'mongoose';

@Injectable()
export class UploadsService {
  private uploadsModel;
  constructor(
    @InjectConnection() private readonly connection: Connection, // @InjectModel(File.name) private readonly fileModel: MongoGridFS,
  ) {
    this.uploadsModel = new MongoGridFS(this.connection.db, 'fs');
  }

  public upload(file) {
    return {
      originalname: file.originalname,
      encoding: file.encoding,
      mimetype: file.mimetype,
      id: file.id,
      filename: file.filename,
      metadata: file.metadata,
      bucketName: file.bucketName,
      chunkSize: file.chunkSize,
      size: file.size,
      md5: file.md5,
      uploadDate: file.uploadDate,
      contentType: file.contentType,
    };
  }

  async readStream(id: string): Promise<GridFSBucketReadStream> {
    return await this.uploadsModel.readFileStream(id);
  }

  async findInfo(id: string) {
    const result = await this.uploadsModel.findById(id);
    console.log(result);
    return {
      filename: result.filename,
      length: result.length,
      chunkSize: result.chunkSize,
      md5: result.md5,
      contentType: result.contentType,
    };
  }

  async deleteFile(id: string): Promise<boolean> {
    return await this.uploadsModel.delete(id);
  }
}
