import { Injectable, NotFoundException, PipeTransform } from "@nestjs/common";
import { KnexService } from "src/db/knex.service";

@Injectable()
export class ValidatePemeranExist implements PipeTransform{
    constructor(private knexService: KnexService) {}
    async transform(value: any) {
        const id = Number(value)

        const exist = await this.knexService.connection("pemeran").where('id', id).first()
        if(!exist) throw new NotFoundException("Pemeran Tidak Ada")
        
        return id
    }
}