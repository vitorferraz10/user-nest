import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UsersService } from '../users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class CpfUniqueValidator implements ValidatorConstraintInterface {
  constructor(private user: UsersService) {}

  async validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const cpfAlreadyExist = await this.user.verifyDuplicatedCpf(value);
    return !cpfAlreadyExist;
  }
}

export const CpfUnique = (optionsValidate: ValidationOptions) => {
  return (obj: Object, property: string) => {
    registerDecorator({
      target: obj.constructor,
      propertyName: property,
      options: optionsValidate,
      constraints: [],
      validator: CpfUniqueValidator,
    });
  };
};
