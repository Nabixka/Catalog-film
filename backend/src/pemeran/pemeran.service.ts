import { BadRequestException, Injectable } from '@nestjs/common';
import { KnexService } from 'src/db/knex.service';
import { pemeranFilmMapping } from 'src/mapping/pemeranFilmMapping';

@Injectable()
export class PemeranService {
  constructor(private knexService: KnexService) { }

  async getAll() {
    const get = await this.knexService.connection("pemeran").select("*")
    return {
      message: "success",
      data: get
    }
  }

  async getOne(id: number) {
    const get = await this.knexService.connection("pemeran").where('id', id).first()
    return {
      message: "success",
      data: get
    }
  }

  async getByFilm(id: number){
    const get = await this.knexService.connection("pemeran_film")
    .join("pemeran", "pemeran.id", "pemeran_film.pemeran_id")
    .join("film", "film.id", "pemeran_film.film_id")
    .select({
      film_title: "film.title",
      pemeran_id: "pemeran.id",
      pemeran_name: "pemeran.name",
      pemeran_image: "pemeran.image"
    })
    .where("film.id", id)

    return {
      message: "success",
      data: get.map(pemeranFilmMapping)
    }
  }

  async create(data: {name: string, image: string}) {
    if (!data.name) throw new BadRequestException("Isi Yang Benar")
    const [post] = await this.knexService.connection("pemeran").insert(data).returning("*")

    return {
      message: "success",
      data: post
    }
  }

  async update(id: number, data: {name: string, image?: string}) {
    if (!data.name) throw new BadRequestException("Isi yang Benar")
    const [update] = await this.knexService.connection("pemeran").update(data).where("id", id).returning("*")
    return {
      message: "success",
      data: update
    }
  }

  async delete(id: number){
    const del = await this.knexService.connection("pemeran").delete().where("id", id)
    return {
      message: "success",
    }
  }

}
