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

    async getOne(id: number){
        const get = await this.KnexService.connection("sutradara").where("id", id).first()
        return {
            message: "success",
            data: get
        }
    }

    // Create
    async create(data: {name: string, image: string}){
        const exist = await this.KnexService.connection("sutradara").where("name", data.name).first()
        if(exist) throw new ConflictException("Sutradara Sudah Ada")
        const [post] = await this.KnexService.connection("sutradara").insert(data).returning("*")
        return {
            message: "success",
            data: post
        }
    }

    // Update
    async update(id: number, data: {name: string, image?: string}){
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