import { CreateUserDTO } from './dto/create-user.dto';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './models/user.model';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  public async create(user: CreateUserDTO) {
    const isUserExisted = Boolean(await this.getUser(user.username));
    if (isUserExisted) {
      throw new ConflictException('User with same username is existed!');
    }

    const SALT_ROUNDS = 10;

    const salt = genSaltSync(SALT_ROUNDS);
    const hash = hashSync(user.password, salt);

    return await this.userModel.create({ ...user, password: hash });
  }

  public async getUser(username: string) {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      return null;
    }
    return user.toObject();
  }
}
