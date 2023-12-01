import {
  Body,
  Controller,
  Delete,
  Get, Param, Post, Query
} from '@nestjs/common';
import { UsersService } from './users.service';
import { v4 as uuid } from 'uuid';
import { UsersDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @Get()
  async findAll() {
    return this.users.findAllUser();
  }

  @Get(':cpf')
  async findUnique(@Param('cpf') cpf: string) {
    return this.users.findUnique(cpf);
  }

  @Post()
  async create(@Body() dataUser: UsersDto) {
    this.users.createUser({ ...dataUser, id: uuid() });
    return 'User created';
  }

  @Delete(':cpf')
  async remove(@Param('cpf') cpf: string) {
    this.users.removeUser(cpf);
    return 'User removed';
  }
}
