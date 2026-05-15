import { Module } from '@nestjs/common';
import { PemeranService } from './pemeran.service';
import { PemeranController } from './pemeran.controller';
import { KnexModule } from 'src/db/knex.module';

@Module({
  imports: [KnexModule],
  controllers: [PemeranController],
  providers: [PemeranService],
})
export class PemeranModule {}
