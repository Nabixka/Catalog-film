import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors, UploadedFile, BadRequestException, Query } from '@nestjs/common';
import { PemeranService } from './pemeran.service';
import { ValidatePemeranExist } from 'src/pipes/validate.pemeran.exist';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('pemeran')
export class PemeranController {
  constructor(private pemeranService: PemeranService) {}

  @Get()
  getAll(){
    return this.pemeranService.getAll()
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/pemeran',
      filename(req, file, callback) {
        const unique = Date.now() + "-" + Math.round(Math.random() * 1e9)
        const ext = extname(file.originalname)
        callback(null, `${file.fieldname}-${unique}${ext}`)
      },
    })
  }))
  create(@Body() data: {name: string, description: string, tanggal_lahir: string, tempat_asal: string}, @UploadedFile() file: Express.Multer.File){
    if(!file || !data.name || !data.description || !data.tanggal_lahir || !data.tempat_asal) throw new BadRequestException("Isi Yang Benar")
    return this.pemeranService.create({...data, image: `/uploads/pemeran/${file?.filename}`})
  }

  @Get("film/:id")
  getByFilm(@Param("id") id: string){
    return this.pemeranService.getByFilm(Number(id))
  }

  @Get("/:id")
  getOne(@Param('id', ValidatePemeranExist) id: string){
    return this.pemeranService.getOne(Number(id))
  }

  @Patch('/:id')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/pemeran',
      filename(req, file, callback) {
        const unique = Date.now() + "-" + Math.round(Math.random() * 1e9)
        const ext = extname(file.originalname)
        callback(null, `${file.fieldname}-${unique}${ext}`)
      },
    })
  }))
  update(@Param('id', ValidatePemeranExist) id: string, @Body() data: {name: string, description: string, tanggal_lahir: string, tempat_asal: string}, @UploadedFile() file: Express.Multer.File){
    return this.pemeranService.update(Number(id), 
    {
      ...data, 
      image: file ? `/uploads/pemeran/${file.filename}` : undefined
    })
  }

  @Delete("/:id")
  delete(@Param('id', ValidatePemeranExist) id: string){
    return this.pemeranService.delete(Number(id))
  }
}
