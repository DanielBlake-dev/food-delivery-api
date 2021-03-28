import { CreateFoodDTO } from './dto/create-food.dto';
import { ConfigService } from '@nestjs/config';
import { Injectable, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Food, FoodDocument } from './models/food.model';
import { FoodResponse } from './interfaces/food-response.interface';

@Injectable()
export class FoodService {
  constructor(
    @InjectModel(Food.name) private readonly foodModel: Model<FoodDocument>,
  ) {}

  public async getAll() {
    return await this.foodModel.find({});
  }

  public async searchFood(
    query: string,
    page: number = 1,
    pageSize: number = 50,
  ) {
    return await this.foodModel.find({ $text: { $search: query } });
  }

  public async addFood(food: CreateFoodDTO[]) {
    return await this.foodModel.create(food);
  }
}
