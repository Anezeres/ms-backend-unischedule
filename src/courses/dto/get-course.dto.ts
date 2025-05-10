import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class GetCourseDto {
  @ApiProperty({
    description: 'Código del curso a buscar',
    example: 'CURSO-001'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  codigo: string;
} 