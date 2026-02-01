import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProduct } from './dto/CreateProduct.dto';
import { ProductDto, ProductWithStatus } from '../../types/products';
import { ResponseStatus } from '../../types/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(): Promise<ProductDto[]> {
    return this.productsService.getProducts();
  }

  @Get('count')
  countActiveProducts(): Promise<{ countProducts: number }> {
    return this.productsService.countActiveProducts();
  }

  @Post()
  createProduct(@Body() body: CreateProduct): Promise<ProductWithStatus> {
    return this.productsService.createProduct(body.name);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): Promise<ResponseStatus> {
    return this.productsService.deleteProduct(id);
  }
}
