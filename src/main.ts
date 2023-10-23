import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {

  const httpsOptions = {
    key: fs.readFileSync('/etc/nginx/ssl/feedback-api.istow.id.key'),
    cert: fs.readFileSync('/etc/nginx/ssl/feedback-api.istow.id.crt'),
  };
  
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    httpsOptions
  });
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Form Kepuasan Pelanggan')
    .setDescription('The form API description')
    .setVersion('1.0')
    .addTag('form')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
