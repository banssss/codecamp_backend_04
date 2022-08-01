import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthsResolver } from './auths.resolver';
import { AuthsService } from './auths.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh.strategy';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';

@Module({
  imports: [
    JwtModule.register({}), //
    TypeOrmModule.forFeature([
      User, //
    ]),
  ],
  providers: [
    JwtAccessStrategy,
    JwtRefreshStrategy, // 방금 만든 JwtRefreshStrategy 추가
    AuthsResolver, //
    AuthsService,
    UsersService,
  ],
})
export class AuthsModule {}
