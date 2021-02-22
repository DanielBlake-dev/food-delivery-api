import { UploadsService } from './../uploads/uploads.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { Dishes, DishesSchema } from './models/dishes.model';
import { DishesService } from './dishes.service';
import { DishesController } from './dishes.controller';
import { UploadsModule } from '../uploads/uploads.module';

@Module({
  imports: [
    UploadsModule,
    MongooseModule.forFeature([{ name: Dishes.name, schema: DishesSchema }]),
  ],
  providers: [DishesService, UploadsService],
  controllers: [DishesController],
})
export class DishesModule {}
