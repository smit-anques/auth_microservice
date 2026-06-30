// product.client.ts
import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const ProductGrpcClient: ClientOptions = {
  transport: Transport.GRPC,

  options: {
    url: 'localhost:50052',
    package: ['platform_category', 'category'],
    protoPath: [
      join(process.cwd(), 'proto', 'plateform_category', 'plateform_category.proto'),
      join(process.cwd(), 'proto', 'Category', 'category.proto'),
    ],
    loader: {
      keepCase: true, // <-- add this
    },
  },
};
