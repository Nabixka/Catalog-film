import { Module } from '@nestjs/common';
import { SutradaraService } from './sutradara.service';
import { SutradaraController } from './sutradara.controller';
import { KnexModule } from 'src/db/knex.module';

@Module({
  imports: [KnexModule],
  controllers: [SutradaraController],
  providers: [SutradaraService],
})
export class SutradaraModule {}
