import { Test, TestingModule } from '@nestjs/testing';
import { PemeranFilmService } from './pemeran_film.service';

describe('PemeranFilmService', () => {
  let service: PemeranFilmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PemeranFilmService],
    }).compile();

    service = module.get<PemeranFilmService>(PemeranFilmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
