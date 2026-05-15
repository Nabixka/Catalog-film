import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { KnexModule } from 'src/db/knex.module';

@Module({
  imports: [KnexModule],
  controllers: [GenreController],
  providers: [GenreService],
})
export class GenreModule {}
