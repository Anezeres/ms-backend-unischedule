import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateCourseDto {
  @ApiProperty({
    description: 'Nombre del curso',
    example: 'Programación Web',
    required: false
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  nombre?: string;

  @ApiProperty({
    description: 'Descripción del curso',
    example: 'Curso introductorio a la programación web',
    required: false
  })
  @IsOptional()
  @IsString()
  @MinLength(10)
  descripcion?: string;
} 