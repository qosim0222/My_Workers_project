import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RegionModule } from './region/region.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import { EskizService } from './eskiz/eskiz.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { SizeModule } from './size/size.module';
import { BrandModule } from './brand/brand.module';
import { CapacityModule } from './capacity/capacity.module';
import { PartnersModule } from './partners/partners.module';
import { ConfigModule } from '@nestjs/config';
import { PowerModule } from './power/power.module';
import { FaqModule } from './faq/faq.module';
import { ContactModule } from './contact/contact.module';
import { InfoModule } from './info/info.module';
import { ShowcaseModule } from './showcase/showcase.module';
import { MasterModule } from './master/master.module';
import { OrderModule } from './order/order.module';
import { LevelModule } from './level/level.module';
import { BasketModule } from './basket/basket.module';
import { ToolModule } from './tool/tool.module';
import { ProfessionModule } from './profession/profession.module';

@Module({
  imports: [  ConfigModule.forRoot({isGlobal:true}),UploadModule,
    ServeStaticModule.forRoot({
      rootPath:join(__dirname, '..', 'uploads'),
      serveRoot:'/uploads'
    }),
    RegionModule,
    CommentModule,
    AuthModule,
    PrismaModule,
    UsersModule,
    SizeModule,
    BrandModule,
    CapacityModule,
    PartnersModule,
    PowerModule,
    FaqModule,
    ContactModule,
    InfoModule,
    ShowcaseModule,
    MasterModule,
    OrderModule,
    LevelModule,
    BasketModule,
    ToolModule,
    ProfessionModule,
  ],
  controllers: [AppController],
  providers: [AppService, EskizService],
})
export class AppModule {}
