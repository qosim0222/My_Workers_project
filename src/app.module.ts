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

@Module({
  imports: [UploadModule,
    ServeStaticModule.forRoot({
      rootPath:join(__dirname, '..', 'uploads'),
      serveRoot:'/uploads'
    }),
    RegionModule,
    CommentModule,
    AuthModule,
    PrismaModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, EskizService],
})
export class AppModule {}
