import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {
    console.log('DATABASE CONNECTING....');
  }

  private DATABASE_URI = this.configService.get<string>('DATABASE_URI');

  private options: MongooseModuleOptions = {
    useFindAndModify: true,
  };

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.DATABASE_URI,
      ...this.options,
    };
  }
}
