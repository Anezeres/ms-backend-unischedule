import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateDocentesDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  especialidad: string;
}
