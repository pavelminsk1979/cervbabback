import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Box } from '../boxes/entities/boxes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Box])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
