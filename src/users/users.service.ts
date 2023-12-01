import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

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
    if (!hasUser) return 'User not exists';
    return hasUser;
  }

  createUser(dataUser: UserEntity) {
    this.users.push(dataUser);
  }

  async verifyDuplicatedCpf(cpf: string) {
    const isCpfAlreadyExist = this.users.find((user) => user.cpf === cpf);

    return isCpfAlreadyExist !== undefined;
  }

  // async editPassword(cpf: number, newPassword: string) {
  //   const getUserToCpf = this.users.filter((user) => user.cpf === cpf);
  //   const newPasswordToUser = { ...getUserToCpf, password: newPassword };

  //   this.createUser(newPasswordToUser)
  // }

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
