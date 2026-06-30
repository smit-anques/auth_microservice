import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const AuthGrpcClient: ClientOptions = {
  transport: Transport.GRPC,

  options: {
    url: 'localhost:50051',
    package: 'auth',
    protoPath: join(process.cwd(), 'proto', 'auth.proto'),
  },
};