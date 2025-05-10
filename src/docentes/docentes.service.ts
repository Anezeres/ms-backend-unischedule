import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Docente } from './schemas/docentes.schema';
import { CreateDocentesDto } from './dto/create-docentes.dto';
import { UpdateDocentesDto } from './dto/update-docentes.dto';
import { UpdatePartialDocentesDto } from './dto/update-partial-docentes.dto';

@Injectable()
export class DocentesService {
  constructor(
    @InjectModel(Docente.name) private docenteModel: Model<Docente>,
  ) {}

  async findAll(): Promise<Docente[]> {
    return this.docenteModel.find().exec();
  }

  async findOne(id: string): Promise<Docente> {
    if (!isValidObjectId(id)) {
      throw new NotFoundException('ID inválido');
    }

    const docente = await this.docenteModel.findById(id).exec();
    if (!docente) throw new NotFoundException('Docente no encontrado');
    return docente;
  }

  async create(createDocenteDto: CreateDocentesDto): Promise<Docente> {
    const docente = new this.docenteModel(createDocenteDto);
    return docente.save();
  }

  async update(
    id: string,
    updateDocenteDto: UpdateDocentesDto | UpdatePartialDocentesDto, // Acepta ambos DTOs
  ): Promise<Docente> {
    const docente = await this.docenteModel.findByIdAndUpdate(
      id,
      updateDocenteDto,
      { new: true }, // Devuelve el documento actualizado
    );
    if (!docente) throw new NotFoundException('Docente no encontrado');
    return docente;
  }

  async delete(id: string): Promise<void> {
    const result = await this.docenteModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Docente no encontrado');
  }
}
