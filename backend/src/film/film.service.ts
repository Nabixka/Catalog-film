import { BadRequestException, Injectable } from '@nestjs/common';
import { KnexService } from 'src/db/knex.service';
import { filmMapping } from 'src/mapping/filmMapping';

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

  async getOne(id: Number) {
    const data = await this.knexService.connection("film").where("id", id).first()

    return {
      message: "success",
      data: filmMapping(data)
    }
  }

  // Post
  async create(data: { title: string, image: string, description: string, sutradara: string, tanggal_rilis: string }) {
    if (!data.title || !data.image || !data.description || !data.sutradara || !data.tanggal_rilis){
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
      if(data[key] === undefined){
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
  async delete(id: Number){
    const del = await this.knexService.connection("film").delete().where('id', id)

    return {
      message: "Berhasil Menghapus",
    }
  }

}
