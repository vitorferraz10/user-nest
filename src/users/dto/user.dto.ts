import { IsNotEmpty, IsNumber, Length } from 'class-validator';
import { CpfUnique } from '../validate/cpf.validator';

export class UsersDto {
  @Length(11)
  @CpfUnique({ message: 'Cpf already exists' })
  cpf: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  password: string;
}
