import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { KnexService } from 'src/db/knex.service';

@Injectable()
export class GenreService {
    constructor(private knexService: KnexService) {}
    
    // Get
    async getAll(){
        const get = await this.knexService.connection("genre").select("*")
        return {
            message: "success",
            data: get
        }
    }

    async getOne(id: number){
        const get = await this.knexService.connection("genre").where("id", id).first()
        return {
            message: "success",
            data: get
        }
    }

    // Post
    async create(data: {name: string}){
        if(!data.name) throw new BadRequestException("Isi Yang Benar")
        const same = await this.knexService.connection("genre").where({"name": data.name}).first()
        if(same) throw new ConflictException("Genre Sudah Ada")
        const [post] = await this.knexService.connection("genre").insert({"name": data.name}).returning("*")
        return {
            message: "success",
            data: post
        }
    }

    // Delete
    async delete(id: number){
        const exist = await this.knexService.connection("genre").where("id", id).first()
        if(!exist) throw new NotFoundException("Genre Tidak Ada")
        const del = await this.knexService.connection("genre").delete().where("id", id)
        return {
            message: "success"
        }
    }
}
