import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCT_SERVICE, CLIENT_SERVICE } from 'src/config';


@Controller('clients')
export class ClientsController {
  constructor(@Inject(CLIENT_SERVICE) private readonly clientClient: ClientProxy) {}

  @Post()
  createProduct(@Body() body: any){
    return this.clientClient.emit('create_client', body);
  }

  @Get()
  findAllProducts(){
    return this.clientClient.send( 'find_all_clients', {});          //send se queda a la espera de una respuesta y emit No espera respuesta
  }


}
