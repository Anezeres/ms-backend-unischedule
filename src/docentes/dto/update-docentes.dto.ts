import {IsNotEmpty, IsString, IsEmail} from 'class-validator';

export class UpdateDocentesDto {
    @IsNotEmpty()
    @IsString()
    name?: string;
  
    @IsNotEmpty()
    @IsEmail()
    email?: string;
  
    @IsNotEmpty()
    @IsString()
    especialidad?: string;
  }