import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Docente, DocentesSchema } from './schemas/docentes.schema';
import { DocentesController } from './docentes.controller';
import { DocentesService } from './docentes.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Docente.name, schema: DocentesSchema }]),
  ],
  controllers: [DocentesController],
  providers: [DocentesService],
  exports: [DocentesService],
})
export class DocentesModule {}
