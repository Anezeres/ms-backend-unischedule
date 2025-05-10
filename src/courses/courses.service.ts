import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const createdCourse = new this.courseModel(createCourseDto);
    return createdCourse.save();
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  async findOneByCode(codigo: string): Promise<Course> {
    const course = await this.courseModel.findOne({ codigo }).exec();
    if (!course) {
      throw new NotFoundException(`Course with code ${codigo} not found`);
    }
    return course;
  }

  async updateByCode(codigo: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    // Primero verificamos si el curso existe
    const existingCourse = await this.courseModel.findOne({ codigo }).exec();
    if (!existingCourse) {
      throw new NotFoundException(`Course with code ${codigo} not found`);
    }

    // Creamos un objeto con solo los campos que se quieren actualizar
    const updateData = Object.keys(updateCourseDto).reduce((acc, key) => {
      if (updateCourseDto[key] !== undefined) {
        acc[key] = updateCourseDto[key];
      }
      return acc;
    }, {});

    // Actualizamos el curso
    const updatedCourse = await this.courseModel
      .findOneAndUpdate({ codigo }, { $set: updateData }, { new: true })
      .exec();

      if (!updatedCourse) {
        throw new NotFoundException(`Course with ID not found`);
      }

    return updatedCourse;
  }

  async patchByCode(codigo: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    return this.updateByCode(codigo, updateCourseDto);
  }

  async removeByCode(codigo: string): Promise<Course> {
    const deletedCourse = await this.courseModel.findOneAndDelete({ codigo }).lean().exec();
    if (!deletedCourse) {
      throw new NotFoundException(`Course with code ${codigo} not found`);
    }
    return deletedCourse as Course;
  }
} 