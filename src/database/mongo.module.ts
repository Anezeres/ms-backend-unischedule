// src/database/mongo.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseEventsService } from './mongodb.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI', 'mongodb://localhost:27017/docentes'),
      }),
    }),
  ],
  providers: [MongooseEventsService], // 👈 importante
  exports: [MongooseModule, MongooseEventsService],
})
export class MongoModule {}
