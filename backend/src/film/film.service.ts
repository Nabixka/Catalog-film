import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { KnexService } from 'src/db/knex.service';
import { filmMapping, filmMappingByPemain } from 'src/mapping/filmMapping';

@Injectable()
export class FilmService {
  constructor(private knexService: KnexService) { }

  // Get
  async getAll() {
    const data = await this.knexService.connection("film").select("*")

    return {
      message: "success",
      data: data.map(filmMapping)
    }
  }

  async getFilmDetail(id: number) {
    const film = await this.knexService.connection("film").where("id", id).first()

    const sutradara = await this.knexService.connection("sutradara_film")
    .join("sutradara", "sutradara.id", "sutradara_id")
    .select({
      id: "sutradara.id",
      name: "sutradara.name",
      image: "sutradara.image"
    })
    .where("film_id", id)

    const genre = await this.knexService.connection("genre_film")
    .join("genre", "genre.id", "genre_id")
    .select({
      id: "genre.id",
      name: "genre.name"
    })
    .where("film_id", id)

    const pemeran = await this.knexService.connection("pemeran_film")
    .join("pemeran", "pemeran.id", "pemeran_id")
    .select({
      id: "pemeran.id",
      name: "pemeran.name",
      image: "pemeran.image"
    })
    .where("film_id", id)

    return {
      message: "success",
      data: {
        ...film,
        sutradara,
        genre,
        pemeran
      }
    }
  }

  async getByPemain(name: string) {
    const data = await this.knexService.connection("pemeran_film")
      .join('pemeran', 'pemeran.id', 'pemeran_film.pemeran_id')
      .join('film', 'film.id', 'pemeran_film.film_id')
      .select({
        id: "pemeran_film.id",
        film_id: "film.id",
        title: "film.title",
        image: "film.image",
        description: "film.description",
        tanggal_rilis: "film.tanggal_rilis"
      })
      .whereILike("pemeran.name", `%${name}%`)
    if (data.length === 0) throw new NotFoundException("Tidak Ada Film Yang Dibintangi aktor tersebut")

    return {
      message: "success",
      data: data.map(filmMappingByPemain)
    }
  }

  // Post
  async create(data: { title: string, image: string, description: string, sutradara: string, tanggal_rilis: string }) {
    if (!data.title || !data.image || !data.description || !data.sutradara || !data.tanggal_rilis) {
      throw new BadRequestException("Isi Yang Benar")
    }
    else {
      const [post] = await this.knexService.connection("film").insert(data).returning("*")
      return {
        message: "success",
        data: filmMapping(post)
      }
    }
  }

  // Patch
  async update(id: number, data: { title: string, image?: string, description: string, sutradara: string, tanggal_rilis: string }) {

    Object.keys(data).forEach((key) => {
      if (data[key] === undefined) {
        delete data[key]
      }
    })

    const [update] = await this.knexService.connection("film").where('id', id).update(data).returning("*")
    return {
      message: "Berhasil Update",
      data: filmMapping(update)
    }
  }

  // Delete
  async delete(id: Number) {
    const del = await this.knexService.connection("film").delete().where('id', id)

    return {
      message: "Berhasil Menghapus",
    }
  }

}
