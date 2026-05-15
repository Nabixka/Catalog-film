import { Module } from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmController } from './film.controller';
import { KnexModule } from 'src/db/knex.module';

@Module({
  imports: [KnexModule],
  controllers: [FilmController],
  providers: [FilmService],
})
export class FilmModule {}
