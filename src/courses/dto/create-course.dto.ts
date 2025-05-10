import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    description: 'Código único del curso',
    example: 'CURSO-001'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  codigo: string;

  @ApiProperty({
    description: 'Nombre del curso',
    example: 'Programación Web'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  nombre: string;

  @ApiProperty({
    description: 'Descripción del curso',
    example: 'Curso introductorio a la programación web'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  descripcion: string;
} 