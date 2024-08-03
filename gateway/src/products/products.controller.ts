import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config';


@Controller('products')
export class ProductsController {
  constructor(@Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy) {}

  @Post()
  createProduct(@Body() body: any){
    console.log(body)
    return this.productsClient.emit({cmd: 'create_product'}, body);
  }

  @Get()
  findAllProducts(){
    return this.productsClient.send({cmd: 'find_all_products'}, {});          //send se queda a la espera de una respuesta y emit No espera respuesta
  }

  @Get(':id')
  findOne(@Param('id') id: string){
    return "findOne"
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string){
    return "deleteProduct"
  }

  @Patch(':id')
  UpdateProduct(@Param('id') id: string ,@Body() body: any){
    return "UpdateProduct"
  }


}
