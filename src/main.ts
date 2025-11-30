import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './swagger/swagger.setup';

import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/interceptors/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    bodyParser: true,
  });

   // Global success response formatting
  app.useGlobalInterceptors(new TransformInterceptor());

  // Global error response formatting
  app.useGlobalFilters(new HttpExceptionFilter());

  //here add global pipe line for validation
    app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  //here add global prefix for api
  app.setGlobalPrefix('/api/v1')

 const config = app.get(ConfigService);
  const port = config.get('port') || 3000;
  const node_env = config.get('node_env') || 'development';
  if (node_env !== 'production') {
    setupSwagger(app);
  }

  await app.listen(port);
  console.log(`🚀 Application is running successfully!`);
}
bootstrap().catch((err) => {
  console.error('❌ Error during bootstrap:', err);
  process.exit(1);
});