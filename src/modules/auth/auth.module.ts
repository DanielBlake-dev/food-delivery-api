import { SessionSerializer } from './serializer/session.serializer';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from './../users/users.module';

import { AuthLocalStrategy } from './strategies/auth-local.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, AuthLocalStrategy, SessionSerializer],
})
export class AuthModule {}
