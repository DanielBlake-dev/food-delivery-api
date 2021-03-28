import { MongooseModule } from '@nestjs/mongoose';
import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Food, FoodSchema } from './models/food.model';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Food.name, schema: FoodSchema }]),
  ],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
