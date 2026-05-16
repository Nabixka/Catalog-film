import { Module } from '@nestjs/common';
import { PemeranFilmService } from './pemeran_film.service';
import { PemeranFilmController } from './pemeran_film.controller';
import { KnexModule } from 'src/db/knex.module';

@Module({
  imports: [KnexModule],
  controllers: [PemeranFilmController],
  providers: [PemeranFilmService],
})
export class PemeranFilmModule {}
