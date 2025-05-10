import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type CourseDocument = Course & Document;

@Schema({ 
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
})
export class Course {
  @ApiProperty({
    description: 'ID del curso (generado automáticamente)',
    example: '507f1f77bcf86cd799439011'
  })
  id: string;

  @Prop({ required: true, unique: true })
  @ApiProperty({
    description: 'Código único del curso',
    example: 'CURSO-001'
  })
  codigo: string;

  @Prop({ required: true })
  @ApiProperty({
    description: 'Nombre del curso',
    example: 'Programación Web'
  })
  nombre: string;

  @Prop({ required: true })
  @ApiProperty({
    description: 'Descripción del curso',
    example: 'Curso introductorio a la programación web'
  })
  descripcion: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course); 