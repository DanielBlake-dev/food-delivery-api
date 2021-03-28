import { CreateDishDTO } from './dto/create-dishes.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Dishes, DishesDocument } from './models/dishes.model';

@Injectable()
export class DishesService {
  constructor(
    @InjectModel(Dishes.name)
    private readonly dishesModel: Model<DishesDocument>,
  ) {}

  public async create(dish: CreateDishDTO | CreateDishDTO[]) {
    return await this.dishesModel.create(dish);
  }

  public async getAll() {
    return await this.dishesModel
      .find()
      .populate('ingredients')
      .populate('category');
  }

  public async getByName(name: string) {
    return await this.dishesModel
      .findOne({ $text: { $search: name } })
      .populate('ingredients')
      .populate('category');
  }

  public async getById(id: string) {
    return await this.dishesModel
      .findById({ id })
      .populate('ingredients')
      .populate('category');
  }

  public async update(name: string, dish: CreateDishDTO) {
    return await this.dishesModel.updateOne({ $text: { $search: name } }, dish);
  }

  public async delete(name: string) {
    return await this.dishesModel.deleteOne({ $text: { $search: name } });
  }
}
