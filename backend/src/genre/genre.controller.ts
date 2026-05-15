import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GenreService } from './genre.service';

@Controller('genre')
export class GenreController {
  constructor(private genreService: GenreService) {}

  @Get()
  getAll(){
    return this.genreService.getAll()
  }

  @Post()
  create(@Body() data:  {name: string}){
    return this.genreService.create(data)
  }

  @Get('/:id')
  getOne(@Param('id') id: string){
    return this.genreService.getOne(Number(id))
  }

  @Delete('/:id')
  delete(@Param("id") id: string){
    return this.genreService.delete(Number(id))
  }
}
