import { Module } from '@nestjs/common';
import { PemeranFilmService } from './pemeran_film.service';
import { PemeranFilmController } from './pemeran_film.controller';

@Module({
  controllers: [PemeranFilmController],
  providers: [PemeranFilmService],
})
export class PemeranFilmModule {}
