import { Dishes, DishesDocument } from './../dishes/models/dishes.model';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { Category, CategoryDocument } from './models/category.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
    @InjectModel(Dishes.name)
    private readonly dishModel: Model<DishesDocument>,
  ) {}

  public async create(category: CreateCategoryDTO) {
    const created = await this.categoryModel.create(category);
    const { dishes, name } = category;

    dishes.forEach((dish) => {
      this.dishModel.findByIdAndUpdate(dish, { $set: { category: name } });
    });

    return created;
  }

  public async getAll() {
    return await this.categoryModel.find().populate('dishes');
  }

  public async getByName(name: string) {
    return await this.categoryModel
      .findOne({ $text: { $search: name } })
      .populate('dishes');
  }

  public async getById(id: string) {
    return await this.categoryModel.findById({ id }).populate('dishes');
  }

  public async update(name: string, category: CreateCategoryDTO) {
    return await this.categoryModel.updateOne(
      { $text: { $search: name } },
      category,
    );
  }

  public async delete(name: string) {
    return await this.categoryModel.deleteOne({ $text: { $search: name } });
  }
}
