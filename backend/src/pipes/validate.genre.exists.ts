import { Injectable, NotFoundException, PipeTransform } from "@nestjs/common";
import { KnexService } from "src/db/knex.service";

@Injectable()
export class validateGenreExist implements PipeTransform{
    constructor(private knexService: KnexService) {}
    async transform(value: any) {
        const id = Number(value)
        const exist = await this.knexService.connection("genre").where("id", id).first()
        if(!exist) throw new NotFoundException("Genre Tidak Ada")
        return id
    }
}