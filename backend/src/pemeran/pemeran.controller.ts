import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PemeranService } from './pemeran.service';
import { ValidatePemeranExist } from 'src/pipes/validate.pemeran.exist';

@Controller('pemeran')
export class PemeranController {
  constructor(private pemeranService: PemeranService) {}

  @Get()
  getAll(){
    return this.pemeranService.getAll()
  }

  @Post()
  create(@Body() data: {name: string}){
    return this.pemeranService.create(data)
  }

  @Get("/:id")
  getOne(@Param('id', ValidatePemeranExist) id: string){
    return this.pemeranService.getOne(Number(id))
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() data: {name: string}){
    return this.pemeranService.update(Number(id), data)
  }

  @Delete("/:id")
  delete(@Param('id', ValidatePemeranExist) id: string){
    return this.pemeranService.delete(Number(id))
  }
}
