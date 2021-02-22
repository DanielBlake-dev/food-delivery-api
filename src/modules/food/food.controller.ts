import { CreateFoodDTO } from './dto/create-food.dto';
import { FoodService } from './food.service';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get('/')
  public getAll() {
    return this.foodService.getAll();
  }

  @Get('/search')
  public search(@Query('query') query: string) {
    return this.foodService.searchFood(query);
  }

  @Post('/add')
  public add(@Body() food: CreateFoodDTO) {
    return this.foodService.addFood(Array.isArray(food) ? food : [food]);
  }
}
