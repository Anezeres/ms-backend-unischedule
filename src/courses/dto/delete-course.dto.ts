import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class DeleteCourseDto {
  @ApiProperty({
    description: 'Código del curso a eliminar',
    example: 'CURSO-001'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  codigo: string;
} 