import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('gentleman backend')
  .setDescription('API documentation for the vehicles service')
  .setVersion('1.0')
  .addTag('Gentleman')
  .addApiKey(
    {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
    'auth',
  )
  .build();