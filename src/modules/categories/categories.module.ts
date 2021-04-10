import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { Dishes, DishesSchema } from '../dishes/models/dishes.model';

import { Category, CategorySchema } from './models/category.model';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: Dishes.name, schema: DishesSchema },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
