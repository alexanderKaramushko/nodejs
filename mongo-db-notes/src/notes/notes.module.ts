import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from './node.model';

@Module({
  imports: [
    // Регистрирует в текущем модуле конкретные модели (Mongoose-схемы),
    // которые потом можно инжектировать через @InjectModel() в сервисы
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
