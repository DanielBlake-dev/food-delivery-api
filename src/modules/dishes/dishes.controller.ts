import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UploadedFile,
} from '@nestjs/common';

import { UploadsService } from './../uploads/uploads.service';
import { CreateDishDTO } from './dto/create-dishes.dto';
import { DishesService } from './dishes.service';

@Controller('dishes')
export class DishesController {
  constructor(
    private readonly dishesService: DishesService,
    private readonly uploadService: UploadsService,
  ) {}

  @Get('/')
  public getAll() {
    return this.dishesService.getAll();
  }

  @Get('/:id')
  public getById(@Query('id') id: string) {
    return this.dishesService.getById(id);
  }

  @Get('/:name')
  public getByName(@Query('name') name: string) {
    return this.dishesService.getByName(name);
  }

  @Post('/create')
  public create(@Body() dish: CreateDishDTO) {
    return this.dishesService.create(dish);
  }

  @Put('/update')
  public update(@Query('name') name: string, @Body() dish: CreateDishDTO) {
    return this.dishesService.update(name, dish);
  }

  @Delete('/delete')
  public delete(@Query('name') name: string) {
    return this.dishesService.delete(name);
  }
}
