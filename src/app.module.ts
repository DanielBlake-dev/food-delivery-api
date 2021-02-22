import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MongooseConfigService } from './modules/database/mongodb.service';
import { FoodModule } from './modules/food/food.module';
import { DishesModule } from './modules/dishes/dishes.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { OredersModule } from './modules/orders/orders.module';
import { SocketsModule } from './modules/sockets/sockets.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
      inject: [ConfigService],
    }),
    FoodModule,
    DishesModule,
    CategoriesModule,
    OredersModule,
    SocketsModule,
    UploadsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
