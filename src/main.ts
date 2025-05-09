import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
  .setTitle('My workers')
  .setDescription('The workers API description')
  .setVersion('1.0')
  .addSecurityRequirements("bearer",["bearer"])
  .addBearerAuth()
  .build()
const documentFactory = () => SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3002,()=> {
    console.log("Server ishlamoqda");
    
  });
}
bootstrap();
