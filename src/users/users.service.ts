import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuid } from 'uuid';
import { UsersDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private users: UserEntity[] = [];

  findAllUser() {
    if (this.users.length > 0) {
      return this.users;
    }
    return 'Empty list';
  }

  findUnique(cpf: string) {
    const hasUser = this.users.find((res) => res.cpf === cpf);
    if (!hasUser) throw new Error('User not found');

    return hasUser;
  }

  createUser(dataUser: UsersDto) {
    this.users.push({ ...dataUser, id: uuid() });
  }

  async verifyDuplicatedCpf(cpf: string) {
    const isCpfAlreadyExist = this.users.find((user) => user.cpf === cpf);

    return isCpfAlreadyExist !== undefined;
  }

  async editUser(cpf: string, updateUser: Partial<UpdateUserDto>) {
    const user = this.findUnique(cpf);

    user.name = updateUser.name || user.name;
    user.password = updateUser.password || user.password;

    return { message: 'user updated', user };
  }

  async removeUser(cpf: string) {
    if (this.users.length > 0) {
      const newListWithRemoveElement = this.users.filter(
        (user) => user.cpf !== cpf,
      );

      return (this.users = newListWithRemoveElement);
    } else {
      return 'Empty list';
    }
  }
}
