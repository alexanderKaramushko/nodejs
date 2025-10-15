import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note, NoteDocument } from './node.model';
import { Model } from 'mongoose';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  create(payload: Note): Promise<Note> {
    const note = new this.noteModel(payload);

    return note.save();
  }

  findAll(): Promise<Note[]> {
    return this.noteModel.find().exec();
  }

  findById(id: string): Promise<Note | null> {
    return this.noteModel.findById(id).exec();
  }
}
