import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';
import { User } from './entities/user.entity';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, // Repository 추가를 위한 모듈 추가
    ]),
  ],
  providers: [
    // JwtAccessStrategy,
    UsersResolver, //
    UsersService,
  ],
})
export class UsersModule {}
