import { Module } from '@nestjs/common';
import { TgBotService } from './tg_bot.service';

@Module({
  exports:[TgBotService],
  providers: [TgBotService]
})
export class TgBotModule {}
