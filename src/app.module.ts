import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { DocentesModule } from './docentes/docentes.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from './database/mongo.module';
import { MongooseEventsService } from './database/mongodb.service';

@Module({
  imports: [
    MongoModule,
    UsersModule,
    DocentesModule,
    CoursesModule
  ],
  controllers: [AppController],
  providers: [AppService,MongooseEventsService],
})
export class AppModule {}
