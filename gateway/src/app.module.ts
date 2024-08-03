import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ClientModule } from './clients/clients.module';

@Module({
  imports: [ProductsModule, ClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
