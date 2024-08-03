import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    ClientsModule.register([
      {
        name: 'CLIENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [envs.queue],
          queue: 'clients_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
})
export class ProductsModule {}
