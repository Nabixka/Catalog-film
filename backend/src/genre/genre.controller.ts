import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GenreService } from './genre.service';
import { validateGenreExist } from 'src/pipes/validate.genre.exists';

@Controller('genre')
export class GenreController {
  constructor(private genreService: GenreService) {}

  @Get()
  getAll(){
    return this.genreService.getAll()
  }

  @Post()
  create(@Body() name: string){
    return this.genreService.create(name)
  }

  @Get('/:id')
  getOne(@Param('id', validateGenreExist) id: string){
    return this.genreService.getOne(Number(id))
  }

  @Delete('/:id')
  delete(@Param("id", validateGenreExist) id: string){
    return this.genreService.delete(Number(id))
  }
}
