import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProduct } from './dto/CreateProduct.dto';
import {
  DeleteProduct,
  ItemsCount,
  ProductDto,
  ProductWithStatus,
} from '../../types/products';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(): Promise<ProductDto[]> {
    return this.productsService.getProducts();
  }

  @Get('count')
  getCountProducts(): Promise<ItemsCount> {
    return this.productsService.getCountProducts();
  }

  @Post()
  createProduct(@Body() body: CreateProduct): Promise<ProductWithStatus> {
    return this.productsService.createProduct(body.name);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): Promise<DeleteProduct> {
    return this.productsService.deleteProduct(id);
  }
}
