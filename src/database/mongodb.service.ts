// src/database/mongoose-events.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class MongooseEventsService implements OnModuleInit {
  onModuleInit() {
    mongoose.connection.on('connected', () => {
      console.log('✅ MongoDB Connected via Mongoose!');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB Connection Error via Mongoose:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB Disconnected!');
    });
  }
}
