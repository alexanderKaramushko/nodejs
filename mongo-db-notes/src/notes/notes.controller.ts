import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
  getNotes(): Promise<Note[]> {
    return this.notesService.findAll();
  }

  @Get('/note/:id')
  getNote(@Param('id') id: string): Promise<Note | null> {
    return this.notesService.findById(id);
  }
}
