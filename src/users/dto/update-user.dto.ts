import { IsNotEmpty, IsNumber, IsOptional, Length } from 'class-validator';
import { CpfUnique } from '../validate/cpf.validator';

export class UpdateUserDto {
  @Length(11)
  @CpfUnique({ message: 'Cpf already exists' })
  @IsOptional()
  cpf: string;
  @IsOptional()
  name: string;
  @IsOptional()
  password: string;
}
