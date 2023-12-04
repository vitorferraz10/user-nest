import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { UsersDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
    this.users.createUser(dataUser);
    return 'User created';
  }

  @Put(':cpf')
  async update(
    @Param('cpf') cpf: string,
    @Body() updateUser: Partial<UpdateUserDto>,
  ) {
    return this.users.editUser(cpf, updateUser);
  }

  @Delete(':cpf')
  async remove(@Param('cpf') cpf: string) {
    this.users.removeUser(cpf);
    return 'User removed';
  }
}
