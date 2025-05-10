import {IsOptional, IsString, IsEmail} from 'class-validator';

export class UpdatePartialDocentesDto {
    @IsOptional()  
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;
    
    @IsOptional()
    @IsString()
    especialidad?: string;
  }