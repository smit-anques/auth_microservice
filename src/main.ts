import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.GRPC,

      options: {
        package: 'auth',

        protoPath: join(process.cwd(), 'proto', 'auth.proto'),

        url: 'localhost:50051',
      },
    },
  );

  await app.listen();

  console.log('✅ Auth Service running on gRPC :50051');
}
bootstrap();
