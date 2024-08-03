import { Controller, ParseUUIDPipe, Inject } from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService, @Inject('CLIENT_SERVICE') private readonly clientClient: ClientProxy) {}

  @MessagePattern({cmd: 'create_product'})
  async create(@Payload() createProductDto: any) {
    console.log("createProductDto  ", createProductDto) 
    const clientResponse =  this.clientClient.send('create_client', {});
    const clientResponseData = await firstValueFrom(clientResponse);
    console.log("clientResponseData  ", clientResponseData) 
    return  this.productsService.create(createProductDto); 
  }

  @MessagePattern({cmd: 'find_all_products'})
  findAll() {
    return this.productsService.findAll();
  }

  @MessagePattern({cmd: 'find_one_products'})
  findOne(@Payload('id', ParseUUIDPipe ) id: string) {
    return this.productsService.findOne(id);
  }

  @MessagePattern({cmd: 'update_products'})
  update(
    @Payload('id', ParseUUIDPipe ) id: string, 
    @Payload() updateProductDto: UpdateProductDto) 
  {
    return this.productsService.update(id, updateProductDto);
  }

  @MessagePattern({cmd: 'delete_products'})
  remove(@Payload('id', ParseUUIDPipe ) id: string) {
    return this.productsService.remove(id);
  }
}
