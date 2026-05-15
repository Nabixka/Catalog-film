import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FilmService } from './film.service';
import { ValidateFilmExist } from 'src/pipes/validate.film.exist';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { extname } from 'path';

@Controller('film')
export class FilmController {
  constructor(private filmService: FilmService) {}

  @Get()
  getAll(){
    return this.filmService.getAll()
  }

  @Post()
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: "./uploads/film",
      filename: (req, file, callback) => {
        const unique = Date.now() + "-" + Math.round(Math.random() * 1e9)
        const ext = extname(file.originalname)
        callback(null, `${file.fieldname}-${unique}${ext}`)
      }
    })
  }))
  create(@UploadedFile() file: Express.Multer.File, @Body() data: {title: string, description: string, sutradara: string, tanggal_rilis: string}){
    return this.filmService.create({...data, image: `/uploads/film/${file?.filename}` })
  } 
  

  @Get('/:id')
  getOne(@Param('id', ValidateFilmExist)  id: string){
    return this.filmService.getOne(Number(id))
  }

  @Patch('/:id')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/film',
      filename(req, file, callback) {
        const unique = Date.now() + "-" + Math.round(Math.random() * 1e9)
        const ext = extname(file.originalname)
        callback(null, `${file.fieldname}-${unique}${ext}`)
      },
    })
  }))
  update(@UploadedFile() file: Express.Multer.File, @Param('id', ValidateFilmExist) id: string, @Body() data: {title: string, description: string, sutradara: string, tanggal_rilis: string}){
    return this.filmService.update(Number(id), 
    {
      ...data, 
      image: file ? `/uploads/film/${file.filename}` : undefined
    }
  )
  }

  @Delete('/:id')
  delete(@Param('id', ValidateFilmExist) id: string){
    return this.filmService.delete(Number(id))
  }
}