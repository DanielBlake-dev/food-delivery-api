import { CreateCategoryDTO } from './dto/create-category.dto';

import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/')
  public getAll() {
    return this.categoriesService.getAll();
  }

  @Get('/:id')
  public getById(@Query('id') id: string) {
    return this.categoriesService.getById(id);
  }

  @Get('/:name')
  public getByName(@Query('name') name: string) {
    return this.categoriesService.getByName(name);
  }

  @Post('/create')
  public create(@Body() category: CreateCategoryDTO) {
    return this.categoriesService.create(category);
  }

  @Put('/update')
  public update(
    @Query('name') name: string,
    @Body() category: CreateCategoryDTO,
  ) {
    return this.categoriesService.update(name, category);
  }

  @Delete('/delete')
  public delete(@Query('name') name: string) {
    return this.categoriesService.delete(name);
  }
}
