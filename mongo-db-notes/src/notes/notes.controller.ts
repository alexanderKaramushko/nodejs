import { Body, Controller, Get, Post } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from './node.model';

@Controller()
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post('/create')
  create(@Body() noteDto: Note): Promise<Note> {
    return this.notesService.create(noteDto);
  }

  @Get('/notes')
  getNoted(): Promise<Note[]> {
    return this.notesService.findAll();
  }
}
