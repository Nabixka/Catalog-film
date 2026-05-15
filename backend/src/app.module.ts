import { Module } from '@nestjs/common';
import { FilmModule } from './film/film.module';
import { PemeranModule } from './pemeran/pemeran.module';
import { GenreModule } from './genre/genre.module';
import { PemeranFilmModule } from './pemeran_film/pemeran_film.module';

@Module({
  imports: [FilmModule, PemeranModule, GenreModule, PemeranFilmModule]
})
export class AppModule {}
