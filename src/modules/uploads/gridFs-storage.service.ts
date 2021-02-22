import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';

import * as GridFsStorage from 'multer-gridfs-storage';

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
  gridFsStorage: GridFsStorage;
  constructor(private readonly configService: ConfigService) {
    this.createStorage();
  }

  private createStorage() {
    const DATABASE_HOST = this.configService.get<string>('DATABASE_HOST');
    const DATABASE_PORT = this.configService.get<number>('DATABASE_PORT');
    const DATABASE_NAME = this.configService.get<string>('DATABASE_NAME');

    this.gridFsStorage = new GridFsStorage({
      url: `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`,
      file: (_, file) => {
        return new Promise((resolve, reject) => {
          const filename = file.originalname.trim();
          const fileInfo = {
            filename: filename,
          };
          resolve(fileInfo);
        });
      },
    });
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: this.gridFsStorage,
    };
  }
}
