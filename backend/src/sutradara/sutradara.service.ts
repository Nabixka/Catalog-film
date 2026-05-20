import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { KnexService } from 'src/db/knex.service';

@Injectable()
export class SutradaraService {
    constructor(private KnexService: KnexService) {}

    // Get
    async getAll(){
        const get = await this.KnexService.connection("sutradara").select("*")
        return {
            message: "success",
            data: get
        }
    }

    
    async getDetail(id: number){
        const sutradara = await this.KnexService.connection("sutradara").where("id", id).first()
        const film = await this.KnexService.connection("sutradara_film")
        .join("sutradara", "sutradara.id", "sutradara_film.sutradara_id")
        .join("film", "film.id", "sutradara_film.film_id")
        .select({
            film_id: "film.id",
            film_title: "film.title",
            film_image: "film.image",
            film_description: "film.description"
        })
        .where("sutradara.id", id)
        return {
            message: "success",
            data: {
                ...sutradara,
                film
            }
        }
    }

    // Create
    async create(data: {name: string, image: string, tanggal_lahir: string, description: string, tempat_asal: string}){
        const exist = await this.KnexService.connection("sutradara").where("name", data.name).first()
        if(exist) throw new ConflictException("Sutradara Sudah Ada")
        const [post] = await this.KnexService.connection("sutradara").insert(data).returning("*")
        return {
            message: "success",
            data: post
        }
    }

    // Update
    async update(id: number, data: {name: string, image?: string, description: string, tanggal_lahir: string, tempat_asal: string}){
        const exist = await this.KnexService.connection("sutradara").where("name", data.name).first()
        if(exist) throw new ConflictException("Sutradara Sudah Ada")
        const [update] = await this.KnexService.connection("sutradara").update(data).where("id", id).returning("*")
        return {
            message: "success",
            data: update
        }
    }

    // Delete
    async delete(id: number){
        const del = await this.KnexService.connection("sutradara").delete().where("id", id)
        return {
            message: "success"
        }  
    } 
}