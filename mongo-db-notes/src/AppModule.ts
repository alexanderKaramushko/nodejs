import { Module } from '@nestjs/common';
import { NotesModule } from './notes';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // Устанавливает подключение к MongoDB — задаёт глобальный (единственный) коннект к базе данных.
    // MONGODB_DATABASE = test
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    NotesModule,
  ],
})
export class AppModule {}
