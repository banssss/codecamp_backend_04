import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthsResolver } from './auths.resolver';
import { AuthsService } from './auths.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh.strategy';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';
import { JwtGoogleStrategy } from 'src/commons/auth/jwt-social-google.strategy';
import { AuthsController } from './auths.controller';

@Module({
  imports: [
    JwtModule.register({}), //
    TypeOrmModule.forFeature([
      User, //
    ]),
  ],
  providers: [
    JwtAccessStrategy, // Jwt 관련 auth 에 몰아주기 위함
    JwtRefreshStrategy, // 방금 만든 JwtRefreshStrategy 추가
    JwtGoogleStrategy, // Jwt-google 등록
    AuthsResolver, //
    AuthsService,
    UsersService,
  ],
  controllers: [
    AuthsController, // Controller 등록
  ],
})
export class AuthsModule {}
