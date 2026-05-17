import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { KnexService } from 'src/db/knex.service';
import { filmMapping, filmMappingByPemain } from 'src/mapping/filmMapping';

@Injectable()
export class FilmService {
  constructor(private knexService: KnexService) { }

  // Get
  async getAll() {
    const films = await this.knexService.connection("film")
    const result = await Promise.all(
      films.map(async (film) => {
        const pemeran = await this.knexService.connection("pemeran_film")
          .join("pemeran", "pemeran.id", "pemeran_id")
          .select({
            id: "pemeran.id",
            name: "pemeran.name",
            image: "pemeran.image"
          })
          .where("film_id", film.id)

        const genre = await this.knexService.connection("genre_film")
          .join("genre", "genre.id", "genre_id")
          .select({
            id: "genre.id",
            name: "genre.name"
          })
          .where("film_id", film.id)

        const sutradara = await this.knexService.connection("sutradara_film")
          .join("sutradara", "sutradara.id", "sutradara_id")
          .select({
            id: "sutradara.id",
            name: "sutradara.name",
            image: "sutradara.image"
          })
          .where("film_id", film.id)

        return {
          ...film,
          sutradara,
          genre,
          pemeran
        }
      })
    )

    return {
      message: "success",
      data: result
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
  async create(data: { title: string, image: string, description: string, tanggal_rilis: string, sutradara_ids: number[], pemeran_ids: number[], genre_ids: number[] }) {

    if (!data.title || !data.image || !data.description || !data.tanggal_rilis || !data.genre_ids || !data.pemeran_ids || !data.sutradara_ids) {
      throw new BadRequestException("Isi Yang Benar")
    }
    const [post] = await this.knexService.connection("film").insert({
      title: data.title,
      image: data.image,
      description: data.description,
      tanggal_rilis: data.tanggal_rilis
    }).returning("*")

    const {sutradara_ids, pemeran_ids, genre_ids} = data

    const isSutradaraArray = Array.isArray(sutradara_ids) ? sutradara_ids : [sutradara_ids]
    const isPemeranArray = Array.isArray(pemeran_ids) ? pemeran_ids : [pemeran_ids]
    const isGenreArray = Array.isArray(genre_ids) ? genre_ids : [genre_ids]

    const pemeranFilm = isPemeranArray.map(pemeran_id => ({
      film_id: post.id,
      pemeran_id
    }))

    const sutradaraFilm = isSutradaraArray.map(sutradara_id => ({
      film_id: post.id,
      sutradara_id
    }))

    const genreFilm = isGenreArray.map(genre_id => ({
      film_id: post.id,
      genre_id
    }))

    const insertGenre = await this.knexService.connection("genre_film").insert(genreFilm)
    const insertSutradara = await this.knexService.connection("sutradara_film").insert(sutradaraFilm)
    const insertPemeran = await this.knexService.connection("pemeran_film").insert(pemeranFilm)

    const sutradara = await this.knexService.connection("sutradara_film")
      .join("sutradara", "sutradara.id", "sutradara_id")
      .select({
        id: "sutradara.id",
        name: "sutradara.name",
        image: "sutradara.image"
      })
      .where("film_id", post.id)

    const genre = await this.knexService.connection("genre_film")
      .join("genre", "genre.id", "genre_id")
      .select({
        id: "genre.id",
        name: "genre.name"
      })
      .where("film_id", post.id)

    const pemeran = await this.knexService.connection("pemeran_film")
      .join("pemeran", "pemeran.id", "pemeran_id")
      .select({
        id: "pemeran.id",
        name: "pemeran.name",
        image: "pemeran.image"
      })
      .where("film_id", post.id)


    return {
      message: "success",
      data: {
        ...post,
        sutradara,
        genre,
        pemeran
      }
    }
  }

  // Patch
  async update(id: number, data: { title: string, image?: string, description: string, tanggal_rilis: string }) {

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
