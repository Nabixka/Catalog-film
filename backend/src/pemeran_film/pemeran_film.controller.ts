import { Controller } from '@nestjs/common';
import { PemeranFilmService } from './pemeran_film.service';

@Controller('pemeran-film')
export class PemeranFilmController {
  constructor(private readonly pemeranFilmService: PemeranFilmService) {}
}
