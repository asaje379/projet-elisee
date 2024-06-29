import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Email non valide' })
  email: string;

  @ApiProperty()
  @IsStrongPassword({}, { message: "Le mot de passe n'est pas assez fort" })
  password: string;
}
