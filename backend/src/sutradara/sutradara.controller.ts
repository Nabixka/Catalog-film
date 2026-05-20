import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SutradaraService } from './sutradara.service';
import { validateSutradaraExist } from 'src/pipes/va;idate.sutradara.exist';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('sutradara')
export class SutradaraController {
  constructor(private sutradaraService: SutradaraService) {}

  @Get()
  getAll(){
    return this.sutradaraService.getAll()
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/sutradara',
      filename(req, file, callback) {
        const unique = Date.now() + "-" + Math.round(Math.random() * 1e9)
        const ext = extname(file.originalname)
        callback(null, `${file.fieldname}-${unique}${ext}`)
      },
    })
  }))
  create(@Body() data: {name: string, description: string, tanggal_lahir: string, tempat_asal: string}, @UploadedFile() file: Express.Multer.File){
    if(!file || !data.name || !data.description || !data.tanggal_lahir || !data.tempat_asal) throw new BadRequestException("Isi Yang Benar")
    return this.sutradaraService.create({...data, image: `/uploads/sutradara/${file.filename}`})
  }

  @Get("/:id")
  getOne(@Param('id', validateSutradaraExist) id: string){
    return this.sutradaraService.getDetail(Number(id))
  }

  @Patch("/:id")
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/sutradara',
      filename(req, file, callback) {
        const unique = Date.now() + "-" + Math.round(Math.random() * 1e9)
        const ext = extname(file.originalname)
        callback(null, `${file.fieldname}-${unique}${ext}`)
      },
    })
  }))
  update(@Param("id", validateSutradaraExist) id: string, @Body() data: {name: string, description: string, tanggal_lahir: string, tempat_asal: string}, @UploadedFile() file: Express.Multer.File){
    return this.sutradaraService.update(Number(id), {...data, image: file ? `/uploads/sutradara/${file.filename}` : undefined})
  }

  @Delete("/:id")
  delete(@Param("id", validateSutradaraExist) id: string){
    return this.sutradaraService.delete(Number(id))
  }
}
