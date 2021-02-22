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

  private DATABASE_NAME = this.configService.get<string>('DATABASE_NAME');
  private DATABASE_HOST = this.configService.get<string>('DATABASE_HOST');
  private DATABASE_PORT = this.configService.get<number>('DATABASE_PORT');

  private options: MongooseModuleOptions = {
    useFindAndModify: true,
  };

  createMongooseOptions(): MongooseModuleOptions {
    console.log(this.DATABASE_NAME);

    return {
      uri: `mongodb://${this.DATABASE_HOST}:${this.DATABASE_PORT}/${this.DATABASE_NAME}`,
      ...this.options,
    };
  }
}
