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
    const film = await this.knexService.connection("pemeran_film")
    .join("film", "film.id", "pemeran_film.film_id")
    .select({
      film_id: "film.id",
      film_title: "film.title",
      film_image: "film.image",
      film_description: "film.description"
    })
    .where("pemeran_id", id)
    return {
      message: "success",
      data: {
        ...get,
        film
      }
    }
  }

  async create(data: {name: string, image: string, description: string, tanggal_lahir: string, tempat_asal: string}) {
    const [post] = await this.knexService.connection("pemeran").insert(data).returning("*")

    return {
      message: "success",
      data: post
    }
  }

  async update(id: number, data: {name: string, image?: string, description: string, tanggal_lahir: string, tempat_asal: string}) {
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
