import { Module } from '@nestjs/common';
import { PartnersController } from './partners.controller';
import { PartnerService } from './partners.service';

@Module({
  controllers: [PartnersController],
  providers: [PartnerService],
})
export class PartnersModule {}
