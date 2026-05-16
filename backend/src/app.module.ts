import { Module } from '@nestjs/common';
import { FilmModule } from './film/film.module';
import { PemeranModule } from './pemeran/pemeran.module';
import { GenreModule } from './genre/genre.module';
import { PemeranFilmModule } from './pemeran_film/pemeran_film.module';
import { SutradaraModule } from './sutradara/sutradara.module';

@Module({
  imports: [FilmModule, PemeranModule, GenreModule, PemeranFilmModule, SutradaraModule]
})
export class AppModule {}
