import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClientsController } from './clients.controller';
import { CLIENT_SERVICE, envs } from 'src/config';

@Module({
  controllers: [ClientsController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: CLIENT_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [envs.queue],
          queue: 'clients_queue',
          queueOptions: {
            durable: false
          },
        },
      }
    ]),
  ],
})
export class ClientModule {}
