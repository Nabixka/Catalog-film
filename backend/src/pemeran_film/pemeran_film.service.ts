import { Injectable } from '@nestjs/common';
import { KnexService } from 'src/db/knex.service';
import { pemeranFilmMapping } from 'src/mapping/pemeranFilmMapping';

@Injectable()
export class PemeranFilmService {
    constructor(private knexService: KnexService) {}

    async getAll(){
        const get = await this.knexService.connection("pemeran_film")
        .join('pemeran', 'pemeran.id', 'pemeran_film.pemeran_id')
        .join('film', 'film.id', 'pemeran_film.film_id')
        .select({
            id: "pemeran_film.id",
            pemeran_id: "pemeran.id",
            pemeran_name: "pemeran.name",
            film_id: "film.id",
            film_title: "film.title"
        })

        return {
            message: "success",
            data: get.map(pemeranFilmMapping)
        }
    }
}
