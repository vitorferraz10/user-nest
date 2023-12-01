import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CpfUniqueValidator } from './validate/cpf.validator';

@Module({
  controllers: [UsersController],
  providers: [UsersService, CpfUniqueValidator],
})
export class UsersModule {}
