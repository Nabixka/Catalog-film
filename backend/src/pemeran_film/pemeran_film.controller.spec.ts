import { Test, TestingModule } from '@nestjs/testing';
import { PemeranFilmController } from './pemeran_film.controller';
import { PemeranFilmService } from './pemeran_film.service';

describe('PemeranFilmController', () => {
  let controller: PemeranFilmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PemeranFilmController],
      providers: [PemeranFilmService],
    }).compile();

    controller = module.get<PemeranFilmController>(PemeranFilmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
