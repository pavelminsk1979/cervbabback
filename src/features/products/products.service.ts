import { Injectable } from '@nestjs/common';
import { Product } from './entities/products.entity';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto, ProductWithStatus } from '../../types/products';
import { ResponseStatus } from '../../types/common';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async countActiveProducts(): Promise<{ countProducts: number }> {
    const count = await this.productRepository.count({
      where: { deletedAt: IsNull() },
    });

    return { countProducts: count };
  }

  async getProducts(): Promise<ProductDto[]> {
    const products = await this.productRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });

    const productsDto: ProductDto[] = products.map((product) =>
      this.mapToDto(product),
    );
    return productsDto;
  }

  private mapToDto(product: Product): ProductDto {
    return {
      id: product.id,
      name: product.name,
      createdAt: product.createdAt.toISOString(),
    };
  }

  async createProduct(name: string): Promise<ProductWithStatus> {
    try {
      const existProduct = await this.productRepository.findOne({
        where: { name },
        withDeleted: true,
      });

      if (existProduct) {
        if (existProduct.deletedAt) {
          return {
            status: 410,
            product: { id: '', name, createdAt: '' },
          };
        } else {
          const productDto: ProductDto = this.mapToDto(existProduct);
          return { status: 409, product: productDto };
        }
      } else {
        const product = await this.productRepository.save({ name });
        const productDto: ProductDto = this.mapToDto(product);
        return { status: 200, product: productDto };
        // обратится в базу и найти каробку в которой менее 5 продуктов
        // и если нет то надо создать новую каробку
      }
    } catch (e) {
      console.log('Error-catch file ProductsService', e);
      return {
        status: 500,
        product: { id: '', name: '', createdAt: '' },
      };
    }
  }

  async deleteProduct(id: string): Promise<ResponseStatus> {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) {
        return { status: 404 };
      }

      product.deletedAt = new Date();
      await this.productRepository.save(product);
      return { status: 200 };
    } catch (e) {
      console.log('Error-catch file ProductsService', e);
      return { status: 500 };
    }
  }
}
