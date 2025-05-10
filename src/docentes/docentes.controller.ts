import { Controller, Get, Post, Put, Patch, Delete, Body, Param,} from '@nestjs/common';
import { DocentesService } from './docentes.service';
import { Docente } from './schemas/docentes.schema';
import { CreateDocentesDto } from './dto/create-docentes.dto';
import { UpdateDocentesDto } from './dto/update-docentes.dto';
import { UpdatePartialDocentesDto } from './dto/update-partial-docentes.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody,} from '@nestjs/swagger';

@ApiTags('docentes')
@Controller('docentes')
export class DocentesController {
  constructor(private readonly docentesService: DocentesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los docentes' })
  @ApiResponse({
    status: 200,
    description: 'Lista de docentes obtenida correctamente',
  })
  findAll(): Promise<Docente[]> {
    return this.docentesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un docente por ID' })
  @ApiParam({ name: 'id', description: 'ID del docente' })
  @ApiResponse({ status: 200, description: 'Docente encontrado' })
  @ApiResponse({ status: 404, description: 'Docente no encontrado' })
  findOne(@Param('id') id: string): Promise<Docente> {
    return this.docentesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo docente' })
  @ApiBody({ type: CreateDocentesDto })
  @ApiResponse({ status: 201, description: 'Docente creado correctamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createDocenteDto: CreateDocentesDto): Promise<Docente> {
    return this.docentesService.create(createDocenteDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar completamente un docente por ID' })
  @ApiParam({ name: 'id', description: 'ID del docente' })
  @ApiBody({ type: UpdateDocentesDto }) // Usa UpdateDocentesDto para PUT
  @ApiResponse({
    status: 200,
    description: 'Docente actualizado correctamente',
  })
  @ApiResponse({ status: 404, description: 'Docente no encontrado' })
  update(
    @Param('id') id: string,
    @Body() updateDocenteDto: UpdateDocentesDto, // Usa UpdateDocentesDto
  ): Promise<Docente> {
    return this.docentesService.update(id, updateDocenteDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar parcialmente un docente por ID' })
  @ApiParam({ name: 'id', description: 'ID del docente' })
  @ApiBody({ type: UpdatePartialDocentesDto }) // Usa UpdatePartialDocentesDto para PATCH
  @ApiResponse({ status: 200, description: 'Docente actualizado parcialmente' })
  @ApiResponse({ status: 404, description: 'Docente no encontrado' })
  partialUpdate(
    @Param('id') id: string,
    @Body() updateDocenteDto: UpdatePartialDocentesDto, // Usa UpdatePartialDocentesDto
  ): Promise<Docente> {
    return this.docentesService.update(id, updateDocenteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un docente por ID' })
  @ApiParam({ name: 'id', description: 'ID del docente' })
  @ApiResponse({ status: 200, description: 'Docente eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Docente no encontrado' })
  delete(@Param('id') id: string): Promise<void> {
    return this.docentesService.delete(id);
  }
}
