import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService, ConfigModule } from '@nestjs/config';

import { FileSchema, File } from './models/file.model';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { GridFsMulterConfigService } from './gridFs-storage.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useClass: GridFsMulterConfigService,
      inject: [ConfigService],
    }),
  ],
  controllers: [UploadsController],
  providers: [UploadsService],
})
export class UploadsModule {}
